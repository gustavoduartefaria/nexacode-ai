import { and, desc, eq, isNull } from "drizzle-orm";
import { getDb } from "@/db";
import { notifications } from "@/db/schema";
import { requireSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  const items = await getDb()
    .select()
    .from(notifications)
    .where(eq(notifications.userId, auth.user.id))
    .orderBy(desc(notifications.createdAt))
    .limit(12);
  return Response.json({
    notifications: items,
    unread: items.filter((item) => !item.readAt).length,
  });
}

export async function PATCH(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  await getDb()
    .update(notifications)
    .set({ readAt: new Date() })
    .where(and(eq(notifications.userId, auth.user.id), isNull(notifications.readAt)));
  return Response.json({ ok: true });
}
