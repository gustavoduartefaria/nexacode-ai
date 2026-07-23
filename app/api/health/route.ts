import { getDb } from "@/db";
import { users } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await getDb().select({ id: users.id }).from(users).limit(1);
    return Response.json({
      status: "ok",
      service: "nexacode-ai",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return Response.json(
      { status: "degraded", service: "nexacode-ai", database: "unavailable" },
      { status: 503 },
    );
  }
}
