import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { studentProfiles, users } from "@/db/schema";
import { createAccountToken } from "@/lib/auth";
import { enforceRateLimit, recordAudit } from "@/lib/audit";
import { sendPasswordResetEmail } from "@/lib/email";
import { publicAppUrl, runtimeValue } from "@/lib/runtime-env";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await enforceRateLimit(request, "auth.reset.requested", 5, 30))) {
    return Response.json(
      { error: "Muitas solicitações. Tente novamente mais tarde." },
      { status: 429 },
    );
  }
  const payload = (await request.json()) as { email?: string };
  const email = payload.email?.trim().toLowerCase() ?? "";
  const [user] = await getDb().select().from(users).where(eq(users.email, email)).limit(1);
  let previewUrl: string | undefined;
  let emailSent = false;

  if (user) {
    const [profile] = await getDb()
      .select()
      .from(studentProfiles)
      .where(eq(studentProfiles.email, email))
      .limit(1);
    const token = await createAccountToken(user.id, "reset_password", 30);
    try {
      emailSent = (await sendPasswordResetEmail(request, email, token)).sent;
    } catch {
      emailSent = false;
    }
    if (runtimeValue("APP_ENV") !== "production" && !emailSent) {
      previewUrl = `${publicAppUrl(request)}/redefinir-senha?token=${encodeURIComponent(token)}`;
    }
    await recordAudit("auth.reset.requested", "user", {
      targetId: user.id,
      request,
      metadata: { emailSent, displayName: profile?.displayName ?? null },
    });
  }

  return Response.json({
    ok: true,
    emailSent,
    previewUrl,
    message: "Se a conta existir, enviaremos as instruções de redefinição.",
  });
}
