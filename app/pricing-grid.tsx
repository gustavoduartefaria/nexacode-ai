import { Check, CreditCard, LockKeyhole, Sparkles } from "lucide-react";
import Link from "next/link";
import BillingButton from "@/app/billing-button";
import { planOrder, plans } from "@/lib/saas";

type Cycle = "monthly" | "annual";

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function PricingGrid({
  authenticated,
  cycle,
  intent,
}: {
  authenticated: boolean;
  cycle: Cycle;
  intent?: "pro" | "teams";
}) {
  return (
    <>
      <div className="pricing-cycle" aria-label="Periodicidade da cobrança">
        <Link
          href="/precos?cycle=monthly"
          className={cycle === "monthly" ? "active" : ""}
          aria-current={cycle === "monthly" ? "page" : undefined}
        >
          Mensal
        </Link>
        <Link
          href="/precos?cycle=annual"
          className={cycle === "annual" ? "active" : ""}
          aria-current={cycle === "annual" ? "page" : undefined}
        >
          Anual <span>2 meses de economia</span>
        </Link>
      </div>
      <section className="pricing-grid">
        {planOrder.map((planId) => {
          const plan = plans[planId];
          const total = cycle === "annual" ? plan.annualPrice : plan.monthlyPrice;
          const monthlyEquivalent = cycle === "annual" ? total / 12 : total;
          return (
            <article
              className={`${planId === "pro" ? "featured" : ""}${intent === planId ? " pricing-intent" : ""}`}
              key={plan.id}
            >
              {planId === "pro" && <span className="pricing-popular">MAIS ESCOLHIDO</span>}
              <div className="pricing-card-head">
                <span className="pricing-plan-icon">
                  {planId === "free" ? <Sparkles size={19} /> : planId === "pro" ? <CreditCard size={19} /> : <LockKeyhole size={19} />}
                </span>
                <small>{plan.eyebrow}</small>
              </div>
              <h2>{plan.name}</h2>
              <p>{plan.description}</p>
              <div className="pricing-value">
                <strong>{total ? money.format(monthlyEquivalent) : "Grátis"}</strong>
                {total > 0 && <span>/ mês</span>}
              </div>
              {total > 0 && (
                <small className="pricing-charge-note">
                  {cycle === "annual" ? `${money.format(total)} cobrados anualmente` : "Cobrança mensal recorrente"}
                </small>
              )}
              <ul>{plan.features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul>
              <BillingButton planId={planId} authenticated={authenticated} cycle={cycle} />
              {planId !== "free" && <span className="pricing-secure"><LockKeyhole size={12} /> Checkout protegido pela Cakto</span>}
            </article>
          );
        })}
      </section>
    </>
  );
}
