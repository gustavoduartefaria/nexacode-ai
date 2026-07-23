import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { learningProgress, studentProfiles } from "@/db/schema";
import { requireSessionUser } from "@/lib/auth";
import { recordAudit } from "@/lib/audit";

export const dynamic = "force-dynamic";

const USERNAME_PATTERN = /^[a-z0-9][a-z0-9._-]{2,23}$/;
const EXPERIENCE_LEVELS = new Set(["beginner", "basic", "intermediate", "advanced"]);
const AVATAR_PRESETS = new Set(["orbit", "terminal", "pixel", "nebula"]);
const THEME_PREFERENCES = new Set(["system", "dark", "light"]);
const LEARNING_GOALS = new Set([
  "first-job",
  "career-change",
  "college",
  "freelance",
  "own-projects",
  "improve-skills",
]);

export async function GET(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  const [profile] = await getDb()
    .select()
    .from(studentProfiles)
    .where(eq(studentProfiles.email, auth.user.email))
    .limit(1);
  return Response.json({ profile: profile ?? null });
}

export async function PUT(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  const payload = (await request.json()) as {
    displayName?: string;
    username?: string;
    learningGoal?: string;
    experienceLevel?: string;
    weeklyGoal?: number;
    avatarPreset?: string;
    themePreference?: string;
    aiEnabled?: boolean;
  };
  const displayName = payload.displayName?.trim() ?? "";
  const username = payload.username?.trim().toLowerCase() ?? "";
  const weeklyGoal = Number(payload.weeklyGoal);
  if (displayName.length < 2 || displayName.length > 60) {
    return Response.json({ error: "Informe um nome entre 2 e 60 caracteres." }, { status: 400 });
  }
  if (!USERNAME_PATTERN.test(username)) {
    return Response.json({ error: "Use um nome de usuário válido, com 3 a 24 caracteres." }, { status: 400 });
  }
  if (!LEARNING_GOALS.has(payload.learningGoal ?? "")) {
    return Response.json({ error: "Escolha um objetivo válido." }, { status: 400 });
  }
  if (!EXPERIENCE_LEVELS.has(payload.experienceLevel ?? "")) {
    return Response.json({ error: "Escolha um nível válido." }, { status: 400 });
  }
  if (!AVATAR_PRESETS.has(payload.avatarPreset ?? "")) {
    return Response.json({ error: "Escolha um avatar válido." }, { status: 400 });
  }
  if (!THEME_PREFERENCES.has(payload.themePreference ?? "")) {
    return Response.json({ error: "Escolha uma preferência de tema válida." }, { status: 400 });
  }
  if (typeof payload.aiEnabled !== "boolean") {
    return Response.json({ error: "Informe se o mentor deve ficar ativo." }, { status: 400 });
  }
  if (!Number.isInteger(weeklyGoal) || weeklyGoal < 1 || weeklyGoal > 7) {
    return Response.json({ error: "A meta semanal deve ficar entre 1 e 7 dias." }, { status: 400 });
  }
  try {
    const db = getDb();
    await db
      .update(studentProfiles)
      .set({
        displayName,
        username,
        learningGoal: payload.learningGoal!,
        experienceLevel: payload.experienceLevel!,
        weeklyGoal,
        avatarPreset: payload.avatarPreset!,
        themePreference: payload.themePreference!,
        aiEnabled: payload.aiEnabled,
        updatedAt: new Date(),
      })
      .where(eq(studentProfiles.email, auth.user.email));
    await db
      .update(learningProgress)
      .set({ displayName, updatedAt: new Date() })
      .where(eq(learningProgress.userId, auth.user.id));
    await recordAudit("profile.updated", "profile", {
      actorUserId: auth.user.id,
      targetId: auth.user.id,
      request,
    });
    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    return Response.json(
      {
        error: message.includes("student_profiles.username")
          ? "Este nome de usuário já está em uso."
          : "Não foi possível atualizar o perfil.",
      },
      { status: message.includes("student_profiles.username") ? 409 : 500 },
    );
  }
}

export const POST = PUT;
