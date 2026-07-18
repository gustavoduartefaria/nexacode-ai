import type { Metadata } from "next";
import { ArrowLeft, Code2, Database, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacidade | NexaCode AI",
  description: "Como o NexaCode AI trata seus dados e preferências.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-glow" aria-hidden="true" />
      <article>
        <Link className="legal-logo" href="/">
          <Code2 size={24} />
          <span>NEXACODE</span>
          <i>AI</i>
        </Link>
        <span className="signup-kicker">
          <Database size={15} /> PRIVACIDADE
        </span>
        <h1>Seus dados servem à sua aprendizagem — e só.</h1>
        <p className="legal-updated">Atualizado em 18 de julho de 2026.</p>

        <section>
          <h2>1. Dados utilizados</h2>
          <p>
            No modo online usamos o e-mail verificado pela hospedagem, nome,
            nome de usuário, objetivo de aprendizagem, nível de experiência e
            meta semanal. O NexaCode não recebe nem armazena sua senha.
          </p>
        </section>
        <section>
          <h2>2. Por que usamos esses dados</h2>
          <p>
            As informações personalizam o perfil, organizam metas e tornam a
            experiência de estudo mais relevante. Não usamos esses dados para
            publicidade comportamental.
          </p>
        </section>
        <section>
          <h2>3. Onde ficam armazenados</h2>
          <p>
            No site online, o perfil é salvo no banco da aplicação. No pacote
            local, perfil e progresso ficam somente no armazenamento do seu
            navegador e não são sincronizados com outros aparelhos.
          </p>
        </section>
        <section>
          <h2>4. Compartilhamento</h2>
          <p>
            Não vendemos seus dados. A infraestrutura de hospedagem processa o
            mínimo necessário para autenticar o acesso e executar o aplicativo.
          </p>
        </section>
        <section>
          <h2>5. Seu controle</h2>
          <p>
            Você pode editar o perfil a qualquer momento. No modo local, pode
            apagar as informações removendo os dados do site no navegador.
          </p>
        </section>

        <div className="signup-security">
          <ShieldCheck size={19} />
          <span>Coletamos apenas o necessário para personalizar sua jornada.</span>
        </div>
        <Link className="legal-back" href="/cadastro">
          <ArrowLeft size={16} /> Voltar ao cadastro
        </Link>
      </article>
    </main>
  );
}
