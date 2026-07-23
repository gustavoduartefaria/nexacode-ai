"use client";

import {
  ArrowRight,
  AtSign,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

type Mode = "register" | "login" | "request-reset" | "reset-password";

const copy = {
  register: {
    eyebrow: "CRIE SEU WORKSPACE",
    title: "Comece sua jornada de engenharia.",
    description: "Uma conta segura para sincronizar progresso, metas e conquistas.",
    button: "Criar conta gratuita",
  },
  login: {
    eyebrow: "BEM-VINDO DE VOLTA",
    title: "Continue exatamente de onde parou.",
    description: "Entre no seu workspace e retome a próxima missão.",
    button: "Entrar no NexaCode",
  },
  "request-reset": {
    eyebrow: "RECUPERAR ACESSO",
    title: "Vamos colocar você de volta na trilha.",
    description: "Informe o e-mail da conta para receber um link seguro.",
    button: "Enviar instruções",
  },
  "reset-password": {
    eyebrow: "NOVA SENHA",
    title: "Proteja sua próxima sessão.",
    description: "Crie uma senha forte. Todas as sessões anteriores serão encerradas.",
    button: "Salvar nova senha",
  },
};

export default function AuthForm({
  mode,
  token = "",
  desiredPlan,
  desiredCycle = "annual",
}: {
  mode: Mode;
  token?: string;
  desiredPlan?: "pro" | "teams";
  desiredCycle?: "monthly" | "annual";
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const activeCopy = copy[mode];

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const endpoint =
      mode === "register"
        ? "/api/auth/register"
        : mode === "login"
          ? "/api/auth/login"
          : mode === "request-reset"
            ? "/api/auth/request-reset"
            : "/api/auth/reset-password";
    const body =
      mode === "register"
        ? { name, email, password, acceptedTerms }
        : mode === "login"
          ? { email, password }
          : mode === "request-reset"
            ? { email }
            : { token, password };
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = (await response.json()) as {
        error?: string;
        message?: string;
        redirectTo?: string;
        emailSent?: boolean;
        previewUrl?: string;
        verificationPreviewUrl?: string;
      };
      if (!response.ok) throw new Error(result.error ?? "Não foi possível concluir.");

      if (mode === "request-reset") {
        setMessage(
          result.emailSent
            ? "Confira sua caixa de entrada e também a pasta de spam."
            : result.previewUrl
              ? "Modo local: o link de teste foi gerado abaixo."
              : result.message ?? "Se a conta existir, enviaremos as instruções.",
        );
        if (result.previewUrl) window.location.href = result.previewUrl;
        return;
      }
      if (mode === "reset-password") {
        setMessage("Senha alterada. Redirecionando para o login...");
        window.setTimeout(() => {
          window.location.href = "/entrar";
        }, 900);
        return;
      }
      if (mode === "register" && !result.emailSent) {
        window.sessionStorage.setItem(
          "nexacode-email-notice",
          "O e-mail transacional ainda não está configurado. A conta funciona, mas a confirmação ficará pendente.",
        );
      }
      window.location.href =
        mode === "register" && desiredPlan
          ? `/precos?cycle=${desiredCycle}&intent=${desiredPlan}`
          : result.redirectTo ?? "/app";
    } catch (currentError) {
      setError(
        currentError instanceof Error ? currentError.message : "Não foi possível concluir.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="saas-auth-form" onSubmit={submit}>
      <span className="marketing-kicker">{activeCopy.eyebrow}</span>
      <h1>{activeCopy.title}</h1>
      <p>{activeCopy.description}</p>

      {mode === "register" && (
        <label>
          <span>Nome</span>
          <div><UserRound size={18} /><input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Como podemos chamar você?" required minLength={2} maxLength={60} /></div>
        </label>
      )}
      {mode !== "reset-password" && (
        <label>
          <span>E-mail</span>
          <div><AtSign size={18} /><input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@exemplo.com" required /></div>
        </label>
      )}
      {mode !== "request-reset" && (
        <label>
          <span>Senha</span>
          <div>
            <LockKeyhole size={18} />
            <input type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={mode === "login" ? "Sua senha" : "Mínimo de 10 caracteres"} required minLength={mode === "login" ? 1 : 10} maxLength={128} />
            <button type="button" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"} onClick={() => setShowPassword((current) => !current)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
          </div>
        </label>
      )}

      {mode === "login" && <Link className="auth-forgot" href="/recuperar-senha">Esqueci minha senha</Link>}
      {mode === "register" && (
        <label className="auth-consent">
          <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} required />
          <span><i>{acceptedTerms && <Check size={13} />}</i>Li e aceito os <Link href="/termos">Termos de Uso</Link> e a <Link href="/privacidade">Política de Privacidade</Link>.</span>
        </label>
      )}

      {error && <div className="auth-message auth-error">{error}</div>}
      {message && <div className="auth-message auth-success">{message}</div>}

      <button className="marketing-primary auth-submit" type="submit" disabled={loading}>
        {loading ? <LoaderCircle className="auth-spin" size={18} /> : mode === "reset-password" ? <KeyRound size={18} /> : <ShieldCheck size={18} />}
        {loading ? "Processando..." : activeCopy.button}
        {!loading && <ArrowRight size={17} />}
      </button>

      <div className="auth-switch">
        {mode === "register" && <>Já tem uma conta? <Link href="/entrar">Entrar</Link></>}
        {mode === "login" && <>Ainda não tem conta? <Link href="/cadastro">Começar grátis</Link></>}
        {(mode === "request-reset" || mode === "reset-password") && <Link href="/entrar">Voltar para o login</Link>}
      </div>
    </form>
  );
}
