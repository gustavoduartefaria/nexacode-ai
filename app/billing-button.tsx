"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BillingButton({
  planId,
  authenticated,
  cycle,
}: {
  planId: "free" | "pro" | "teams";
  authenticated: boolean;
  cycle: "monthly" | "annual";
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  if (planId === "free") {
    return (
      <Link className="pricing-button" href={authenticated ? "/app" : "/cadastro"}>
        {authenticated ? "Abrir plataforma" : "Começar grátis"} <ArrowRight size={16} />
      </Link>
    );
  }
  const checkout = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, cycle }),
      });
      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error ?? "Checkout indisponível.");
      window.location.href = result.url;
    } catch (currentError) {
      setError(currentError instanceof Error ? currentError.message : "Checkout indisponível.");
    } finally {
      setLoading(false);
    }
  };
  if (!authenticated) {
    return (
      <Link
        className="pricing-button"
        href={`/cadastro?plan=${planId}&cycle=${cycle}`}
        data-marketing-event="cta_checkout"
        data-marketing-label={`${planId}-${cycle}`}
      >
        Criar conta para assinar <ArrowRight size={16} />
      </Link>
    );
  }
  return (
    <>
      <button
        className="pricing-button"
        type="button"
        onClick={checkout}
        disabled={loading}
        data-marketing-event="cta_checkout"
        data-marketing-label={`${planId}-${cycle}`}
      >
        {loading ? <LoaderCircle className="auth-spin" size={17} /> : null}
        {loading ? "Abrindo checkout..." : `Escolher ${planId === "pro" ? "Pro" : "Equipes"}`}
        {!loading && <ArrowRight size={16} />}
      </button>
      {error && <small className="pricing-error">{error}</small>}
    </>
  );
}
