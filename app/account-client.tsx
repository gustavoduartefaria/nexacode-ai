"use client";

import {
  ArrowRight,
  Award,
  CheckCircle2,
  Cloud,
  Download,
  LoaderCircle,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

type Profile = {
  displayName: string;
  username: string;
  learningGoal: string;
  experienceLevel: string;
  weeklyGoal: number;
  avatarPreset: string;
  themePreference: string;
  aiEnabled: boolean;
};

export default function AccountClient({
  profile,
  planName,
  email,
  emailVerified,
  billingConfigured,
  billingProvider,
  emailConfigured,
  certificates,
}: {
  profile: Profile;
  planName: string;
  email: string;
  emailVerified: boolean;
  billingConfigured: boolean;
  billingProvider: "cakto" | "stripe";
  emailConfigured: boolean;
  certificates: Array<{
    language: string;
    verificationCode: string;
    issuedAt: string;
  }>;
}) {
  const [data, setData] = useState(profile);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Não foi possível salvar.");
      if (data.themePreference === "system") {
        window.localStorage.removeItem("nexacode-theme");
        document.documentElement.dataset.theme = window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
      } else {
        window.localStorage.setItem("nexacode-theme", data.themePreference);
        document.documentElement.dataset.theme = data.themePreference;
      }
      setMessage("Perfil atualizado e sincronizado.");
    } catch (currentError) {
      setError(currentError instanceof Error ? currentError.message : "Não foi possível salvar.");
    } finally {
      setSaving(false);
    }
  };

  const openPortal = async () => {
    setError("");
    const response = await fetch("/api/billing/portal", { method: "POST" });
    const result = (await response.json()) as { url?: string; error?: string };
    if (!response.ok || !result.url) {
      setError(result.error ?? "Portal de assinatura indisponível.");
      return;
    }
    window.location.href = result.url;
  };

  const exportData = async () => {
    const response = await fetch("/api/account");
    if (!response.ok) {
      setError("Não foi possível exportar seus dados.");
      return;
    }
    const blob = new Blob([JSON.stringify(await response.json(), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "nexacode-meus-dados.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const deleteAccount = async () => {
    setDeleting(true);
    setError("");
    try {
      const response = await fetch("/api/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: deletePassword,
          confirmation: deleteConfirmation,
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Não foi possível excluir.");
      window.location.href = "/";
    } catch (currentError) {
      setError(currentError instanceof Error ? currentError.message : "Não foi possível excluir.");
      setDeleting(false);
    }
  };

  return (
    <div className="account-grid">
      <section className="account-main-card">
        <span className="marketing-kicker">PERFIL DE APRENDIZAGEM</span>
        <h1>Seu workspace, do seu jeito.</h1>
        <p>Esses dados personalizam metas, recomendações e relatórios.</p>
        <form className="account-form" onSubmit={save}>
          <label><span>Nome</span><input value={data.displayName} onChange={(event) => setData({ ...data, displayName: event.target.value })} required minLength={2} /></label>
          <label><span>Nome de usuário</span><input value={data.username} onChange={(event) => setData({ ...data, username: event.target.value.toLowerCase() })} required minLength={3} maxLength={24} /></label>
          <label><span>Objetivo</span><select value={data.learningGoal} onChange={(event) => setData({ ...data, learningGoal: event.target.value })}><option value="first-job">Primeiro emprego</option><option value="career-change">Mudar de carreira</option><option value="college">Faculdade</option><option value="freelance">Freelance</option><option value="own-projects">Projetos próprios</option><option value="improve-skills">Aprimorar conhecimentos</option></select></label>
          <label><span>Experiência</span><select value={data.experienceLevel} onChange={(event) => setData({ ...data, experienceLevel: event.target.value })}><option value="beginner">Começando agora</option><option value="basic">Tenho uma base</option><option value="intermediate">Intermediário</option><option value="advanced">Avançado</option></select></label>
          <label><span>Avatar</span><select value={data.avatarPreset} onChange={(event) => setData({ ...data, avatarPreset: event.target.value })}><option value="orbit">Órbita</option><option value="terminal">Terminal</option><option value="pixel">Pixel</option><option value="nebula">Nebulosa</option></select></label>
          <label><span>Tema preferido</span><select value={data.themePreference} onChange={(event) => setData({ ...data, themePreference: event.target.value })}><option value="system">Seguir o dispositivo</option><option value="dark">Escuro</option><option value="light">Claro</option></select></label>
          <label className="account-goal"><span>Meta semanal: <strong>{data.weeklyGoal} dias</strong></span><input type="range" min={1} max={7} value={data.weeklyGoal} onChange={(event) => setData({ ...data, weeklyGoal: Number(event.target.value) })} /></label>
          <label className="account-toggle"><input type="checkbox" checked={data.aiEnabled} onChange={(event) => setData({ ...data, aiEnabled: event.target.checked })} /><span><strong>Mentor contextual ativo</strong><small>Desative para impedir novas respostas e registros de uso do mentor.</small></span></label>
          {message && <div className="auth-message auth-success">{message}</div>}
          {error && <div className="auth-message auth-error">{error}</div>}
          <button className="marketing-primary" type="submit" disabled={saving}>{saving ? <LoaderCircle className="auth-spin" size={17} /> : <CheckCircle2 size={17} />}{saving ? "Salvando..." : "Salvar alterações"}</button>
        </form>
      </section>

      <aside className="account-side">
        <article>
          <span className="account-icon"><ShieldCheck size={20} /></span>
          <small>IDENTIDADE</small>
          <h2>{emailVerified ? "E-mail confirmado" : "Confirmação pendente"}</h2>
          <p>{email}</p>
          <span className={emailVerified ? "integration-ok" : "integration-warn"}>{emailVerified ? "Conta verificada" : emailConfigured ? "Verifique sua caixa de entrada" : "Envio de e-mail requer configuração"}</span>
        </article>
        <article>
          <span className="account-icon"><Cloud size={20} /></span>
          <small>PLANO ATUAL</small>
          <h2>{planName}</h2>
          <p>Progresso sincronizado e recursos controlados no servidor.</p>
          {planName === "Starter" ? <Link className="account-link" href="/precos">Comparar planos <ArrowRight size={15} /></Link> : <button className="account-link" type="button" onClick={openPortal} disabled={!billingConfigured}>Gerenciar na {billingProvider === "cakto" ? "Cakto" : "Stripe"} <ArrowRight size={15} /></button>}
        </article>
        <article>
          <span className="account-icon"><Download size={20} /></span>
          <small>LGPD</small>
          <h2>Seus dados, seu controle</h2>
          <p>Baixe uma cópia estruturada das informações associadas à sua conta.</p>
          <button className="account-link" type="button" onClick={exportData}>Exportar dados <Download size={15} /></button>
        </article>
        <article>
          <span className="account-icon"><Award size={20} /></span>
          <small>CERTIFICADOS</small>
          <h2>{certificates.length ? `${certificates.length} emitido${certificates.length > 1 ? "s" : ""}` : "Conclua uma trilha"}</h2>
          <p>{certificates.length ? "Cada certificado possui um código público de verificação." : "Certificados são emitidos nos planos Pro e Equipes após concluir uma linguagem."}</p>
          {certificates.map((certificate) => (
            <Link className="account-link" href={`/certificado/${certificate.verificationCode}`} key={certificate.verificationCode}>
              Ver {certificate.language === "cpp" ? "C++" : certificate.language} <ArrowRight size={15} />
            </Link>
          ))}
        </article>
      </aside>

      <section className="account-danger">
        <div><Trash2 size={20} /><span><strong>Excluir conta</strong><small>Esta ação remove perfil, progresso e dados educacionais.</small></span></div>
        <div className="account-delete-fields">
          <input type="password" value={deletePassword} onChange={(event) => setDeletePassword(event.target.value)} placeholder="Sua senha" />
          <input value={deleteConfirmation} onChange={(event) => setDeleteConfirmation(event.target.value)} placeholder="Digite EXCLUIR" />
          <button type="button" onClick={deleteAccount} disabled={deleting}>{deleting ? <LoaderCircle className="auth-spin" size={16} /> : <Trash2 size={16} />}{deleting ? "Excluindo..." : "Excluir definitivamente"}</button>
        </div>
      </section>
    </div>
  );
}
