import { and, desc, eq, gt, sql } from "drizzle-orm";
import { getDb } from "@/db";
import {
  aiHistory,
  aiResponseCache,
  aiUsage,
  mentorAttempts,
  studentProfiles,
} from "@/db/schema";
import { allLessons } from "@/lib/course-data";
import {
  applyGraduatedHint,
  buildMentorAnswer,
  type MentorAnswer,
  type MentorTestResult,
} from "@/lib/mentor";
import { generateRemoteMentorAnswer, remoteMentorConfigured } from "@/lib/openai-mentor";
import { requireSessionUser } from "@/lib/auth";
import { plans } from "@/lib/saas";

export const dynamic = "force-dynamic";

function mentorIntent(question: string) {
  const normalized = question.toLocaleLowerCase("pt-BR");
  if (/erro|bug|não funciona|nao funciona/.test(normalized)) return "debug";
  if (/exercício|exercicio|desafio/.test(normalized)) return "exercise";
  if (/plano|estudar|próxima|proxima/.test(normalized)) return "study-plan";
  if (/resum/.test(normalized)) return "summary";
  if (/revis|melhor/.test(normalized)) return "review";
  return "explanation";
}

async function digest(value: string) {
  const data = new TextEncoder().encode(value);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function sanitizeTests(value: unknown): MentorTestResult[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 8).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const current = item as Partial<MentorTestResult>;
    if (
      typeof current.id !== "string" ||
      typeof current.label !== "string" ||
      typeof current.passed !== "boolean" ||
      typeof current.message !== "string"
    ) {
      return [];
    }
    return [{
      id: current.id.slice(0, 80),
      label: current.label.slice(0, 160),
      passed: current.passed,
      expected: current.expected?.slice(0, 300),
      received: current.received?.slice(0, 300),
      message: current.message.slice(0, 500),
    }];
  });
}

