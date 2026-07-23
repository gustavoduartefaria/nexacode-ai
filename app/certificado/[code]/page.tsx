import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getDb } from "@/db";
import { certificates, studentProfiles, users } from "@/db/schema";
import { NexaMark } from "@/app/nexa-brand";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Verificar certificado" };

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const [certificate] = await getDb()
    .select({
      code: certificates.verificationCode,
      language: certificates.language,
      issuedAt: certificates.issuedAt,
      displayName: studentProfiles.displayName,
    })
    .from(certificates)
    .innerJoin(users, eq(users.id, certificates.userId))
    .leftJoin(studentProfiles, eq(studentProfiles.email, users.email))
    .where(eq(certificates.verificationCode, code))
    .limit(1);

  const language =
    certificate?.language === "cpp"
      ? "C++"
      : certificate?.language === "python"
        ? "Python"
        : "JavaScript";

  return (
    <main className="certificate-page">
      <Link className="marketing-brand" href="/" aria-label="NexaCode AI">
        <NexaMark compact />
        <span><strong>NexaCode</strong><i>AI</i></span>
      </Link>
      <section className="certificate-card">
        <span className="certificate-seal"><Award size={31} /></span>
        {certificate ? (
          <>
            <span className="marketing-kicker"><CheckCircle2 size={14} /> CERTIFICADO AUTÊNTICO</span>
            <h1>Trilha de {language} concluída.</h1>
            <p>Certificamos que <strong>{certificate.displayName ?? "Estudante NexaCode"}</strong> concluiu todos os checkpoints desta trilha.</p>
            <dl>
              <div><dt>Código</dt><dd>{certificate.code}</dd></div>
              <div><dt>Emissão</dt><dd>{certificate.issuedAt.toLocaleDateString("pt-BR")}</dd></div>
            </dl>
          </>
        ) : (
          <>
            <span className="marketing-kicker">VERIFICAÇÃO</span>
            <h1>Certificado não encontrado.</h1>
            <p>Confira se o código foi copiado por completo.</p>
          </>
        )}
        <Link className="marketing-primary" href="/">Conhecer o NexaCode AI</Link>
      </section>
    </main>
  );
}
