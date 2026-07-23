import { processStripeEvent, verifyStripeSignature } from "@/lib/billing";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";
  if (!(await verifyStripeSignature(payload, signature))) {
    return Response.json({ error: "Assinatura do webhook inválida." }, { status: 400 });
  }
  try {
    const event = JSON.parse(payload) as Parameters<typeof processStripeEvent>[0];
    const result = await processStripeEvent(event, payload);
    return Response.json({ received: true, ...result });
  } catch {
    return Response.json({ error: "Não foi possível processar o evento." }, { status: 500 });
  }
}
