import { getSessionUser } from "@/lib/auth";
import { plans } from "@/lib/saas";
import { emailDeliveryConfigured } from "@/lib/email";
import { billingConfigured, billingProvider } from "@/lib/billing";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const user = await getSessionUser(request);
  if (!user) {
    return Response.json({ authenticated: false }, { status: 401 });
  }
  return Response.json({
    authenticated: true,
    user,
    plan: plans[user.planId],
    integrations: {
      email: emailDeliveryConfigured(),
      billing: billingConfigured(),
      billingProvider: billingProvider(),
      remoteAi: false,
    },
  });
}
