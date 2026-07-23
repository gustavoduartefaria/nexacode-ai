import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { consumeAccountToken } from "@/lib/auth";
import { recordAudit } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const payload = (await request.json()) as { token?: string };
  const token = payload.token ?? "";
  const record = token ? await consumeAccountToken(token, "verify_email") : null;
  if (!record) {
    return Response.json({ error: "Link inválido ou expirado." }, { status: 400 });
  }
  await getDb()
    .update(users)
    .set({ emailVerifiedAt: new Date(), updatedAt: new Date() })
    .where(eq(users.id, record.userId));
  await recordAudit("auth.email_verified", "user", {
    actorUserId: record.userId,
    targetId: record.userId,
    request,
  });
  return Response.json({ ok: true });
}
