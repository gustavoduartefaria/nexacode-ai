import { and, count, eq } from "drizzle-orm";
import { getDb } from "@/db";
import {
  organizationInvitations,
  organizationMembers,
  organizations,
} from "@/db/schema";
import { requireSessionUser, sha256 } from "@/lib/auth";
import { recordAudit } from "@/lib/audit";
import { sendOrganizationInvitationEmail } from "@/lib/email";
import { publicAppUrl, runtimeValue } from "@/lib/runtime-env";

export const dynamic = "force-dynamic";

function createToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function POST(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  if (auth.user.planId !== "teams") {
    return Response.json({ error: "Convites exigem o plano Equipes." }, { status: 403 });
  }
  const payload = (await request.json()) as {
    organizationId?: string;
    email?: string;
    role?: string;
  };
  const email = payload.email?.trim().toLowerCase() ?? "";
  const role =
    payload.role === "teacher" || payload.role === "admin" ? payload.role : "student";
  if (!payload.organizationId || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Informe uma organização e um e-mail válidos." }, { status: 400 });
  }
  const db = getDb();
  const [membership] = await db
    .select()
    .from(organizationMembers)
    .where(
      and(
        eq(organizationMembers.organizationId, payload.organizationId),
        eq(organizationMembers.userId, auth.user.id),
      ),
    )
    .limit(1);
  if (!membership || !["admin", "teacher"].includes(membership.role)) {
    return Response.json({ error: "Você não pode convidar membros para esta equipe." }, { status: 403 });
  }
  const [organization] = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, payload.organizationId))
    .limit(1);
  if (!organization) return Response.json({ error: "Organização não encontrada." }, { status: 404 });
  const [memberCount] = await db
    .select({ value: count() })
    .from(organizationMembers)
    .where(eq(organizationMembers.organizationId, organization.id));
  if (Number(memberCount?.value ?? 0) >= organization.seatLimit) {
    return Response.json({ error: "O limite de membros do plano foi atingido." }, { status: 409 });
  }

  const token = createToken();
  const invitationId = crypto.randomUUID();
  await db.insert(organizationInvitations).values({
    id: invitationId,
    organizationId: organization.id,
    email,
    role,
    tokenHash: await sha256(token),
    status: "pending",
    invitedByUserId: auth.user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  });
  let emailSent = false;
  try {
    emailSent = (
      await sendOrganizationInvitationEmail(request, email, organization.name, token)
    ).sent;
  } catch {
    emailSent = false;
  }
  await recordAudit("organization.invited", "invitation", {
    actorUserId: auth.user.id,
    targetId: invitationId,
    request,
    metadata: { organizationId: organization.id, role, emailSent },
  });
  return Response.json({
    invitation: { id: invitationId, email, role, emailSent },
    previewUrl:
      runtimeValue("APP_ENV") !== "production" && !emailSent
        ? `${publicAppUrl(request)}/convite?token=${encodeURIComponent(token)}`
        : undefined,
  });
}
