import { and, count, desc, eq, isNull, sum } from "drizzle-orm";
import { getDb } from "@/db";
import {
  aiUsage,
  auditLogs,
  billingEvents,
  learningProgress,
  studentProfiles,
  subscriptions,
  systemEvents,
  users,
} from "@/db/schema";
import { requireSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  if (auth.user.role !== "admin") {
    return Response.json({ error: "Área restrita a administradores." }, { status: 403 });
  }
  const db = getDb();
  const [
    userCount,
    activeSubscriptions,
    revenue,
    aiRequests,
    completion,
    canceledSubscriptions,
    unresolvedErrors,
    recentAudit,
    progressRows,
    recentUsers,
  ] = await Promise.all([
    db.select({ value: count() }).from(users),
    db
      .select({ value: count() })
      .from(subscriptions)
      .where(eq(subscriptions.status, "active")),
    db.select({ value: sum(billingEvents.amountCents) }).from(billingEvents),
    db.select({ value: sum(aiUsage.requests) }).from(aiUsage),
    db
      .select({
        usersWithProgress: count(),
        xp: sum(learningProgress.xp),
      })
      .from(learningProgress),
    db
      .select({ value: count() })
      .from(subscriptions)
      .where(eq(subscriptions.status, "canceled")),
    db
      .select({ value: count() })
      .from(systemEvents)
      .where(and(eq(systemEvents.severity, "error"), isNull(systemEvents.resolvedAt))),
    db
      .select({
        id: auditLogs.id,
        action: auditLogs.action,
        targetType: auditLogs.targetType,
        createdAt: auditLogs.createdAt,
      })
      .from(auditLogs)
      .orderBy(desc(auditLogs.createdAt))
      .limit(8),
    db
      .select({ completedLessonsJson: learningProgress.completedLessonsJson })
      .from(learningProgress)
      .limit(500),
    db
      .select({
        id: users.id,
        email: users.email,
        status: users.status,
        role: users.role,
        planId: users.planId,
        createdAt: users.createdAt,
        displayName: studentProfiles.displayName,
      })
      .from(users)
      .leftJoin(studentProfiles, eq(studentProfiles.email, users.email))
      .orderBy(desc(users.createdAt))
      .limit(20),
  ]);
  const lessonCounts = new Map<string, number>();
  let completedLessonCount = 0;
  for (const progress of progressRows) {
    try {
      const lessonIds = JSON.parse(progress.completedLessonsJson);
      if (!Array.isArray(lessonIds)) continue;
      completedLessonCount += lessonIds.length;
      for (const lessonId of lessonIds) {
        if (typeof lessonId !== "string") continue;
        lessonCounts.set(lessonId, (lessonCounts.get(lessonId) ?? 0) + 1);
      }
    } catch {
      // Dados inválidos são ignorados no agregado e continuam disponíveis para auditoria.
    }
  }
  const popularLessons = [...lessonCounts.entries()]
    .sort((first, second) => second[1] - first[1])
    .slice(0, 5)
    .map(([lessonId, completions]) => ({ lessonId, completions }));
  const totalUsers = Number(userCount[0]?.value ?? 0);
  return Response.json({
    metrics: {
      users: totalUsers,
      activeSubscriptions: Number(activeSubscriptions[0]?.value ?? 0),
      canceledSubscriptions: Number(canceledSubscriptions[0]?.value ?? 0),
      revenueCents: Number(revenue[0]?.value ?? 0),
      aiRequests: Number(aiRequests[0]?.value ?? 0),
      unresolvedErrors: Number(unresolvedErrors[0]?.value ?? 0),
      usersWithProgress: Number(completion[0]?.usersWithProgress ?? 0),
      totalXp: Number(completion[0]?.xp ?? 0),
      completionRate: totalUsers
        ? Math.round((completedLessonCount / (totalUsers * 44)) * 1000) / 10
        : 0,
    },
    users: recentUsers,
    recentAudit,
    popularLessons,
  });
}
