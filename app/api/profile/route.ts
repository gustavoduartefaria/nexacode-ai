import { eq } from "drizzle-orm";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { getDb } from "@/db";
import { studentProfiles } from "@/db/schema";

export const dynamic = "force-dynamic";

const USERNAME_PATTERN = /^[a-z0-9][a-z0-9._-]{2,23}$/;
const EXPERIENCE_LEVELS = new Set(["beginner", "basic", "intermediate", "advanced"]);
const LEARNING_GOALS = new Set([
  "first-job",
  "career-change",
  "college",
  "freelance",
  "own-projects",
  "improve-skills",
]);

function errorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Erro inesperado";
  if (message.includes("UNIQUE constraint failed: student_profiles.username")) {
    return {
      status: 409,
      message: "Este nome de usuário já está sendo utilizado.",
    };
  }
  if (message.includes("no such table")) {
    return {
      status: 503,
      message: "O cadastro está sendo preparado. Tente novamente em alguns instantes.",
    };
  }
  return { status: 500, message: "Não foi possível salvar sua conta agora." };
}

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) {
    return Response.json({ error: "Autenticação necessária." }, { status: 401 });
  }

  try {
    const db = getDb();
    const [profile] = await db
      .select()
      .from(studentProfiles)
      .where(eq(studentProfiles.email, user.email.toLowerCase()))
      .limit(1);

    return Response.json({ profile: profile ?? null });
  } catch (error) {
    const result = errorMessage(error);
    return Response.json({ error: result.message }, { status: result.status });
  }
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) {
    return Response.json({ error: "Autenticação necessária." }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as {
      displayName?: string;
      username?: string;
      learningGoal?: string;
      experienceLevel?: string;
      weeklyGoal?: number;
      acceptedTerms?: boolean;
    };

    const displayName = payload.displayName?.trim() ?? "";
    const username = payload.username?.trim().toLowerCase() ?? "";
    const learningGoal = payload.learningGoal ?? "";
    const experienceLevel = payload.experienceLevel ?? "";
    const weeklyGoal = Number(payload.weeklyGoal);

    if (displayName.length < 2 || displayName.length > 60) {
      return Response.json(
        { error: "Informe um nome entre 2 e 60 caracteres." },
        { status: 400 },
      );
    }
    if (!USERNAME_PATTERN.test(username)) {
      return Response.json(
        {
          error:
            "O usuário deve ter de 3 a 24 caracteres, começando por letra ou número.",
        },
        { status: 400 },
      );
    }
    if (!LEARNING_GOALS.has(learningGoal)) {
      return Response.json({ error: "Escolha um objetivo válido." }, { status: 400 });
    }
    if (!EXPERIENCE_LEVELS.has(experienceLevel)) {
      return Response.json(
        { error: "Escolha um nível de experiência válido." },
        { status: 400 },
      );
    }
    if (!Number.isInteger(weeklyGoal) || weeklyGoal < 1 || weeklyGoal > 7) {
      return Response.json(
        { error: "A meta semanal deve ficar entre 1 e 7 dias." },
        { status: 400 },
      );
    }
    if (payload.acceptedTerms !== true) {
      return Response.json(
        { error: "Você precisa aceitar os termos e a política de privacidade." },
        { status: 400 },
      );
    }

    const now = new Date();
    const email = user.email.toLowerCase();
    const db = getDb();
    const [profile] = await db
      .insert(studentProfiles)
      .values({
        email,
        displayName,
        username,
        learningGoal,
        experienceLevel,
        weeklyGoal,
        acceptedTermsAt: now,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: studentProfiles.email,
        set: {
          displayName,
          username,
          learningGoal,
          experienceLevel,
          weeklyGoal,
          acceptedTermsAt: now,
          updatedAt: now,
        },
      })
      .returning();

    return Response.json({ profile }, { status: 200 });
  } catch (error) {
    const result = errorMessage(error);
    return Response.json({ error: result.message }, { status: result.status });
  }
}
