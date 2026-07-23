import { and, count, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { classrooms, organizationMembers, organizations } from "@/db/schema";
import { requireSessionUser } from "@/lib/auth";
import { recordAudit } from "@/lib/audit";
import { canUseFeature, plans } from "@/lib/saas";

export const dynamic = "force-dynamic";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 42);
}

export async function GET(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  const db = getDb();
  const memberships = await db
    .select({
      id: organizations.id,
      name: organizations.name,
      slug: organizations.slug,
      seatLimit: organizations.seatLimit,
      role: organizationMembers.role,
      createdAt: organizations.createdAt,
    })
    .from(organizationMembers)
    .innerJoin(organizations, eq(organizations.id, organizationMembers.organizationId))
    .where(eq(organizationMembers.userId, auth.user.id));
  const enriched = await Promise.all(
    memberships.map(async (organization) => {
      const [members, classCount] = await Promise.all([
        db
          .select({ value: count() })
          .from(organizationMembers)
          .where(eq(organizationMembers.organizationId, organization.id)),
        db
          .select({ value: count() })
          .from(classrooms)
          .where(eq(classrooms.organizationId, organization.id)),
      ]);
      return {
        ...organization,
        memberCount: Number(members[0]?.value ?? 0),
        classroomCount: Number(classCount[0]?.value ?? 0),
      };
    }),
  );
  return Response.json({ organizations: enriched });
}

export async function POST(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  if (!canUseFeature(auth.user.planId, "organizations")) {
    return Response.json(
      { error: "Organizações estão disponíveis no plano Equipes.", upgradeRequired: true },
      { status: 403 },
    );
  }
  const payload = (await request.json()) as { name?: string };
  const name = payload.name?.trim() ?? "";
  if (name.length < 2 || name.length > 80) {
    return Response.json({ error: "Informe um nome entre 2 e 80 caracteres." }, { status: 400 });
  }
  const db = getDb();
  const [existingOwned] = await db
    .select({ id: organizations.id })
    .from(organizations)
    .where(eq(organizations.ownerUserId, auth.user.id))
    .limit(1);
  if (existingOwned) {
    return Response.json(
      { error: "Seu plano atual permite uma organização por assinatura." },
      { status: 409 },
    );
  }
  const now = new Date();
  const organizationId = crypto.randomUUID();
  const slug = `${slugify(name) || "equipe"}-${organizationId.slice(0, 6)}`;
  await db.transaction(async (transaction) => {
    await transaction.insert(organizations).values({
      id: organizationId,
      ownerUserId: auth.user.id,
      name,
      slug,
      seatLimit: plans.teams.seatLimit,
      createdAt: now,
      updatedAt: now,
    });
    await transaction.insert(organizationMembers).values({
      id: crypto.randomUUID(),
      organizationId,
      userId: auth.user.id,
      role: "admin",
      joinedAt: now,
    });
  });
  await recordAudit("organization.created", "organization", {
    actorUserId: auth.user.id,
    targetId: organizationId,
    request,
  });
  return Response.json({ organization: { id: organizationId, name, slug } }, { status: 201 });
}

export async function PATCH(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  const payload = (await request.json()) as { organizationId?: string; name?: string };
  const name = payload.name?.trim() ?? "";
  if (!payload.organizationId || name.length < 2 || name.length > 80) {
    return Response.json({ error: "Dados inválidos." }, { status: 400 });
  }
  const [organization] = await getDb()
    .select()
    .from(organizations)
    .where(
      and(
        eq(organizations.id, payload.organizationId),
        eq(organizations.ownerUserId, auth.user.id),
      ),
    )
    .limit(1);
  if (!organization) return Response.json({ error: "Organização não encontrada." }, { status: 404 });
  await getDb()
    .update(organizations)
    .set({ name, updatedAt: new Date() })
    .where(eq(organizations.id, organization.id));
  return Response.json({ ok: true });
}
