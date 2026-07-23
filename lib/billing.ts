import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { billingEvents, subscriptions, users } from "@/db/schema";
import type { SessionUser } from "@/lib/auth";
import { normalizePlan, type PlanId } from "@/lib/saas";
import { publicAppUrl, runtimeValue } from "@/lib/runtime-env";
import {
  caktoCheckoutConfigured,
  createCaktoCheckout,
  type BillingCycle,
} from "@/lib/cakto";

type StripeObject = {
  id?: string;
  customer?: string;
  subscription?: string;
  status?: string;
  client_reference_id?: string;
  current_period_end?: number;
  cancel_at_period_end?: boolean;
  amount_paid?: number;
  amount_refunded?: number;
  metadata?: Record<string, string>;
};

type StripeEvent = {
  id: string;
  type: string;
  data: { object: StripeObject };
};

function stripeSecret() {
  return runtimeValue("STRIPE_SECRET_KEY");
}

export function stripeConfigured() {
  return Boolean(
    stripeSecret() &&
      runtimeValue("STRIPE_PRO_MONTHLY_PRICE_ID") &&
      runtimeValue("STRIPE_PRO_ANNUAL_PRICE_ID") &&
      runtimeValue("STRIPE_TEAMS_MONTHLY_PRICE_ID") &&
      runtimeValue("STRIPE_TEAMS_ANNUAL_PRICE_ID") &&
      runtimeValue("STRIPE_WEBHOOK_SECRET"),
  );
}

export function billingProvider() {
  const selected = runtimeValue("BILLING_PROVIDER").toLocaleLowerCase("pt-BR");
  if (selected === "cakto") return "cakto" as const;
  if (selected === "stripe") return "stripe" as const;
  return caktoCheckoutConfigured() ? ("cakto" as const) : ("stripe" as const);
}

export function billingConfigured() {
  return billingProvider() === "cakto" ? caktoCheckoutConfigured() : stripeConfigured();
}

function priceId(planId: Exclude<PlanId, "free">, cycle: BillingCycle) {
  return runtimeValue(
    `STRIPE_${planId.toUpperCase()}_${cycle === "monthly" ? "MONTHLY" : "ANNUAL"}_PRICE_ID`,
  );
}

async function stripeRequest(path: string, body: URLSearchParams) {
  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecret()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const payload = (await response.json()) as { id?: string; url?: string; error?: { message?: string } };
  if (!response.ok) {
    throw new Error(payload.error?.message ?? `Stripe respondeu com HTTP ${response.status}.`);
  }
  return payload;
}

export async function createCheckout(
  request: Request,
  user: SessionUser,
  planId: Exclude<PlanId, "free">,
  cycle: BillingCycle,
) {
  if (billingProvider() === "cakto") {
    return createCaktoCheckout(user, planId, cycle);
  }
  if (!stripeConfigured()) {
    return { configured: false as const, url: null };
  }
  const body = new URLSearchParams();
  body.set("mode", "subscription");
  body.set("client_reference_id", user.id);
  body.set("customer_email", user.email);
  body.set("line_items[0][price]", priceId(planId, cycle));
  body.set("line_items[0][quantity]", "1");
  body.set("success_url", `${publicAppUrl(request)}/conta?checkout=sucesso`);
  body.set("cancel_url", `${publicAppUrl(request)}/precos?checkout=cancelado`);
  body.set("allow_promotion_codes", "true");
  body.set("metadata[userId]", user.id);
  body.set("metadata[planId]", planId);
  body.set("metadata[billingCycle]", cycle);
  body.set("subscription_data[metadata][userId]", user.id);
  body.set("subscription_data[metadata][planId]", planId);
  body.set("subscription_data[metadata][billingCycle]", cycle);
  const session = await stripeRequest("checkout/sessions", body);
  return { configured: true as const, url: session.url ?? null };
}

export async function createBillingPortal(request: Request, user: SessionUser) {
  if (billingProvider() === "cakto") {
    const url = runtimeValue("CAKTO_CUSTOMER_PORTAL_URL");
    return { configured: Boolean(url), url: url || null };
  }
  const [subscription] = await getDb()
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, user.id))
    .limit(1);
  if (!stripeConfigured() || !subscription?.providerCustomerId) {
    return { configured: false as const, url: null };
  }
  const body = new URLSearchParams();
  body.set("customer", subscription.providerCustomerId);
  body.set("return_url", `${publicAppUrl(request)}/conta`);
  const portal = await stripeRequest("billing_portal/sessions", body);
  return { configured: true as const, url: portal.url ?? null };
}

