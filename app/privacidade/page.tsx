import type { Metadata } from "next";
import { ArrowLeft, Database, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { NexaMark } from "@/app/nexa-brand";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Política de privacidade e direitos LGPD no NexaCode AI.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-glow" aria-hidden="true" />
      <article>
        <Link className="legal-logo" href="/">
          <NexaMark compact /><span>NEXACODE</span><i>AI</i>
        </Link>
        <span className="signup-kicker"><Database size={15} /> PRIVACIDADE E LGPD</span>
        <h1>Seus dados servem à sua aprendizagem — e só.</h1>
        <p className="legal-updated">Atualizado em 22 de julho de 2026.</p>
        <section><h2>1. Dados utilizados</h2><p>Tratamos identificação da conta, perfil, preferências, progresso, uso do mentor, organizações, sessões, registros de segurança e dados mínimos de assinatura. Senhas são derivadas criptograficamente e nunca armazenadas em texto puro.</p></section>
        <section><h2>2. Finalidade</h2><p>Os dados autenticam o acesso, sincronizam a jornada, aplicam permissões, evitam abuso, entregam recursos contratados e ajudam a manter a plataforma segura.</p></section>
        <section><h2>3. Prestadores</h2><p>A Vercel entrega o frontend, o Railway executa o backend e o Supabase hospeda o PostgreSQL. A Cakto processa pagamentos e o Resend entrega e-mails transacionais. Quando o operador ativa o mentor remoto, perguntas, contexto da aula e o código enviado são processados pela OpenAI sem solicitação de armazenamento da resposta. Cada prestador recebe somente os dados necessários à sua função.</p></section>
        <section><h2>4. Compartilhamento</h2><p>Não vendemos seus dados e não usamos informações educacionais para publicidade comportamental. Podemos preservar registros financeiros pelo período legal aplicável, com identificação minimizada.</p></section>
        <section><h2>5. Seus direitos</h2><p>Na página Minha conta, você pode corrigir o perfil, exportar uma cópia estruturada e solicitar exclusão. Assinaturas ativas precisam ser canceladas antes da remoção definitiva para evitar cobranças órfãs.</p></section>
        <section><h2>6. Segurança e retenção</h2><p>Usamos sessões HTTP-only, limitação de tentativas, verificação de origem, auditoria, separação por usuário e HTTPS em produção. O histórico interno do mentor guarda apenas trechos limitados para controle do produto. Dados são mantidos enquanto a conta estiver ativa ou pelo prazo necessário ao cumprimento legal.</p></section>
        <section><h2>7. Contato</h2><p>O canal do responsável pelo tratamento deve ser configurado pelo operador antes da abertura comercial do serviço.</p></section>
        <div className="signup-security"><ShieldCheck size={19} /><span>Coleta mínima, controle do usuário e nenhum dado privado no cache offline.</span></div>
        <Link className="legal-back" href="/cadastro"><ArrowLeft size={16} /> Voltar ao cadastro</Link>
      </article>
    </main>
  );
}
