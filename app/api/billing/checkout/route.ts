import { billingProvider, createCheckout } from "@/lib/billing";
import { requireSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  const payload = (await request.json()) as { planId?: string; cycle?: string };
  if (payload.planId !== "pro" && payload.planId !== "teams") {
    return Response.json({ error: "Escolha um plano válido." }, { status: 400 });
  }
  const cycle = payload.cycle === "annual" ? "annual" : "monthly";
  try {
    const checkout = await createCheckout(request, auth.user, payload.planId, cycle);
    if (!checkout.configured) {
      return Response.json(
        {
          error:
            `O checkout ${billingProvider() === "cakto" ? "da Cakto" : "da Stripe"} ainda não foi configurado.`,
          configured: false,
        },
        { status: 503 },
      );
    }
    return Response.json({ url: checkout.url, configured: true, provider: billingProvider() });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Falha ao iniciar o checkout." },
      { status: 502 },
    );
  }
}