function hex(bytes: ArrayBuffer) {
  return [...new Uint8Array(bytes)]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(first: string, second: string) {
  if (first.length !== second.length) return false;
  let result = 0;
  for (let index = 0; index < first.length; index += 1) {
    result |= first.charCodeAt(index) ^ second.charCodeAt(index);
  }
  return result === 0;
}

export async function verifyStripeSignature(payload: string, header: string) {
  const secret = runtimeValue("STRIPE_WEBHOOK_SECRET");
  if (!secret || !header) return false;
  const timestamp = header
    .split(",")
    .find((part) => part.startsWith("t="))
    ?.slice(2);
  const signatures = header
    .split(",")
    .filter((part) => part.startsWith("v1="))
    .map((part) => part.slice(3));
  if (!timestamp || !signatures.length) return false;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const expected = hex(
    await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(`${timestamp}.${payload}`),
    ),
  );
  return signatures.some((signature) => safeEqual(signature, expected));
}

function activePlan(status: string | undefined, requestedPlan: string | undefined) {
  return status === "active" || status === "trialing"
    ? normalizePlan(requestedPlan)
    : "free";
}

export async function processStripeEvent(event: StripeEvent, rawPayload: string) {
  const db = getDb();
  const [existing] = await db
    .select({ id: billingEvents.id })
    .from(billingEvents)
    .where(
      and(
        eq(billingEvents.provider, "stripe"),
        eq(billingEvents.providerEventId, event.id),
      ),
    )
    .limit(1);
  if (existing) return { duplicate: true };

  const object = event.data.object;
  let userId = object.metadata?.userId ?? object.client_reference_id ?? null;
  let planId = normalizePlan(object.metadata?.planId);
  let cycle =
    object.metadata?.billingCycle === "annual" ? "annual" : "monthly";
  const providerSubscriptionId =
    object.subscription ?? (event.type.startsWith("customer.subscription.") ? object.id : null);
  if (!userId && providerSubscriptionId) {
    const [storedSubscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.providerSubscriptionId, providerSubscriptionId))
      .limit(1);
    if (storedSubscription) {
      userId = storedSubscription.userId;
      planId = normalizePlan(storedSubscription.planId);
      cycle = storedSubscription.billingCycle === "annual" ? "annual" : "monthly";
    }
  }

  if (userId && event.type === "checkout.session.completed") {
    const now = new Date();
    await db.insert(subscriptions).values({
      id: crypto.randomUUID(),
      userId,
      provider: "stripe",
      providerCustomerId: object.customer ?? null,
      providerSubscriptionId: object.subscription ?? null,
      planId,
      billingCycle: cycle,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });
    await db
      .update(users)
      .set({ planId, updatedAt: now })
      .where(eq(users.id, userId));
  }

  if (
    userId &&
    (event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted")
  ) {
    const status =
      event.type === "customer.subscription.deleted" ? "canceled" : object.status ?? "unknown";
    const selectedPlan = activePlan(status, object.metadata?.planId);
    await db
      .update(subscriptions)
      .set({
        status,
        planId,
        currentPeriodEnd: object.current_period_end
          ? new Date(object.current_period_end * 1000)
          : null,
        cancelAtPeriodEnd: Boolean(object.cancel_at_period_end),
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(subscriptions.provider, "stripe"),
          eq(subscriptions.providerSubscriptionId, object.id ?? ""),
        ),
      );
    await db
      .update(users)
      .set({ planId: selectedPlan, updatedAt: new Date() })
      .where(eq(users.id, userId));
  }

  if (userId && event.type === "invoice.payment_failed" && providerSubscriptionId) {
    await db
      .update(subscriptions)
      .set({ status: "past_due", updatedAt: new Date() })
      .where(eq(subscriptions.providerSubscriptionId, providerSubscriptionId));
  }

  await db.insert(billingEvents).values({
    id: crypto.randomUUID(),
    provider: "stripe",
    providerEventId: event.id,
    userId,
    eventType: event.type,
    status: object.status ?? "received",
    amountCents:
      event.type === "charge.refunded"
        ? -(object.amount_refunded ?? 0)
        : object.amount_paid ?? null,
    payloadJson: rawPayload,
    createdAt: new Date(),
  });
  return { duplicate: false };
}
