import { and, eq, inArray } from "drizzle-orm";
import { getDb } from "@/db";
import {
  accountTokens,
  achievements,
  aiHistory,
  aiUsage,
  auditLogs,
  billingEvents,
  certificates,
  classroomMembers,
  classrooms,
  learningProgress,
  notifications,
  organizationInvitations,
  organizationMembers,
  organizations,
  permissions,
  studentProfiles,
  subscriptions,
  trackAssignments,
  userSessions,
  users,
} from "@/db/schema";
import {
  clearedSessionCookie,
  requireSessionUser,
  verifyPassword,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  const db = getDb();
  const [profile, progress, membership, subscription, usage, history, certificatesList] =
    await Promise.all([
      db
        .select()
        .from(studentProfiles)
        .where(eq(studentProfiles.email, auth.user.email))
        .limit(1),
      db
        .select()
        .from(learningProgress)
        .where(eq(learningProgress.userId, auth.user.id))
        .limit(1),
      db
        .select()
        .from(organizationMembers)
        .where(eq(organizationMembers.userId, auth.user.id)),
      db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, auth.user.id)),
      db.select().from(aiUsage).where(eq(aiUsage.userId, auth.user.id)),
      db
        .select()
        .from(aiHistory)
        .where(eq(aiHistory.userId, auth.user.id)),
      db.select().from(certificates).where(eq(certificates.userId, auth.user.id)),
    ]);
  return Response.json({
    exportedAt: new Date().toISOString(),
    user: auth.user,
    profile: profile[0] ?? null,
    progress: progress[0] ?? null,
    memberships: membership,
    subscriptions: subscription,
    aiUsage: usage,
    aiHistory: history,
    certificates: certificatesList,
  });
}

export async function DELETE(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  const payload = (await request.json()) as { password?: string; confirmation?: string };
  if (payload.confirmation !== "EXCLUIR") {
    return Response.json({ error: "Digite EXCLUIR para confirmar." }, { status: 400 });
  }
  const db = getDb();
  const [user] = await db.select().from(users).where(eq(users.id, auth.user.id)).limit(1);
  if (!user || !(await verifyPassword(payload.password ?? "", user.passwordHash))) {
    return Response.json({ error: "Senha incorreta." }, { status: 401 });
  }
  const [activeSubscription] = await db
    .select({ id: subscriptions.id })
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, user.id),
        inArray(subscriptions.status, ["active", "trialing", "past_due"]),
      ),
    )
    .limit(1);
  if (activeSubscription) {
    return Response.json(
      { error: "Cancele a assinatura no portal de cobrança antes de excluir a conta." },
      { status: 409 },
    );
  }

  const ownedOrganizations = await db
    .select({ id: organizations.id })
    .from(organizations)
    .where(eq(organizations.ownerUserId, user.id));
  for (const organization of ownedOrganizations) {
    const ownedClassrooms = await db
      .select({ id: classrooms.id })
      .from(classrooms)
      .where(eq(classrooms.organizationId, organization.id));
    for (const classroom of ownedClassrooms) {
      await db
        .delete(classroomMembers)
        .where(eq(classroomMembers.classroomId, classroom.id));
    }
    await db
      .delete(trackAssignments)
      .where(eq(trackAssignments.organizationId, organization.id));
    await db.delete(classrooms).where(eq(classrooms.organizationId, organization.id));
    await db.delete(organizationInvitations).where(
      eq(organizationInvitations.organizationId, organization.id),
    );
    await db.delete(organizationMembers).where(
      eq(organizationMembers.organizationId, organization.id),
    );
    await db.delete(organizations).where(eq(organizations.id, organization.id));
  }

  await db.delete(organizationMembers).where(eq(organizationMembers.userId, user.id));
  await db.delete(classroomMembers).where(eq(classroomMembers.userId, user.id));
  await db.delete(permissions).where(eq(permissions.userId, user.id));
  await db.delete(accountTokens).where(eq(accountTokens.userId, user.id));
  await db.delete(userSessions).where(eq(userSessions.userId, user.id));
  await db.delete(learningProgress).where(eq(learningProgress.userId, user.id));
  await db.delete(aiUsage).where(eq(aiUsage.userId, user.id));
  await db.delete(aiHistory).where(eq(aiHistory.userId, user.id));
  await db.delete(certificates).where(eq(certificates.userId, user.id));
  await db.delete(achievements).where(eq(achievements.userId, user.id));
  await db.delete(notifications).where(eq(notifications.userId, user.id));
  await db.delete(subscriptions).where(eq(subscriptions.userId, user.id));
  await db
    .update(billingEvents)
    .set({ userId: null })
    .where(eq(billingEvents.userId, user.id));
  await db.delete(auditLogs).where(eq(auditLogs.actorUserId, user.id));
  await db.delete(studentProfiles).where(eq(studentProfiles.email, user.email));
  await db.delete(users).where(eq(users.id, user.id));

  return Response.json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": clearedSessionCookie(new URL(request.url).protocol === "https:"),
      },
    },
  );
}
