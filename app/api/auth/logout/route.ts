import { clearedSessionCookie, getSessionUser, revokeSession } from "@/lib/auth";
import { recordAudit } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const user = await getSessionUser(request);
  await revokeSession(request);
  if (user) {
    await recordAudit("auth.logout", "user", {
      actorUserId: user.id,
      targetId: user.id,
      request,
    });
  }
  return Response.json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": clearedSessionCookie(new URL(request.url).protocol === "https:"),
      },
    },
  );
}
