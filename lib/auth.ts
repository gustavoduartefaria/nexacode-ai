import { and, eq, gt } from "drizzle-orm";
import { cookies } from "next/headers";
import { databaseConfigured, getDb } from "@/db";
import {
  accountTokens,
  studentProfiles,
  userSessions,
  users,
} from "@/db/schema";
import { normalizePlan, type PlanId } from "@/lib/saas";
import { runtimeValue } from "@/lib/runtime-env";

const SESSION_COOKIE = "nexa_session";
const SESSION_SECONDS = 60 * 60 * 24 * 30;
const PASSWORD_ITERATIONS = 210_000;
const encoder = new TextEncoder();

export type SessionUser = {
  id: string;
  email: string;
  displayName: string;
  role: "student" | "admin";
  status: string;
  planId: PlanId;
  emailVerified: boolean;
  avatarPreset: "orbit" | "terminal" | "pixel" | "nebula";
  themePreference: "system" | "dark" | "light";
  aiEnabled: boolean;
};

function normalizeAvatar(value: string | null | undefined): SessionUser["avatarPreset"] {
  return value === "terminal" || value === "pixel" || value === "nebula"
    ? value
    : "orbit";
}

function normalizeTheme(value: string | null | undefined): SessionUser["themePreference"] {
  return value === "dark" || value === "light" ? value : "system";
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(base64 + padding);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function randomToken(size = 32) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return bytesToBase64Url(bytes);
}

export async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return bytesToBase64Url(new Uint8Array(digest));
}

export async function hashPassword(password: string) {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const derived = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations: PASSWORD_ITERATIONS,
    },
    key,
    256,
  );
  return `pbkdf2-sha256$${PASSWORD_ITERATIONS}$${bytesToBase64Url(salt)}$${bytesToBase64Url(new Uint8Array(derived))}`;
}

export async function verifyPassword(password: string, encodedHash: string) {
  const [algorithm, iterationsValue, saltValue, expectedValue] = encodedHash.split("$");
  const iterations = Number(iterationsValue);
  if (
    algorithm !== "pbkdf2-sha256" ||
    !Number.isInteger(iterations) ||
    iterations < 100_000 ||
    !saltValue ||
    !expectedValue
  ) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const derived = new Uint8Array(
    await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-256",
        salt: base64UrlToBytes(saltValue),
        iterations,
      },
      key,
      256,
    ),
  );
  const expected = base64UrlToBytes(expectedValue);
  if (derived.length !== expected.length) return false;
  let difference = 0;
  for (let index = 0; index < derived.length; index += 1) {
    difference |= derived[index] ^ expected[index];
  }
  return difference === 0;
}

export function validatePassword(password: string) {
  if (password.length < 10 || password.length > 128) {
    return "Use uma senha entre 10 e 128 caracteres.";
  }
  if (!/[a-z]/i.test(password) || !/\d/.test(password)) {
    return "Combine letras e pelo menos um número.";
  }
  return null;
}

export async function createSession(userId: string) {
  const token = randomToken();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_SECONDS * 1000);
  await getDb().insert(userSessions).values({
    id: crypto.randomUUID(),
    userId,
    tokenHash: await sha256(token),
    expiresAt,
    createdAt: now,
    lastSeenAt: now,
  });
  return { token, expiresAt };
}

export function sessionCookie(token: string, secure: boolean) {
  return [
    `${SESSION_COOKIE}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_SECONDS}`,
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function clearedSessionCookie(secure: boolean) {
  return [
    `${SESSION_COOKIE}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function sessionTokenFromRequest(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  return match ? decodeURIComponent(match.slice(SESSION_COOKIE.length + 1)) : null;
}

async function sessionUserFromToken(token: string | null): Promise<SessionUser | null> {
  if (!token) return null;
  if (!databaseConfigured()) return null;
  const db = getDb();
  const [session] = await db
    .select()
    .from(userSessions)
    .where(
      and(
        eq(userSessions.tokenHash, await sha256(token)),
        gt(userSessions.expiresAt, new Date()),
      ),
    )
    .limit(1);
  if (!session) return null;

  const [user] = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);
  if (!user || user.status !== "active") return null;
  const [profile] = await db
    .select()
    .from(studentProfiles)
    .where(eq(studentProfiles.email, user.email))
    .limit(1);

  return {
    id: user.id,
    email: user.email,
    displayName: profile?.displayName ?? user.email.split("@")[0],
    role: user.role === "admin" ? "admin" : "student",
    status: user.status,
    planId: normalizePlan(user.planId),
    emailVerified: Boolean(user.emailVerifiedAt),
    avatarPreset: normalizeAvatar(profile?.avatarPreset),
    themePreference: normalizeTheme(profile?.themePreference),
    aiEnabled: profile?.aiEnabled ?? true,
  };
}

export async function getSessionUser(request?: Request) {
  if (request) {
    return sessionUserFromToken(sessionTokenFromRequest(request));
  }
  const cookieStore = await cookies();
  return sessionUserFromToken(cookieStore.get(SESSION_COOKIE)?.value ?? null);
}

export async function requireSessionUser(request: Request) {
  const user = await getSessionUser(request);
  if (!user) {
    return {
      user: null,
      response: Response.json({ error: "Entre na sua conta para continuar." }, { status: 401 }),
    };
  }
  return { user, response: null };
}

export async function revokeSession(request: Request) {
  const token = sessionTokenFromRequest(request);
  if (!token) return;
  await getDb()
    .delete(userSessions)
    .where(eq(userSessions.tokenHash, await sha256(token)));
}

export async function createAccountToken(
  userId: string,
  purpose: "verify_email" | "reset_password",
  minutes: number,
) {
  const token = randomToken();
  const now = new Date();
  await getDb().insert(accountTokens).values({
    id: crypto.randomUUID(),
    userId,
    purpose,
    tokenHash: await sha256(token),
    expiresAt: new Date(now.getTime() + minutes * 60_000),
    createdAt: now,
  });
  return token;
}

export async function consumeAccountToken(
  token: string,
  purpose: "verify_email" | "reset_password",
) {
  const db = getDb();
  const [record] = await db
    .select()
    .from(accountTokens)
    .where(
      and(
        eq(accountTokens.tokenHash, await sha256(token)),
        eq(accountTokens.purpose, purpose),
        gt(accountTokens.expiresAt, new Date()),
      ),
    )
    .limit(1);
  if (!record || record.usedAt) return null;
  await db
    .update(accountTokens)
    .set({ usedAt: new Date() })
    .where(eq(accountTokens.id, record.id));
  return record;
}

export function isAdminEmail(email: string) {
  const configured = runtimeValue("ADMIN_EMAILS")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return configured.includes(email.toLowerCase());
}
