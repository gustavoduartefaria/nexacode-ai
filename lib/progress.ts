import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { learningProgress } from "@/db/schema";
import type { LanguageId } from "@/lib/course-types";

export type CloudProgress = {
  name: string;
  completedLessons: string[];
  completedChallenges: string[];
  xp: number;
  streak: number;
  lastVisit: string;
  activeLanguage: LanguageId;
  studyMinutes: number;
};

function parseList(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export async function getCloudProgress(userId: string): Promise<CloudProgress | null> {
  const [record] = await getDb()
    .select()
    .from(learningProgress)
    .where(eq(learningProgress.userId, userId))
    .limit(1);
  if (!record) return null;
  return {
    name: record.displayName,
    completedLessons: parseList(record.completedLessonsJson),
    completedChallenges: parseList(record.completedChallengesJson),
    xp: record.xp,
    streak: record.streak,
    lastVisit: record.lastVisit,
    activeLanguage:
      record.activeLanguage === "python" || record.activeLanguage === "cpp"
        ? record.activeLanguage
        : "javascript",
    studyMinutes: record.studyMinutes,
  };
}

export async function saveCloudProgress(userId: string, progress: CloudProgress) {
  const now = new Date();
  await getDb()
    .insert(learningProgress)
    .values({
      userId,
      displayName: progress.name,
      completedLessonsJson: JSON.stringify([...new Set(progress.completedLessons)]),
      completedChallengesJson: JSON.stringify([
        ...new Set(progress.completedChallenges),
      ]),
      xp: progress.xp,
      streak: progress.streak,
      lastVisit: progress.lastVisit,
      activeLanguage: progress.activeLanguage,
      studyMinutes: progress.studyMinutes,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: learningProgress.userId,
      set: {
        displayName: progress.name,
        completedLessonsJson: JSON.stringify([...new Set(progress.completedLessons)]),
        completedChallengesJson: JSON.stringify([
          ...new Set(progress.completedChallenges),
        ]),
        xp: progress.xp,
        streak: progress.streak,
        lastVisit: progress.lastVisit,
        activeLanguage: progress.activeLanguage,
        studyMinutes: progress.studyMinutes,
        updatedAt: now,
      },
    });
}
