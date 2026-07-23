import { requireSessionUser } from "@/lib/auth";
import { createBillingPortal } from "@/lib/billing";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const auth = await requireSessionUser(request);
  if (!auth.user) return auth.response;
  try {
    const portal = await createBillingPortal(request, auth.user);
    if (!portal.configured) {
      return Response.json(
        { error: "Não existe uma assinatura Stripe ativa para esta conta." },
        { status: 409 },
      );
    }
    return Response.json({ url: portal.url });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Falha ao abrir a assinatura." },
      { status: 502 },
    );
  }
}
