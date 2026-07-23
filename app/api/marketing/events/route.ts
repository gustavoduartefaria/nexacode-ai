import { enforceRateLimit, recordAudit } from "@/lib/audit";

export const dynamic = "force-dynamic";

const EVENTS = new Set([
  "page_view",
  "cta_signup",
  "cta_pricing",
  "cta_teams",
  "cta_checkout",
]);

function cleanRecord(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key, entry]) => /^[a-z0-9_]{1,40}$/i.test(key) && typeof entry === "string")
      .slice(0, 12)
      .map(([key, entry]) => [key, (entry as string).slice(0, 160)]),
  );
}

export async function POST(request: Request) {
  if (!(await enforceRateLimit(request, "marketing.event", 60, 10))) {
    return Response.json({ error: "Limite de eventos excedido." }, { status: 429 });
  }
  try {
    const payload = (await request.json()) as {
      event?: string;
      path?: string;
      campaign?: unknown;
      metadata?: unknown;
    };
    const event = payload.event?.trim() ?? "";
    const path = payload.path?.trim() ?? "";
    if (!EVENTS.has(event) || !path.startsWith("/") || path.length > 200) {
      return Response.json({ error: "Evento inválido." }, { status: 400 });
    }
    await recordAudit("marketing.event", "funnel", {
      request,
      metadata: {
        event,
        path,
        campaign: cleanRecord(payload.campaign),
        details: cleanRecord(payload.metadata),
      },
    });
    return Response.json({ received: true }, { status: 202 });
  } catch {
    return Response.json({ error: "Evento inválido." }, { status: 400 });
  }
}
