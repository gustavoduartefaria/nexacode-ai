import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { requireSessionUser } from "@/lib/auth";
import { recordAudit } from "@/lib/audit";
import { normalizePlan } from "@/lib/saas";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  if (auth.user.role !== "admin") {
    return Response.json({ error: "Área restrita a administradores." }, { status: 403 });
  }
  const payload = (await request.json()) as {
    userId?: string;
    status?: string;
    planId?: string;
  };
  if (!payload.userId || payload.userId === auth.user.id) {
    return Response.json({ error: "Operação não permitida." }, { status: 400 });
  }
  const status =
    payload.status === "suspended" || payload.status === "active"
      ? payload.status
      : undefined;
  const planId = payload.planId ? normalizePlan(payload.planId) : undefined;
  if (!status && !planId) {
    return Response.json({ error: "Nenhuma alteração válida foi enviada." }, { status: 400 });
  }
  await getDb()
    .update(users)
    .set({ ...(status ? { status } : {}), ...(planId ? { planId } : {}), updatedAt: new Date() })
    .where(eq(users.id, payload.userId));
  await recordAudit("admin.user_updated", "user", {
    actorUserId: auth.user.id,
    targetId: payload.userId,
    request,
    metadata: { status, planId },
  });
  return Response.json({ ok: true });
}
