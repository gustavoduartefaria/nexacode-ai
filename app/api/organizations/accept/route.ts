import { and, eq, gt } from "drizzle-orm";
import { getDb } from "@/db";
import {
  organizationInvitations,
  organizationMembers,
} from "@/db/schema";
import { requireSessionUser, sha256 } from "@/lib/auth";
import { recordAudit } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  const payload = (await request.json()) as { token?: string };
  if (!payload.token) return Response.json({ error: "Convite inválido." }, { status: 400 });
  const db = getDb();
  const [invitation] = await db
    .select()
    .from(organizationInvitations)
    .where(
      and(
        eq(organizationInvitations.tokenHash, await sha256(payload.token)),
        eq(organizationInvitations.status, "pending"),
        gt(organizationInvitations.expiresAt, new Date()),
      ),
    )
    .limit(1);
  if (!invitation || invitation.email !== auth.user.email) {
    return Response.json({ error: "Este convite é inválido, expirou ou pertence a outro e-mail." }, { status: 400 });
  }
  const now = new Date();
  await db.transaction(async (transaction) => {
    await transaction.insert(organizationMembers).values({
      id: crypto.randomUUID(),
      organizationId: invitation.organizationId,
      userId: auth.user.id,
      role: invitation.role,
      joinedAt: now,
    });
    await transaction
      .update(organizationInvitations)
      .set({ status: "accepted" })
      .where(eq(organizationInvitations.id, invitation.id));
  });
  await recordAudit("organization.invitation_accepted", "organization", {
    actorUserId: auth.user.id,
    targetId: invitation.organizationId,
    request,
  });
  return Response.json({ ok: true, organizationId: invitation.organizationId });
}
