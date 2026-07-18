import type { Metadata } from "next";
import { ArrowLeft, Code2, Scale, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Termos de uso da plataforma educacional NexaCode AI.",
};

export default function TermsPage() {
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
          <Scale size={15} /> TERMOS DE USO
        </span>
        <h1>Aprender com liberdade também exige responsabilidade.</h1>
        <p className="legal-updated">Atualizado em 18 de julho de 2026.</p>

        <section>
          <h2>1. Finalidade</h2>
          <p>
            O NexaCode AI é uma plataforma educacional para estudo e prática de
            JavaScript. O conteúdo apoia seu aprendizado, mas não substitui
            orientação profissional ou formação acadêmica.
          </p>
        </section>
        <section>
          <h2>2. Conta e perfil</h2>
          <p>
            No aplicativo online, sua identidade é verificada pela plataforma de
            hospedagem. O NexaCode não recebe nem armazena sua senha. Você é
            responsável por manter o acesso à sua conta protegido.
          </p>
        </section>
        <section>
          <h2>3. Uso responsável</h2>
          <p>
            Não use a plataforma para prejudicar pessoas, tentar acessar dados de
            terceiros, distribuir código malicioso ou violar direitos autorais.
            Exemplos e desafios devem ser usados para fins legítimos de estudo.
          </p>
        </section>
        <section>
          <h2>4. Conteúdo e disponibilidade</h2>
          <p>
            A trilha pode evoluir, receber correções e ganhar novos recursos.
            Procuramos manter a experiência disponível e correta, sem garantir
            funcionamento ininterrupto em todo dispositivo ou conexão.
          </p>
        </section>
        <section>
          <h2>5. Aceitação</h2>
          <p>
            Ao criar seu perfil, você confirma que leu estes termos e concorda
            em utilizar a plataforma conforme estas condições.
          </p>
        </section>

        <div className="signup-security">
          <ShieldCheck size={19} />
          <span>Termos claros, linguagem direta e nenhuma senha armazenada.</span>
        </div>
        <Link className="legal-back" href="/cadastro">
          <ArrowLeft size={16} /> Voltar ao cadastro
        </Link>
      </article>
    </main>
  );
}
