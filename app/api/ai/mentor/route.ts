import { eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { aiHistory, aiUsage, studentProfiles } from "@/db/schema";
import { allLessons } from "@/lib/course-data";
import { buildMentorAnswer } from "@/lib/mentor";
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

export async function POST(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  const payload = (await request.json()) as {
    question?: string;
    lessonId?: string;
    code?: string;
  };
  const question = payload.question?.trim().slice(0, 1600) ?? "";
  if (question.length < 2) {
    return Response.json({ error: "Escreva uma pergunta para o mentor." }, { status: 400 });
  }
  const lesson =
    allLessons.find((item) => item.id === payload.lessonId) ?? allLessons[0];
  const today = new Date().toISOString().slice(0, 10);
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
  const [usage] = await db
    .select()
    .from(aiUsage)
    .where(eq(aiUsage.id, `${auth.user.id}:${today}`))
    .limit(1);
  const limit = plans[auth.user.planId].aiDailyLimit;
  if ((usage?.requests ?? 0) >= limit) {
    return Response.json(
      {
        error: `Você atingiu o limite de ${limit} interações do seu plano hoje.`,
        upgradeRequired: auth.user.planId === "free",
      },
      { status: 429 },
    );
  }

  const code = (payload.code ?? "").slice(0, 12_000);
  let answer = buildMentorAnswer(question, lesson, code);
  let source = "local-didactic";
  let inputUnits = question.length + code.length;
  let outputUnits = JSON.stringify(answer).length;
  if (remoteMentorConfigured()) {
    try {
      const remote = await generateRemoteMentorAnswer({ question, lesson, code });
      if (remote) {
        answer = remote.answer;
        source = "openai-responses";
        inputUnits = remote.inputUnits;
        outputUnits = remote.outputUnits;
      }
    } catch {
      source = "local-fallback";
    }
  }
  const now = new Date();
  const serializedAnswer = JSON.stringify(answer);
  await db.transaction(async (transaction) => {
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
    await transaction.insert(aiHistory).values({
      id: crypto.randomUUID(),
      userId: auth.user.id,
      language: lesson.language ?? "javascript",
      intent: mentorIntent(question),
      promptExcerpt: question.slice(0, 320),
      responseExcerpt: serializedAnswer.slice(0, 640),
      source,
      status: "completed",
      createdAt: now,
    });
  });

  return Response.json({
    answer,
    engine: source,
    disclosure:
      source === "openai-responses"
        ? "Resposta gerada pela IA remota configurada no NexaCode AI."
        : source === "local-fallback"
          ? "A IA remota ficou indisponível; o motor didático local respondeu como contingência."
          : "Resposta gerada pelo motor didático local; nenhuma API remota foi utilizada.",
    remaining: Math.max(0, limit - (usage?.requests ?? 0) - 1),
  });
}
