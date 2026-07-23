import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { aiHistory, aiUsage, studentProfiles } from "@/db/schema";
import { allLessons } from "@/lib/course-data";
import { buildMentorAnswer } from "@/lib/mentor";
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

  const answer = buildMentorAnswer(question, lesson, (payload.code ?? "").slice(0, 12_000));
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
        inputUnits: question.length,
        outputUnits: serializedAnswer.length,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: aiUsage.id,
        set: {
          requests: (usage?.requests ?? 0) + 1,
          inputUnits: (usage?.inputUnits ?? 0) + question.length,
          outputUnits: (usage?.outputUnits ?? 0) + serializedAnswer.length,
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
      source: "local-didactic",
      status: "completed",
      createdAt: now,
    });
  });

  return Response.json({
    answer,
    engine: "local-didactic",
    disclosure:
      "Resposta gerada pelo motor didático local do NexaCode; nenhuma API remota foi utilizada.",
    remaining: Math.max(0, limit - (usage?.requests ?? 0) - 1),
  });
}
