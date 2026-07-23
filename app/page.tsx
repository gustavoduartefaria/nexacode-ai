import {
  ArrowRight,
  Bot,
  Braces,
  Building2,
  Check,
  Code2,
  Gauge,
  GraduationCap,
  Play,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MarketingHeader } from "@/app/marketing-header";
import MarketingTracker from "@/app/marketing-tracker";
import ScrollReveal from "@/app/scroll-reveal";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const languages = [
  {
    tag: "JS",
    name: "JavaScript",
    description: "Da lógica à web moderna, com projetos que rodam no navegador.",
    lessons: 24,
    color: "#f4df4b",
  },
  {
    tag: "PY",
    name: "Python",
    description: "Sintaxe clara, automação, dados e raciocínio algorítmico.",
    lessons: 10,
    color: "#5ab5ff",
  },
  {
    tag: "C++",
    name: "C++",
    description: "Memória, desempenho e fundamentos de engenharia de software.",
    lessons: 10,
    color: "#b58cff",
  },
];

export default async function Home() {
  const user = await getSessionUser();
  return (
    <main className="marketing-page">
      <MarketingTracker />
      <ScrollReveal />
      <div className="marketing-grid" aria-hidden="true" />
      <div className="marketing-glow marketing-glow-one" aria-hidden="true" />
      <div className="marketing-glow marketing-glow-two" aria-hidden="true" />
      <MarketingHeader authenticated={Boolean(user)} />

      <section className="marketing-hero">
        <div className="marketing-hero-copy" data-reveal="up">
          <span className="marketing-kicker">
            <i /> APRENDA · PRATIQUE · CONSTRUA
          </span>
          <h1>
            Programação deixa de ser teoria quando você <em>constrói de verdade.</em>
          </h1>
          <p>
            Uma plataforma inteligente para estudar JavaScript, Python e C++ com
            aulas progressivas, desafios, laboratório e um mentor que explica o
            raciocínio por trás do código.
          </p>
          <div className="marketing-hero-actions">
            <Link
              className="marketing-primary marketing-cta"
              href={user ? "/app" : "/cadastro"}
              data-marketing-event="cta_signup"
              data-marketing-label="hero-primary"
            >
              {user ? "Continuar aprendendo" : "Criar conta gratuita"} <ArrowRight size={18} />
            </Link>
            <Link
              className="marketing-secondary"
              href="#metodo"
              data-marketing-event="cta_pricing"
              data-marketing-label="hero-method"
            >
              <Play size={16} /> Ver como funciona
            </Link>
          </div>
          <div className="marketing-proof">
            <span><Check size={14} /> Comece grátis</span>
            <span><Check size={14} /> Progresso na nuvem</span>
            <span><Check size={14} /> Instale como app</span>
          </div>
        </div>

        <div
          className="hero-product"
          aria-label="Prévia da plataforma NexaCode AI"
          data-reveal="left"
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          <div className="hero-product-bar">
            <span><i /><i /><i /></span>
            <small>nexacode.ai / workspace</small>
            <ShieldCheck size={15} />
          </div>
          <div className="hero-product-body">
            <aside>
              <div className="hero-mini-brand"><Braces size={18} /></div>
              <span className="active"><Gauge size={16} /></span>
              <span><GraduationCap size={16} /></span>
              <span><Code2 size={16} /></span>
              <span><Bot size={16} /></span>
            </aside>
            <section>
              <div className="hero-product-heading">
                <div>
                  <small>JORNADA ATIVA</small>
                  <strong>JavaScript moderno</strong>
                </div>
                <span>72%</span>
              </div>
              <div className="hero-progress-preview"><i /></div>
              <div className="hero-code-preview">
                <div><span>1</span><code>const jornada = <b>await</b> aprender();</code></div>
                <div><span>2</span><code>jornada.<em>praticar</em>({"{ foco: true }"});</code></div>
                <div><span>3</span><code>console.<em>log</em>(jornada.progresso);</code></div>
              </div>
              <div className="hero-product-stats">
                <div><Zap size={17} /><span><strong>1.240</strong><small>XP TOTAL</small></span></div>
                <div><TerminalSquare size={17} /><span><strong>18</strong><small>MISSÕES</small></span></div>
                <div><Sparkles size={17} /><span><strong>12</strong><small>DIAS DE FOCO</small></span></div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="marketing-signal" data-reveal="up">
        <span>UMA EXPERIÊNCIA ÚNICA</span>
        <strong>44 aulas</strong><i />
        <strong>3 linguagens</strong><i />
        <strong>Mentor contextual</strong><i />
        <strong>Progresso sincronizado</strong>
      </section>

      <section className="mascot-intro" data-reveal="up">
        <div className="mascot-intro-visual" aria-hidden="true">
          <span className="mascot-orbit mascot-orbit-one" />
          <span className="mascot-orbit mascot-orbit-two" />
          <Image
            className="mascot-intro-image"
            src="/mascot/nexa-mascot.webp"
            alt=""
            width={640}
            height={640}
            sizes="(max-width: 720px) 82vw, 470px"
          />
          <span className="mascot-status"><i /> NEX ESTÁ ONLINE</span>
        </div>
        <div className="mascot-intro-copy">
          <span className="marketing-kicker"><Bot size={14} /> CONHEÇA O NEX</span>
          <h2>Um parceiro de código que comemora cada avanço.</h2>
          <p>
            O Nex é o mascote e mentor contextual da plataforma. Ele combina testes
            objetivos, pistas graduais e um modelo de linguagem quando a IA remota
            está disponível, sem deixar de funcionar no modo local.
          </p>
          <div className="mascot-points">
            <span><Sparkles size={16} /> Incentivo sem pressão</span>
            <span><Code2 size={16} /> Próximo passo mais claro</span>
            <span><ShieldCheck size={16} /> Origem de cada resposta identificada</span>
          </div>
          <Link
            className="marketing-secondary"
            href={user ? "/app" : "/cadastro"}
            data-marketing-event="cta_signup"
            data-marketing-label="mascot-intro"
          >
            {user ? "Continuar com o Nex" : "Começar com o Nex"} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="marketing-section" id="metodo">
        <div className="marketing-section-heading" data-reveal="up">
          <span className="marketing-kicker">MÉTODO NEXA</span>
          <h2>Aprendizado guiado por ciclos curtos e resultados visíveis.</h2>
          <p>Cada conceito passa por explicação, prática, verificação e aplicação.</p>
        </div>
        <div className="method-grid">
          <article data-reveal="up">
            <span>01</span><GraduationCap size={25} />
            <h3>Entenda</h3>
            <p>Explicações diretas, analogias e código comentado para formar uma base sólida.</p>
          </article>
          <article data-reveal="up" style={{ "--reveal-delay": "70ms" } as React.CSSProperties}>
            <span>02</span><TerminalSquare size={25} />
            <h3>Experimente</h3>
            <p>Laboratório com execução isolada, saída real e limites seguros no navegador.</p>
          </article>
          <article data-reveal="up" style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
            <span>03</span><Bot size={25} />
            <h3>Receba orientação</h3>
            <p>O mentor contextual dá pistas graduais, revisa decisões e sugere o próximo passo.</p>
          </article>
          <article data-reveal="up" style={{ "--reveal-delay": "210ms" } as React.CSSProperties}>
            <span>04</span><Gauge size={25} />
            <h3>Meça a evolução</h3>
            <p>Progresso, sequência, XP e metas sincronizados em todos os dispositivos.</p>
          </article>
        </div>
      </section>

      <section className="marketing-section language-marketing" id="trilhas">
        <div className="marketing-section-heading" data-reveal="up">
          <span className="marketing-kicker">TRILHAS DE ENGENHARIA</span>
          <h2>Três linguagens. Uma única jornada profissional.</h2>
        </div>
        <div className="marketing-language-grid">
          {languages.map((language, index) => (
            <article
              key={language.name}
              data-reveal="up"
              style={{
                "--track-color": language.color,
                "--reveal-delay": `${index * 80}ms`,
              } as React.CSSProperties}
            >
              <span>{language.tag}</span>
              <small>TRILHA 0{index + 1}</small>
              <h3>{language.name}</h3>
              <p>{language.description}</p>
              <div><strong>{language.lessons}</strong><span>aulas práticas</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section marketing-outcomes">
        <div className="marketing-section-heading" data-reveal="up">
          <span className="marketing-kicker">PARA QUEM QUER AVANÇAR</span>
          <h2>Uma rota clara entre “estou começando” e “consigo construir”.</h2>
          <p>Escolha seu objetivo e use a plataforma para manter prática, contexto e progresso no mesmo lugar.</p>
        </div>
        <div className="outcome-grid">
          <article data-reveal="up"><span>01</span><h3>Primeiro emprego</h3><p>Fortaleça lógica, leitura de código e projetos que demonstram fundamentos.</p></article>
          <article data-reveal="up" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}><span>02</span><h3>Mudança de carreira</h3><p>Estude em ciclos curtos e acompanhe o avanço sem depender de uma trilha improvisada.</p></article>
          <article data-reveal="up" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}><span>03</span><h3>Faculdade e prática</h3><p>Transforme conceitos abstratos em exemplos, desafios e checkpoints verificáveis.</p></article>
        </div>
        <Link
          className="marketing-secondary outcome-pricing-link"
          href="/precos"
          data-marketing-event="cta_pricing"
          data-marketing-label="outcomes-pricing"
        >
          Comparar os planos <ArrowRight size={16} />
        </Link>
      </section>

      <section className="teams-callout" data-reveal="up">
        <div>
          <span className="marketing-kicker">NEXACODE PARA EQUIPES</span>
          <h2>Transforme aprendizagem em capacidade coletiva.</h2>
          <p>
            Convide alunos, professores e colaboradores. Organize papéis, acompanhe
            a evolução e mantenha todas as pessoas na mesma trilha.
          </p>
          <Link
            className="marketing-secondary"
            href="/para-equipes"
            data-marketing-event="cta_teams"
            data-marketing-label="home-teams"
          >
            Conhecer plano Equipes <ArrowRight size={16} />
          </Link>
        </div>
        <div className="teams-visual">
          <Building2 size={28} />
          <span><Users size={19} /> 10 membros incluídos</span>
          <span><Gauge size={19} /> Relatórios de evolução</span>
          <span><ShieldCheck size={19} /> Papéis e acesso protegido</span>
        </div>
      </section>

      <section className="marketing-section marketing-faq">
        <div className="marketing-section-heading" data-reveal="up">
          <span className="marketing-kicker">DÚVIDAS ANTES DE COMEÇAR</span>
          <h2>O essencial, sem letras pequenas.</h2>
        </div>
        <div className="faq-grid">
          <details data-reveal="up"><summary>Preciso saber programar?</summary><p>Não. A trilha começa pelos fundamentos e aumenta a dificuldade progressivamente.</p></details>
          <details data-reveal="up" style={{ "--reveal-delay": "50ms" } as React.CSSProperties}><summary>O plano gratuito pede cartão?</summary><p>Não. Você pode criar a conta Starter e começar sem cartão.</p></details>
          <details data-reveal="up" style={{ "--reveal-delay": "100ms" } as React.CSSProperties}><summary>O Nex sempre utiliza uma IA remota?</summary><p>Não. Quando disponível e permitido pelo plano, o Nex usa um modelo de linguagem com o código e o contexto necessários da aula. Se a API falhar ou o limite remoto for atingido, ele continua ajudando no modo local. A interface identifica qual modo respondeu.</p></details>
          <details data-reveal="up" style={{ "--reveal-delay": "150ms" } as React.CSSProperties}><summary>Como o acesso pago é liberado?</summary><p>Após a aprovação na Cakto, o webhook autenticado atualiza o plano da conta.</p></details>
          <details data-reveal="up" style={{ "--reveal-delay": "200ms" } as React.CSSProperties}><summary>Funciona no celular?</summary><p>Sim. A interface é responsiva e também pode ser instalada como aplicativo PWA.</p></details>
          <details data-reveal="up" style={{ "--reveal-delay": "250ms" } as React.CSSProperties}><summary>Posso cancelar?</summary><p>O gerenciamento ocorre pelo portal do provedor de cobrança configurado para a conta.</p></details>
        </div>
      </section>

      <section className="marketing-final" data-reveal="up">
        <Sparkles size={30} />
        <h2>Seu próximo projeto começa com uma aula.</h2>
        <p>Entre gratuitamente e transforme curiosidade em código que funciona.</p>
        <Link
          className="marketing-primary marketing-cta"
          href={user ? "/app" : "/cadastro"}
          data-marketing-event="cta_signup"
          data-marketing-label="home-final"
        >
          {user ? "Abrir meu workspace" : "Começar agora"} <ArrowRight size={18} />
        </Link>
      </section>

      <footer className="marketing-footer">
        <div className="marketing-brand">
          <Braces size={20} />
          <span><strong>NexaCode</strong><i>AI</i></span>
        </div>
        <span>© 2026 NexaCode AI</span>
        <nav><Link href="/termos">Termos</Link><Link href="/privacidade">Privacidade</Link><Link href="/precos">Planos</Link></nav>
      </footer>
    </main>
  );
}
