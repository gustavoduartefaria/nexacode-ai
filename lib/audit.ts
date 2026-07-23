import { and, count, eq, gt } from "drizzle-orm";
import { getDb } from "@/db";
import { auditLogs } from "@/db/schema";
import { sha256 } from "@/lib/auth";

export async function requestFingerprint(request: Request) {
  const source =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "local";
  return sha256(source);
}

export async function recordAudit(
  action: string,
  targetType: string,
  options: {
    actorUserId?: string | null;
    targetId?: string | null;
    metadata?: Record<string, unknown>;
    request?: Request;
  } = {},
) {
  await getDb().insert(auditLogs).values({
    id: crypto.randomUUID(),
    actorUserId: options.actorUserId ?? null,
    action,
    targetType,
    targetId: options.targetId ?? null,
    metadataJson: JSON.stringify(options.metadata ?? {}),
    ipHash: options.request ? await requestFingerprint(options.request) : null,
    createdAt: new Date(),
  });
}

export async function enforceRateLimit(
  request: Request,
  action: string,
  maximum: number,
  windowMinutes: number,
) {
  const ipHash = await requestFingerprint(request);
  const [result] = await getDb()
    .select({ value: count() })
    .from(auditLogs)
    .where(
      and(
        eq(auditLogs.ipHash, ipHash),
        eq(auditLogs.action, action),
        gt(auditLogs.createdAt, new Date(Date.now() - windowMinutes * 60_000)),
      ),
    );
  return Number(result?.value ?? 0) < maximum;
}
