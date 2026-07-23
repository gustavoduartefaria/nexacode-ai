import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { userSessions, users } from "@/db/schema";
import {
  consumeAccountToken,
  hashPassword,
  validatePassword,
} from "@/lib/auth";
import { recordAudit } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const payload = (await request.json()) as { token?: string; password?: string };
  const password = payload.password ?? "";
  const passwordError = validatePassword(password);
  if (passwordError) {
    return Response.json({ error: passwordError }, { status: 400 });
  }
  const record = payload.token
    ? await consumeAccountToken(payload.token, "reset_password")
    : null;
  if (!record) {
    return Response.json({ error: "Link inválido ou expirado." }, { status: 400 });
  }
  const db = getDb();
  await db
    .update(users)
    .set({ passwordHash: await hashPassword(password), updatedAt: new Date() })
    .where(eq(users.id, record.userId));
  await db.delete(userSessions).where(eq(userSessions.userId, record.userId));
  await recordAudit("auth.password_reset", "user", {
    actorUserId: record.userId,
    targetId: record.userId,
    request,
  });
  return Response.json({ ok: true });
}
