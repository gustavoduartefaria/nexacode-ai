import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { certificates, notifications } from "@/db/schema";
import { allLessons, lessonsByLanguage } from "@/lib/course-data";
import { recordAudit } from "@/lib/audit";
import { requireSessionUser } from "@/lib/auth";
import { getCloudProgress, saveCloudProgress, type CloudProgress } from "@/lib/progress";
import { accessibleLessonIds, canUseFeature } from "@/lib/saas";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  const [progress, certificateList] = await Promise.all([
    getCloudProgress(auth.user.id),
    getDb().select().from(certificates).where(eq(certificates.userId, auth.user.id)),
  ]);
  return Response.json({ progress, certificates: certificateList });
}

export async function PUT(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  const payload = (await request.json()) as Partial<CloudProgress>;
  const validLessonIds = new Set(
    accessibleLessonIds(
      auth.user.planId,
      allLessons.map((lesson) => lesson.id),
    ),
  );
  const completedLessons = Array.isArray(payload.completedLessons)
    ? payload.completedLessons
        .filter((id): id is string => typeof id === "string" && validLessonIds.has(id))
        .slice(0, allLessons.length)
    : [];
  const completedChallenges = Array.isArray(payload.completedChallenges)
    ? payload.completedChallenges
        .filter((id): id is string => typeof id === "string")
        .slice(0, 50)
    : [];
  const activeLanguage =
    payload.activeLanguage === "python" || payload.activeLanguage === "cpp"
      ? payload.activeLanguage
      : "javascript";
  const progress: CloudProgress = {
    name:
      typeof payload.name === "string" && payload.name.trim()
        ? payload.name.trim().slice(0, 60)
        : auth.user.displayName,
    completedLessons,
    completedChallenges,
    xp: Math.max(0, Math.min(1_000_000, Math.round(Number(payload.xp) || 0))),
    streak: Math.max(1, Math.min(3650, Math.round(Number(payload.streak) || 1))),
    lastVisit:
      typeof payload.lastVisit === "string" && /^\d{4}-\d{2}-\d{2}$/.test(payload.lastVisit)
        ? payload.lastVisit
        : new Date().toISOString().slice(0, 10),
    activeLanguage,
    studyMinutes: Math.max(
      0,
      Math.min(1_000_000, Math.round(Number(payload.studyMinutes) || 0)),
    ),
  };
  await saveCloudProgress(auth.user.id, progress);
  if (canUseFeature(auth.user.planId, "certificates")) {
    const completed = new Set(completedLessons);
    const db = getDb();
    for (const language of ["javascript", "python", "cpp"] as const) {
      const finishedTrack = lessonsByLanguage[language].every((lesson) =>
        completed.has(lesson.id),
      );
      if (!finishedTrack) continue;
      const verificationCode = `NEXA-${language.toUpperCase()}-${crypto
        .randomUUID()
        .replace(/-/g, "")
        .slice(0, 12)
        .toUpperCase()}`;
      const inserted = await db
        .insert(certificates)
        .values({
          id: crypto.randomUUID(),
          userId: auth.user.id,
          language,
          verificationCode,
          issuedAt: new Date(),
        })
        .onConflictDoNothing()
        .returning({ id: certificates.id });
      if (inserted.length) {
        const languageName = language === "javascript" ? "JavaScript" : language === "python" ? "Python" : "C++";
        await db.insert(notifications).values({
          id: crypto.randomUUID(),
          userId: auth.user.id,
          title: `Certificado de ${languageName} liberado`,
          message: "Sua trilha foi concluída. O certificado verificável já está disponível na sua conta.",
          kind: "achievement",
          createdAt: new Date(),
        });
      }
    }
  }
  await recordAudit("progress.updated", "learning_progress", {
    actorUserId: auth.user.id,
    targetId: auth.user.id,
    request,
    metadata: { lessons: completedLessons.length, xp: progress.xp },
  });
  const certificateList = await getDb()
    .select()
    .from(certificates)
    .where(eq(certificates.userId, auth.user.id));
  return Response.json({ progress, certificates: certificateList });
}
