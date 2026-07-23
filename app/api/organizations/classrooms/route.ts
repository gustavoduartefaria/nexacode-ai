import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { classrooms, organizationMembers } from "@/db/schema";
import { requireSessionUser } from "@/lib/auth";
import { recordAudit } from "@/lib/audit";
import { canUseFeature } from "@/lib/saas";

export const dynamic = "force-dynamic";

async function managementMembership(userId: string, organizationId: string) {
  const [membership] = await getDb()
    .select()
    .from(organizationMembers)
    .where(
      and(
        eq(organizationMembers.userId, userId),
        eq(organizationMembers.organizationId, organizationId),
      ),
    )
    .limit(1);
  return membership &&
    (membership.role === "admin" || membership.role === "teacher")
    ? membership
    : null;
}

export async function GET(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  const organizationId = new URL(request.url).searchParams.get("organizationId") ?? "";
  if (!(await managementMembership(auth.user.id, organizationId))) {
    return Response.json({ error: "Você não pode consultar as turmas desta organização." }, { status: 403 });
  }
  const list = await getDb()
    .select()
    .from(classrooms)
    .where(eq(classrooms.organizationId, organizationId));
  return Response.json({ classrooms: list });
}

export async function POST(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  if (!canUseFeature(auth.user.planId, "organizations")) {
    return Response.json({ error: "Turmas estão disponíveis no plano Equipes." }, { status: 403 });
  }
  const payload = (await request.json()) as { organizationId?: string; name?: string };
  const organizationId = payload.organizationId ?? "";
  const name = payload.name?.trim() ?? "";
  if (name.length < 2 || name.length > 60) {
    return Response.json({ error: "Informe um nome de turma entre 2 e 60 caracteres." }, { status: 400 });
  }
  if (!(await managementMembership(auth.user.id, organizationId))) {
    return Response.json({ error: "Você não pode criar turmas nesta organização." }, { status: 403 });
  }
  const now = new Date();
  try {
    const classroom = {
      id: crypto.randomUUID(),
      organizationId,
      name,
      createdByUserId: auth.user.id,
      createdAt: now,
      updatedAt: now,
    };
    await getDb().insert(classrooms).values(classroom);
    await recordAudit("classroom.created", "classroom", {
      actorUserId: auth.user.id,
      targetId: classroom.id,
      request,
      metadata: { organizationId },
    });
    return Response.json({ classroom }, { status: 201 });
  } catch {
    return Response.json({ error: "Já existe uma turma com esse nome." }, { status: 409 });
  }
}
