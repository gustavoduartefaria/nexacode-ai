import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { MarketingHeader } from "@/app/marketing-header";
import MarketingTracker from "@/app/marketing-tracker";
import ScrollReveal from "@/app/scroll-reveal";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "NexaCode para Equipes",
  description:
    "Treinamento de JavaScript, Python e C++ para escolas e equipes, com turmas, papéis e acompanhamento de progresso.",
};

const benefits = [
  {
    icon: Users,
    title: "10 pessoas incluídas",
    description: "Convide estudantes, professores ou colaboradores e organize o acesso em uma única conta.",
  },
  {
    icon: GraduationCap,
    title: "Turmas organizadas",
    description: "Separe grupos, distribua responsabilidades e acompanhe uma jornada comum de aprendizagem.",
  },
  {
    icon: BarChart3,
    title: "Evolução visível",
    description: "Acompanhe progresso, XP, conclusão de aulas e participação sem depender de planilhas paralelas.",
  },
  {
    icon: ShieldCheck,
    title: "Permissões protegidas",
    description: "Papéis de gestor, professor e aluno são validados no servidor, junto ao plano contratado.",
  },
];

export default async function TeamsSalesPage() {
  const user = await getSessionUser();
  const destination = user
    ? "/precos?cycle=annual&intent=teams"
    : "/cadastro?plan=teams&cycle=annual";
  return (
    <main className="marketing-page teams-sales-page">
      <MarketingTracker />
      <ScrollReveal />
      <div className="marketing-grid" aria-hidden="true" />
      <div className="marketing-glow marketing-glow-one" aria-hidden="true" />
      <MarketingHeader authenticated={Boolean(user)} />

      <section className="teams-sales-hero">
        <div data-reveal="up">
          <span className="marketing-kicker"><Building2 size={14} /> ESCOLAS E EMPRESAS</span>
          <h1>Transforme estudo individual em capacidade coletiva.</h1>
          <p>
            Uma plataforma única para ensinar JavaScript, Python e C++ com aulas
            progressivas, prática orientada e acompanhamento de cada pessoa.
          </p>
          <div className="marketing-hero-actions">
            <Link
              className="marketing-primary marketing-cta"
              href={destination}
              data-marketing-event="cta_teams"
              data-marketing-label="teams-hero"
            >
              Começar com 10 membros <ArrowRight size={18} />
            </Link>
            <Link className="marketing-secondary" href="#como-funciona">
              Ver estrutura do plano
            </Link>
          </div>
          <div className="marketing-proof">
            <span><CheckCircle2 size={14} /> R$ 149/mês ou R$ 1.490/ano</span>
            <span><CheckCircle2 size={14} /> Cobrança pela Cakto</span>
            <span><CheckCircle2 size={14} /> Progresso salvo</span>
          </div>
        </div>
        <aside
          className="teams-dashboard-preview"
          aria-label="Resumo do plano Equipes"
          data-reveal="left"
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          <span>PAINEL DA ORGANIZAÇÃO</span>
          <strong>Uma visão clara de quem está evoluindo.</strong>
          <div><Users size={18} /><span><b>10</b> membros incluídos</span></div>
          <div><BookOpenCheck size={18} /><span><b>44</b> aulas disponíveis</span></div>
          <div><BarChart3 size={18} /><span><b>3</b> trilhas completas</span></div>
        </aside>
      </section>

      <section className="marketing-section" id="como-funciona">
        <div className="marketing-section-heading" data-reveal="up">
          <span className="marketing-kicker">OPERAÇÃO SIMPLES</span>
          <h2>Treinamento que o gestor consegue acompanhar.</h2>
          <p>Recursos existentes e verificáveis, sem promessas de relatórios que o produto ainda não entrega.</p>
        </div>
        <div className="teams-benefit-grid">
          {benefits.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              data-reveal="up"
              style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
            >
              <Icon size={23} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="teams-sales-process" data-reveal="up">
        <span className="marketing-kicker">EM TRÊS ETAPAS</span>
        <div>
          <article data-reveal="up"><b>01</b><strong>Assine</strong><p>Crie a conta responsável e conclua o checkout anual ou mensal.</p></article>
          <article data-reveal="up" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}><b>02</b><strong>Organize</strong><p>Crie a organização, convide participantes e monte suas turmas.</p></article>
          <article data-reveal="up" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}><b>03</b><strong>Acompanhe</strong><p>Use o painel para observar evolução e orientar o próximo ciclo.</p></article>
        </div>
      </section>

      <section className="marketing-final" data-reveal="up">
        <Building2 size={30} />
        <h2>Comece pequeno. Desenvolva capacidade que permanece.</h2>
        <p>Dez acessos, três linguagens e uma jornada técnica compartilhada.</p>
        <Link
          className="marketing-primary marketing-cta"
          href={destination}
          data-marketing-event="cta_teams"
          data-marketing-label="teams-final"
        >
          Escolher plano Equipes <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
