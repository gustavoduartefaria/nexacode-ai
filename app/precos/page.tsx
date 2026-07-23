import type { Metadata } from "next";
import { HelpCircle, ShieldCheck, Sparkles } from "lucide-react";
import { MarketingHeader } from "@/app/marketing-header";
import MarketingTracker from "@/app/marketing-tracker";
import { PricingGrid } from "@/app/pricing-grid";
import ScrollReveal from "@/app/scroll-reveal";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Planos",
  description: "Planos Starter, Pro e Equipes do NexaCode AI.",
};

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ cycle?: string; intent?: string }>;
}) {
  const user = await getSessionUser();
  const params = await searchParams;
  const cycle = params.cycle === "monthly" ? "monthly" : "annual";
  const intent = params.intent === "pro" || params.intent === "teams" ? params.intent : undefined;
  return (
    <main className="marketing-page pricing-page">
      <MarketingTracker />
      <ScrollReveal />
      <div className="marketing-grid" aria-hidden="true" />
      <MarketingHeader authenticated={Boolean(user)} />
      <section className="pricing-hero" data-reveal="up">
        <span className="marketing-kicker"><Sparkles size={14} /> PLANOS TRANSPARENTES</span>
        <h1>Comece com curiosidade.<br />Evolua no seu ritmo.</h1>
        <p>Aprendizado técnico, progresso real e uma assinatura simples de entender. O plano gratuito continua disponível sem cartão.</p>
        <div className="pricing-hero-proof">
          <span><strong>44</strong> aulas de engenharia</span>
          <span><strong>3</strong> linguagens</span>
          <span><strong>0</strong> taxas escondidas</span>
        </div>
      </section>
      {intent && user && (
        <div className="pricing-intent-banner" data-reveal="up">
          Conta criada. Revise o plano {intent === "pro" ? "Pro" : "Equipes"} e continue para o checkout seguro.
        </div>
      )}
      <PricingGrid authenticated={Boolean(user)} cycle={cycle} intent={intent} />
      <section className="pricing-trust" data-reveal="up">
        <span><ShieldCheck size={19} /><strong>Checkout seguro</strong><small>Pagamento processado pela Cakto</small></span>
        <span><HelpCircle size={19} /><strong>Acesso automático</strong><small>O webhook libera seu plano após a aprovação</small></span>
        <span><Sparkles size={19} /><strong>Proteção de assinatura</strong><small>Reembolso, chargeback e cancelamento são sincronizados</small></span>
      </section>
    </main>
  );
}
