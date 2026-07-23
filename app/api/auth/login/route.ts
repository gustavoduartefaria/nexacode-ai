import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { createSession, sessionCookie, verifyPassword } from "@/lib/auth";
import { enforceRateLimit, recordAudit } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await enforceRateLimit(request, "auth.login.failed", 8, 15))) {
    return Response.json(
      { error: "Acesso temporariamente bloqueado por excesso de tentativas." },
      { status: 429 },
    );
  }

  try {
    const payload = (await request.json()) as { email?: string; password?: string };
    const email = payload.email?.trim().toLowerCase() ?? "";
    const password = payload.password ?? "";
    const [user] = await getDb().select().from(users).where(eq(users.email, email)).limit(1);

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      await recordAudit("auth.login.failed", "user", {
        targetId: user?.id ?? null,
        request,
      });
      return Response.json({ error: "E-mail ou senha incorretos." }, { status: 401 });
    }
    if (user.status !== "active") {
      return Response.json(
        { error: "Esta conta está indisponível. Entre em contato com o suporte." },
        { status: 403 },
      );
    }

    const session = await createSession(user.id);
    await recordAudit("auth.login", "user", {
      actorUserId: user.id,
      targetId: user.id,
      request,
    });
    return Response.json(
      { ok: true, redirectTo: "/app", emailVerified: Boolean(user.emailVerifiedAt) },
      {
        headers: {
          "Set-Cookie": sessionCookie(session.token, new URL(request.url).protocol === "https:"),
        },
      },
    );
  } catch {
    return Response.json({ error: "Não foi possível entrar agora." }, { status: 500 });
  }
}
