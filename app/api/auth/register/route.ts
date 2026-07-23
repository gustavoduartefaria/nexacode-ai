import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { studentProfiles, users } from "@/db/schema";
import {
  createAccountToken,
  createSession,
  hashPassword,
  isAdminEmail,
  sessionCookie,
  validatePassword,
} from "@/lib/auth";
import { enforceRateLimit, recordAudit } from "@/lib/audit";
import { sendVerificationEmail } from "@/lib/email";
import { publicAppUrl, runtimeValue } from "@/lib/runtime-env";

export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!(await enforceRateLimit(request, "auth.register", 6, 30))) {
    return Response.json(
      { error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." },
      { status: 429 },
    );
  }

  try {
    const payload = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
      acceptedTerms?: boolean;
    };
    const name = payload.name?.trim() ?? "";
    const email = payload.email?.trim().toLowerCase() ?? "";
    const password = payload.password ?? "";
    const passwordError = validatePassword(password);

    if (name.length < 2 || name.length > 60) {
      return Response.json({ error: "Informe um nome entre 2 e 60 caracteres." }, { status: 400 });
    }
    if (!EMAIL_PATTERN.test(email) || email.length > 160) {
      return Response.json({ error: "Informe um e-mail válido." }, { status: 400 });
    }
    if (passwordError) {
      return Response.json({ error: passwordError }, { status: 400 });
    }
    if (payload.acceptedTerms !== true) {
      return Response.json(
        { error: "Aceite os Termos de Uso e a Política de Privacidade." },
        { status: 400 },
      );
    }

    const db = getDb();
    const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
    if (existing) {
      return Response.json(
        { error: "Já existe uma conta com este e-mail. Tente entrar ou redefinir a senha." },
        { status: 409 },
      );
    }

    const now = new Date();
    const userId = crypto.randomUUID();
    const role = isAdminEmail(email) ? "admin" : "student";
    const usernameBase =
      email
        .split("@")[0]
        .toLowerCase()
        .replace(/[^a-z0-9._-]/g, "")
        .slice(0, 15) || "aluno";
    const username = `${usernameBase}-${userId.slice(0, 6)}`;

    await db.transaction(async (transaction) => {
      await transaction.insert(users).values({
        id: userId,
        email,
        passwordHash: await hashPassword(password),
        role,
        status: "active",
        planId: "free",
        createdAt: now,
        updatedAt: now,
      });
      await transaction.insert(studentProfiles).values({
        email,
        displayName: name,
        username,
        learningGoal: "improve-skills",
        experienceLevel: "beginner",
        weeklyGoal: 3,
        acceptedTermsAt: now,
        createdAt: now,
        updatedAt: now,
      });
    });

    const verificationToken = await createAccountToken(userId, "verify_email", 60 * 24);
    let emailSent = false;
    try {
      emailSent = (await sendVerificationEmail(request, email, name, verificationToken)).sent;
    } catch {
      emailSent = false;
    }
    const session = await createSession(userId);
    await recordAudit("auth.register", "user", {
      actorUserId: userId,
      targetId: userId,
      request,
      metadata: { emailSent },
    });

    const responseBody: Record<string, unknown> = {
      ok: true,
      emailSent,
      redirectTo: "/app",
    };
    if (runtimeValue("APP_ENV") !== "production" && !emailSent) {
      responseBody.verificationPreviewUrl = `${publicAppUrl(request)}/verificar-email?token=${encodeURIComponent(verificationToken)}`;
    }
    return Response.json(responseBody, {
      status: 201,
      headers: {
        "Set-Cookie": sessionCookie(session.token, new URL(request.url).protocol === "https:"),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const isSchemaMissing = message.includes("no such table");
    return Response.json(
      {
        error: isSchemaMissing
          ? "O banco do SaaS ainda está sendo preparado. Tente novamente após a atualização."
          : "Não foi possível criar sua conta agora.",
      },
      { status: isSchemaMissing ? 503 : 500 },
    );
  }
}
