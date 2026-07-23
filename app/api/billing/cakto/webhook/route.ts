import { processCaktoEvent, verifyCaktoSecret } from "@/lib/cakto";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const rawPayload = await request.text();
  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawPayload) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "JSON inválido." }, { status: 400 });
  }
  if (!verifyCaktoSecret(payload)) {
    return Response.json({ error: "Segredo do webhook inválido." }, { status: 401 });
  }
  try {
    const result = await processCaktoEvent(payload, rawPayload);
    return Response.json({ received: true, ...result });
  } catch (error) {
    console.error("Cakto webhook processing failed", error);
    return Response.json({ error: "Não foi possível processar o evento." }, { status: 500 });
  }
}
