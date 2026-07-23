import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { billingEvents, subscriptions, users } from "@/db/schema";
import type { SessionUser } from "@/lib/auth";
import { runtimeValue } from "@/lib/runtime-env";
import type { PlanId } from "@/lib/saas";

export type BillingCycle = "monthly" | "annual";

type JsonRecord = Record<string, unknown>;

const activatingEvents = new Set([
  "purchase_approved",
  "subscription_created",
  "subscription_renewed",
]);
const revokingEvents = new Set(["refund", "chargeback", "subscription_canceled"]);
const knownEvents = new Set([
  ...activatingEvents,
  ...revokingEvents,
  "purchase_refused",
  "subscription_renewal_refused",
]);

function record(value: unknown): JsonRecord | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : null;
}

function valueAt(source: JsonRecord, path: string) {
  return path.split(".").reduce<unknown>((current, key) => record(current)?.[key], source);
}

function firstString(source: JsonRecord, paths: string[]) {
  for (const path of paths) {
    const value = valueAt(source, path);
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return "";
}

function safeEqual(first: string, second: string) {
  if (!first || first.length !== second.length) return false;
  let difference = 0;
  for (let index = 0; index < first.length; index += 1) {
    difference |= first.charCodeAt(index) ^ second.charCodeAt(index);
  }
  return difference === 0;
}

function list(key: string) {
  return runtimeValue(key)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function checkoutKey(planId: Exclude<PlanId, "free">, cycle: BillingCycle) {
  return `CAKTO_${planId.toUpperCase()}_${cycle === "monthly" ? "MONTHLY" : "ANNUAL"}_CHECKOUT_URL`;
}

function offerKey(planId: Exclude<PlanId, "free">, cycle: BillingCycle) {
  return `CAKTO_${planId.toUpperCase()}_${cycle === "monthly" ? "MONTHLY" : "ANNUAL"}_OFFER_ID`;
}

export function caktoCheckoutConfigured() {
  return Boolean(
    runtimeValue("CAKTO_WEBHOOK_SECRET") &&
      runtimeValue(checkoutKey("pro", "monthly")) &&
      runtimeValue(checkoutKey("pro", "annual")) &&
      runtimeValue(checkoutKey("teams", "monthly")) &&
      runtimeValue(checkoutKey("teams", "annual")),
  );
}

export function createCaktoCheckout(
  user: SessionUser,
  planId: Exclude<PlanId, "free">,
  cycle: BillingCycle,
) {
  const configuredUrl = runtimeValue(checkoutKey(planId, cycle));
  if (!runtimeValue("CAKTO_WEBHOOK_SECRET") || !configuredUrl) {
    return { configured: false as const, url: null };
  }
  const checkout = new URL(configuredUrl);
  checkout.searchParams.set("sck", user.id);
  checkout.searchParams.set("utm_source", "nexacode");
  return { configured: true as const, url: checkout.toString() };
}

function planFromPayload(payload: JsonRecord) {
  const offerId = firstString(payload, [
    "data.offer.id",
    "offer.id",
    "data.subscription.offer.id",
    "subscription.offer.id",
    "data.offer_id",
    "offer_id",
  ]);
  const offerName = firstString(payload, [
    "data.offer.name",
    "offer.name",
    "data.subscription.offer.name",
    "subscription.offer.name",
  ]);
  const productId = firstString(payload, [
    "data.product.id",
    "product.id",
    "data.offer.product.id",
    "offer.product.id",
    "data.product_id",
    "product_id",
  ]);
  const productName = firstString(payload, ["data.product.name", "product.name"]);
  for (const planId of ["pro", "teams"] as const) {
    for (const cycle of ["monthly", "annual"] as const) {
      if (offerId && runtimeValue(offerKey(planId, cycle)) === offerId) {
        return { planId, cycle, offerId, offerName, productId, productName };
      }
    }
    if (productId && list(`CAKTO_${planId.toUpperCase()}_PRODUCT_IDS`).includes(productId)) {
      const cycle = /\b(anual|annual)\b/i.test(`${offerName} ${productName}`)
        ? ("annual" as const)
        : ("monthly" as const);
      return { planId, cycle, offerId, offerName, productId, productName };
    }
  }
  return null;
}

function parseDate(value: string) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function periodEnd(payload: JsonRecord, cycle: BillingCycle) {
  const supplied = parseDate(
    firstString(payload, [
      "data.subscription.next_payment_date",
      "subscription.next_payment_date",
      "data.next_payment_date",
      "next_payment_date",
      "data.expires_at",
      "expires_at",
    ]),
  );
  if (supplied) return supplied;
  const date = new Date();
  if (cycle === "annual") date.setUTCFullYear(date.getUTCFullYear() + 1);
  else date.setUTCMonth(date.getUTCMonth() + 1);
  return date;
}

async function eventHash(rawPayload: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(rawPayload),
  );
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function verifyCaktoSecret(payload: JsonRecord) {
  const received = firstString(payload, ["secret", "data.secret", "webhook.secret"]);
  return safeEqual(received, runtimeValue("CAKTO_WEBHOOK_SECRET"));
}

export async function processCaktoEvent(payload: JsonRecord, rawPayload: string) {
  const eventType = firstString(payload, ["event", "event_type", "type", "data.event"]);
  if (!knownEvents.has(eventType)) return { ignored: true, reason: "unsupported_event" };

  const providerEventId =
    firstString(payload, [
      "event_id",
      "id",
      "data.event_id",
      "data.id",
      "data.order.id",
      "order.id",
      "data.transaction.id",
      "transaction.id",
    ]) || (await eventHash(rawPayload));
  const email = firstString(payload, [
    "data.customer.email",
    "customer.email",
    "data.client.email",
    "client.email",
    "data.email",
    "email",
  ]).toLocaleLowerCase("pt-BR");
  const trackedUserId = firstString(payload, ["data.sck", "sck", "data.order.sck", "order.sck"]);
  const customerId = firstString(payload, ["data.customer.id", "customer.id"]);
  const subscriptionId = firstString(payload, [
    "data.subscription.id",
    "subscription.id",
    "data.subscription_id",
    "subscription_id",
    "data.order.id",
    "order.id",
  ]);
  const selected = planFromPayload(payload);
  const safePayload = JSON.stringify({
    event: eventType,
    eventId: providerEventId,
    customerEmail: email || null,
    trackedUserId: trackedUserId || null,
    customerId: customerId || null,
    subscriptionId: subscriptionId || null,
    offerId: selected?.offerId || null,
    offerName: selected?.offerName || null,
    productId: selected?.productId || null,
  });
  const db = getDb();

  return db.transaction(async (transaction) => {
    const [billingEvent] = await transaction
      .insert(billingEvents)
      .values({
        id: crypto.randomUUID(),
        provider: "cakto",
        providerEventId,
        eventType,
        status: "processing",
        payloadJson: safePayload,
        createdAt: new Date(),
      })
      .onConflictDoNothing()
      .returning({ id: billingEvents.id });
    if (!billingEvent) return { duplicate: true };

    const [userById] = trackedUserId
      ? await transaction.select().from(users).where(eq(users.id, trackedUserId)).limit(1)
      : [];
    const [userByEmail] = !userById && email
      ? await transaction.select().from(users).where(eq(users.email, email)).limit(1)
      : [];
    const user = userById ?? userByEmail;
    if (!user) {
      await transaction
        .update(billingEvents)
        .set({ status: "unmatched_user" })
        .where(eq(billingEvents.id, billingEvent.id));
      return { duplicate: false, matched: false };
    }

    await transaction
      .update(billingEvents)
      .set({ userId: user.id })
      .where(eq(billingEvents.id, billingEvent.id));

    if (activatingEvents.has(eventType)) {
      if (!selected) {
        await transaction
          .update(billingEvents)
          .set({ status: "unknown_offer" })
          .where(eq(billingEvents.id, billingEvent.id));
        return { duplicate: false, matched: true, activated: false };
      }
      const [stored] = await transaction
        .select()
        .from(subscriptions)
        .where(
          subscriptionId
            ? and(
                eq(subscriptions.provider, "cakto"),
                eq(subscriptions.providerSubscriptionId, subscriptionId),
              )
            : and(eq(subscriptions.provider, "cakto"), eq(subscriptions.userId, user.id)),
        )
        .limit(1);
      const now = new Date();
      const values = {
        providerCustomerId: customerId || null,
        providerSubscriptionId: subscriptionId || null,
        planId: selected.planId,
        billingCycle: selected.cycle,
        status: "active",
        currentPeriodEnd: periodEnd(payload, selected.cycle),
        cancelAtPeriodEnd: false,
        updatedAt: now,
      };
      if (stored) {
        await transaction.update(subscriptions).set(values).where(eq(subscriptions.id, stored.id));
      } else {
        await transaction.insert(subscriptions).values({
          id: crypto.randomUUID(),
          userId: user.id,
          provider: "cakto",
          ...values,
          createdAt: now,
        });
      }
      await transaction
        .update(users)
        .set({ planId: selected.planId, updatedAt: now })
        .where(eq(users.id, user.id));
    } else if (revokingEvents.has(eventType)) {
      await transaction
        .update(subscriptions)
        .set({ status: eventType, updatedAt: new Date() })
        .where(and(eq(subscriptions.provider, "cakto"), eq(subscriptions.userId, user.id)));
      await transaction
        .update(users)
        .set({ planId: "free", updatedAt: new Date() })
        .where(eq(users.id, user.id));
    } else if (eventType === "subscription_renewal_refused") {
      await transaction
        .update(subscriptions)
        .set({ status: "past_due", updatedAt: new Date() })
        .where(and(eq(subscriptions.provider, "cakto"), eq(subscriptions.userId, user.id)));
    }

    await transaction
      .update(billingEvents)
      .set({ status: "processed" })
      .where(eq(billingEvents.id, billingEvent.id));
    return { duplicate: false, matched: true, activated: activatingEvents.has(eventType) };
  });
}
