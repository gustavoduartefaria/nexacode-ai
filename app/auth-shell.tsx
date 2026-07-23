import { Braces, CheckCircle2, Code2, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { NexaMark } from "@/app/nexa-brand";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="saas-auth-page">
      <div className="marketing-grid" aria-hidden="true" />
      <section className="auth-story">
        <Link className="marketing-brand" href="/">
          <NexaMark compact />
          <span><strong>NexaCode</strong><i>AI</i></span>
        </Link>
        <div>
          <span className="marketing-kicker"><Sparkles size={14} /> ENGENHARIA COMEÇA AQUI</span>
          <h2>Construa sua base.<br />Depois, construa o futuro.</h2>
          <p>Uma jornada que transforma cada conceito em uma habilidade verificável.</p>
        </div>
        <ul>
          <li><CheckCircle2 size={17} /><span><strong>44 aulas práticas</strong> em três linguagens</span></li>
          <li><Code2 size={17} /><span><strong>Laboratório real</strong> com execução segura</span></li>
          <li><ShieldCheck size={17} /><span><strong>Progresso protegido</strong> e sincronizado</span></li>
        </ul>
        <div className="auth-story-code"><Braces size={19} /><code>while (curiosity) {"{ build(); }"}</code></div>
      </section>
      <section className="auth-workspace">{children}</section>
    </main>
  );
}
