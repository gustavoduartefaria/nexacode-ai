import type { Metadata } from "next";
import { ArrowLeft, Scale, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { NexaMark } from "@/app/nexa-brand";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Termos de uso da plataforma NexaCode AI.",
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="legal-glow" aria-hidden="true" />
      <article>
        <Link className="legal-logo" href="/">
          <NexaMark compact /><span>NEXACODE</span><i>AI</i>
        </Link>
        <span className="signup-kicker"><Scale size={15} /> TERMOS DE USO</span>
        <h1>Aprender com liberdade também exige responsabilidade.</h1>
        <p className="legal-updated">Atualizado em 22 de julho de 2026.</p>
        <section><h2>1. Finalidade</h2><p>O NexaCode AI é uma plataforma educacional para estudar e praticar JavaScript, Python e C++. O conteúdo apoia o aprendizado, mas não substitui orientação profissional ou formação acadêmica.</p></section>
        <section><h2>2. Conta e segurança</h2><p>Você é responsável pelas informações fornecidas e por manter a senha protegida. A aplicação armazena apenas uma derivação criptográfica da senha e pode encerrar sessões diante de risco, abuso ou violação destes termos.</p></section>
        <section><h2>3. Planos e assinaturas</h2><p>Recursos disponíveis dependem do plano ativo. Preços, periodicidade e renovação são exibidos antes do checkout processado pela Cakto. Aprovação, renovação, cancelamento, reembolso e chargeback podem atualizar automaticamente o acesso contratado.</p></section>
        <section><h2>4. Inteligência artificial</h2><p>O mentor atual usa um motor didático local ao produto, identificado na interface. Integrações remotas futuras serão informadas claramente e poderão possuir limites conforme o plano.</p></section>
        <section><h2>5. Uso responsável</h2><p>Não use a plataforma para acessar dados de terceiros, distribuir código malicioso, contornar permissões, comprometer a infraestrutura ou violar direitos autorais.</p></section>
        <section><h2>6. Disponibilidade</h2><p>Trilhas e recursos podem evoluir. Procuramos manter continuidade e qualidade, sem garantir funcionamento ininterrupto em todo dispositivo, provedor externo ou conexão.</p></section>
        <section><h2>7. Aceitação</h2><p>Ao criar uma conta, você confirma que leu estes termos e concorda em utilizar o serviço conforme estas condições.</p></section>
        <div className="signup-security"><ShieldCheck size={19} /><span>Termos claros, permissões verificadas e integrações identificadas.</span></div>
        <Link className="legal-back" href="/cadastro"><ArrowLeft size={16} /> Voltar ao cadastro</Link>
      </article>
    </main>
  );
}