export async function POST(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  const payload = (await request.json()) as {
    question?: string;
    lessonId?: string;
    exerciseId?: string;
    exerciseGoal?: string;
    code?: string;
    testResults?: unknown;
  };
  const question = payload.question?.trim().slice(0, 1600) ?? "";
  if (question.length < 2) {
    return Response.json({ error: "Escreva uma pergunta para o mentor." }, { status: 400 });
  }

  const lesson = allLessons.find((item) => item.id === payload.lessonId) ?? allLessons[0];
  const exerciseId = payload.exerciseId?.slice(0, 120) || "lesson";
  const exerciseGoal = payload.exerciseGoal?.trim().slice(0, 1200) || lesson.mission;
  const code = (payload.code ?? "").slice(0, 12_000);
  const testResults = sanitizeTests(payload.testResults);
  const failure = testResults.find((test) => !test.passed);
  const intent = mentorIntent(question);
  const explicitSolution = /solução|solucao|resposta pronta|código pronto|codigo pronto/i.test(question);
  const errorFingerprint = await digest(
    `${lesson.id}:${exerciseId}:${failure?.id ?? intent}:${failure?.message ?? "no-test"}`,
  );
  const codeHash = code ? await digest(code) : null;
  const today = new Date().toISOString().slice(0, 10);
  const now = new Date();
  const db = getDb();

  const [profile] = await db
    .select({ aiEnabled: studentProfiles.aiEnabled })
    .from(studentProfiles)
    .where(eq(studentProfiles.email, auth.user.email))
    .limit(1);
  if (profile?.aiEnabled === false) {
    return Response.json(
      { error: "O mentor está desativado nas preferências da sua conta." },
      { status: 403 },
    );
  }

  const [[usage], [attempt], recentHistory] = await Promise.all([
    db.select().from(aiUsage).where(eq(aiUsage.id, `${auth.user.id}:${today}`)).limit(1),
    db
      .select()
      .from(mentorAttempts)
      .where(
        and(
          eq(mentorAttempts.userId, auth.user.id),
          eq(mentorAttempts.lessonId, lesson.id),
          eq(mentorAttempts.exerciseId, exerciseId),
          eq(mentorAttempts.errorFingerprint, errorFingerprint),
        ),
      )
      .limit(1),
    db
      .select({
        prompt: aiHistory.promptExcerpt,
        response: aiHistory.responseExcerpt,
        source: aiHistory.source,
      })
      .from(aiHistory)
      .where(eq(aiHistory.userId, auth.user.id))
      .orderBy(desc(aiHistory.createdAt))
      .limit(6),
  ]);

  const failedAttempts = (attempt?.failedAttempts ?? 0) + (failure ? 1 : 0);
  let hintStage = Math.min(4, Math.max(1, attempt?.hintStage ?? 1));
  if (explicitSolution && failedAttempts > 0) hintStage = Math.min(4, hintStage + 1);
  const limit = plans[auth.user.planId].aiDailyLimit;
  const remoteLimitReached = (usage?.requests ?? 0) >= limit;
  const recentMessages = recentHistory
    .reverse()
    .flatMap((item) => [
      { role: "student" as const, text: item.prompt },
      { role: "mentor" as const, text: item.response },
    ])
    .slice(-6);
  const recentErrors = [
    ...(failure ? [failure.message] : []),
    ...(attempt?.lastError ? [attempt.lastError] : []),
  ].slice(0, 5);

  let answer = applyGraduatedHint(
    buildMentorAnswer(question, lesson, code),
    lesson,
    hintStage,
    testResults,
  );
  let source = remoteLimitReached ? "local-limit" : "local-didactic";
  let model: string | null = null;
  let route = "local";
  let inputUnits = 0;
  let outputUnits = JSON.stringify(answer).length;
  let remoteUsed = false;
  let cacheHit = false;

  const cacheEligible =
    !code &&
    testResults.length === 0 &&
    hintStage === 1 &&
    (intent === "explanation" || intent === "summary");
  const cacheKey = cacheEligible
    ? await digest(`${lesson.id}:${intent}:${question.toLocaleLowerCase("pt-BR")}`)
    : null;

  if (!remoteLimitReached && cacheKey) {
    const [cached] = await db
      .select()
      .from(aiResponseCache)
      .where(and(eq(aiResponseCache.cacheKey, cacheKey), gt(aiResponseCache.expiresAt, now)))
      .limit(1);
    if (cached) {
      answer = JSON.parse(cached.responseJson) as MentorAnswer;
      source = "application-cache";
      route = "cache";
      cacheHit = true;
      await db
        .update(aiResponseCache)
        .set({ hits: sql`${aiResponseCache.hits} + 1`, updatedAt: now })
        .where(eq(aiResponseCache.cacheKey, cacheKey));
    }
  }

  if (!cacheHit && !remoteLimitReached && remoteMentorConfigured()) {
    try {
      const remote = await generateRemoteMentorAnswer({
        question,
        lesson,
        code,
        context: {
          intent,
          planId: auth.user.planId,
          hintStage,
          exerciseId,
          exerciseGoal,
          failedAttempts,
          recentErrors,
          recentMessages,
          testResults,
          solutionExplicitlyRequested: explicitSolution,
        },
      });
      if (remote) {
        answer = remote.answer;
        source = "openai-responses";
        model = remote.model;
        route = remote.route;
        inputUnits = remote.inputUnits;
        outputUnits = remote.outputUnits;
        remoteUsed = true;
      }
    } catch {
      source = "local-fallback";
    }
  }

  const serializedAnswer = JSON.stringify(answer);
  const nextHintStage = Math.min(4, hintStage + 1);
  await db.transaction(async (transaction) => {
    await transaction
      .insert(mentorAttempts)
      .values({
        id: crypto.randomUUID(),
        userId: auth.user.id,
        lessonId: lesson.id,
        exerciseId,
        errorFingerprint,
        hintStage: nextHintStage,
        failedAttempts,
        lastError: failure?.message ?? null,
        lastCodeHash: codeHash,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: [
          mentorAttempts.userId,
          mentorAttempts.lessonId,
          mentorAttempts.exerciseId,
          mentorAttempts.errorFingerprint,
        ],
        set: {
          hintStage: nextHintStage,
          failedAttempts,
          lastError: failure?.message ?? null,
          lastCodeHash: codeHash,
          updatedAt: now,
        },
      });

    if (remoteUsed) {
      await transaction
        .insert(aiUsage)
        .values({
          id: `${auth.user.id}:${today}`,
          userId: auth.user.id,
          usageDate: today,
          requests: 1,
          inputUnits,
          outputUnits,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: aiUsage.id,
          set: {
            requests: sql`${aiUsage.requests} + 1`,
            inputUnits: sql`${aiUsage.inputUnits} + ${inputUnits}`,
            outputUnits: sql`${aiUsage.outputUnits} + ${outputUnits}`,
            updatedAt: now,
          },
        });
    }

    if (remoteUsed && cacheKey) {
      await transaction
        .insert(aiResponseCache)
        .values({
          cacheKey,
          lessonId: lesson.id,
          intent,
          responseJson: serializedAnswer,
          hits: 0,
          expiresAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: aiResponseCache.cacheKey,
          set: {
            responseJson: serializedAnswer,
            expiresAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
            updatedAt: now,
          },
        });
    }

    await transaction.insert(aiHistory).values({
      id: crypto.randomUUID(),
      userId: auth.user.id,
      language: lesson.language ?? "javascript",
      intent,
      promptExcerpt: question.slice(0, 320),
      responseExcerpt: serializedAnswer.slice(0, 640),
      source: model ? `${source}:${model}:${route}` : source,
      status: "completed",
      createdAt: now,
    });
  });

  const remoteRequests = (usage?.requests ?? 0) + (remoteUsed ? 1 : 0);
  return Response.json({
    answer,
    engine: source,
    model,
    route,
    cacheHit,
    hintStage: answer.hintStage ?? hintStage,
    disclosure:
      source === "openai-responses"
        ? "O Nex usou um modelo de linguagem remoto com o contexto desta aula."
        : source === "application-cache"
          ? "O Nex reutilizou uma explicação genérica verificada; nenhum código pessoal foi armazenado no cache."
          : source === "local-limit"
            ? "Seu limite de IA remota foi atingido; o Nex continua ajudando no modo local."
            : source === "local-fallback"
              ? "A IA remota ficou indisponível; o Nex mudou automaticamente para o modo local."
              : "O Nex respondeu com o motor didático local; nenhuma API remota foi utilizada.",
    remaining: Math.max(0, limit - remoteRequests),
  });
}
