"use client";

import { ArrowRight, CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TokenAction({
  token,
  action,
}: {
  token: string;
  action: "verify-email" | "accept-invitation";
}) {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error",
  );
  const [message, setMessage] = useState(
    token ? "Validando link seguro..." : "O link está incompleto.",
  );

  useEffect(() => {
    if (!token) return;
    const endpoint =
      action === "verify-email"
        ? "/api/auth/verify-email"
        : "/api/organizations/accept";
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (response) => {
        const result = (await response.json()) as { error?: string };
        if (!response.ok) throw new Error(result.error ?? "Link inválido.");
        setStatus("success");
        setMessage(
          action === "verify-email"
            ? "E-mail confirmado. Sua conta está protegida."
            : "Convite aceito. Você já faz parte da equipe.",
        );
      })
      .catch((error: unknown) => {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Não foi possível validar o link.");
      });
  }, [action, token]);

  return (
    <div className="token-action">
      {status === "loading" && <LoaderCircle className="auth-spin" size={34} />}
      {status === "success" && <CheckCircle2 size={38} />}
      {status === "error" && <XCircle size={38} />}
      <span className="marketing-kicker">
        {action === "verify-email" ? "CONFIRMAÇÃO DE CONTA" : "CONVITE DE EQUIPE"}
      </span>
      <h1>{status === "loading" ? "Só um instante." : status === "success" ? "Tudo certo." : "Não foi possível continuar."}</h1>
      <p>{message}</p>
      {status !== "loading" && (
        <Link className="marketing-primary" href={status === "success" ? "/app" : "/entrar"}>
          {status === "success" ? "Abrir meu workspace" : "Ir para o login"} <ArrowRight size={17} />
        </Link>
      )}
    </div>
  );
}
