"use client";

import {
  Activity,
  CreditCard,
  Gauge,
  LoaderCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

type Overview = {
  metrics: {
    users: number;
    activeSubscriptions: number;
    canceledSubscriptions: number;
    revenueCents: number;
    aiRequests: number;
    unresolvedErrors: number;
    usersWithProgress: number;
    totalXp: number;
    completionRate: number;
  };
  users: Array<{
    id: string;
    email: string;
    status: string;
    role: string;
    planId: string;
    displayName: string | null;
    createdAt: string;
  }>;
  recentAudit: Array<{
    id: string;
    action: string;
    targetType: string;
    createdAt: string;
  }>;
  popularLessons: Array<{ lessonId: string; completions: number }>;
};

export default function AdminClient() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [error, setError] = useState("");
  const [busyUser, setBusyUser] = useState("");

  const load = () =>
    fetch("/api/admin/overview")
      .then(async (response) => {
        const result = (await response.json()) as Overview & { error?: string };
        if (!response.ok) throw new Error(result.error ?? "Falha ao carregar administração.");
        setOverview(result);
      })
      .catch((currentError: unknown) =>
        setError(currentError instanceof Error ? currentError.message : "Falha ao carregar."),
      );

  useEffect(() => {
    void load();
  }, []);

  const toggleUser = async (userId: string, currentStatus: string) => {
    setBusyUser(userId);
    setError("");
    const response = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        status: currentStatus === "active" ? "suspended" : "active",
      }),
    });
    const result = (await response.json()) as { error?: string };
    if (!response.ok) setError(result.error ?? "Não foi possível atualizar o usuário.");
    else await load();
    setBusyUser("");
  };

  if (!overview) {
    return <div className="product-loading">{error || <><LoaderCircle className="auth-spin" size={28} /> Carregando indicadores...</>}</div>;
  }
  const metrics = [
    { label: "Usuários", value: overview.metrics.users, icon: Users },
    { label: "Assinaturas ativas", value: overview.metrics.activeSubscriptions, icon: CreditCard },
    { label: "Receita registrada", value: `R$ ${(overview.metrics.revenueCents / 100).toFixed(2)}`, icon: Gauge },
    { label: "Interações com mentor", value: overview.metrics.aiRequests, icon: Sparkles },
    { label: "Taxa de conclusão", value: `${overview.metrics.completionRate}%`, icon: Activity },
    { label: "Cancelamentos", value: overview.metrics.canceledSubscriptions, icon: CreditCard },
    { label: "Erros pendentes", value: overview.metrics.unresolvedErrors, icon: ShieldCheck },
  ];
  return (
    <div className="admin-dashboard">
      <section className="admin-heading">
        <span className="marketing-kicker"><ShieldCheck size={14} /> CENTRO DE OPERAÇÕES</span>
        <h1>Visão do produto em tempo real.</h1>
        <p>Indicadores persistidos, controle de acesso e histórico operacional.</p>
      </section>
      <section className="admin-metrics">
        {metrics.map(({ label, value, icon: Icon }) => <article key={label}><Icon size={21} /><span>{label}</span><strong>{value}</strong></article>)}
      </section>
      <section className="admin-table-card">
        <div><span><Activity size={18} /> USUÁRIOS RECENTES</span><small>{overview.metrics.usersWithProgress} com progresso · {overview.metrics.totalXp} XP acumulado</small></div>
        <div className="admin-table-wrap">
          <table>
            <thead><tr><th>Usuário</th><th>Plano</th><th>Papel</th><th>Status</th><th>Ação</th></tr></thead>
            <tbody>{overview.users.map((user) => <tr key={user.id}><td><strong>{user.displayName ?? "Sem perfil"}</strong><small>{user.email}</small></td><td><span className="table-plan">{user.planId}</span></td><td>{user.role}</td><td><span className={`table-status ${user.status}`}>{user.status}</span></td><td><button type="button" onClick={() => toggleUser(user.id, user.status)} disabled={busyUser === user.id}>{busyUser === user.id ? "Salvando..." : user.status === "active" ? "Suspender" : "Reativar"}</button></td></tr>)}</tbody>
          </table>
        </div>
      </section>
      <section className="admin-insights">
        <article>
          <span><Activity size={17} /> AULAS MAIS CONCLUÍDAS</span>
          {overview.popularLessons.length ? overview.popularLessons.map((lesson) => <div key={lesson.lessonId}><strong>{lesson.lessonId}</strong><small>{lesson.completions} conclusões</small></div>) : <p>Os dados aparecerão quando as primeiras aulas forem concluídas.</p>}
        </article>
        <article>
          <span><ShieldCheck size={17} /> AUDITORIA RECENTE</span>
          {overview.recentAudit.length ? overview.recentAudit.map((event) => <div key={event.id}><strong>{event.action}</strong><small>{event.targetType} · {new Date(event.createdAt).toLocaleString("pt-BR")}</small></div>) : <p>Nenhuma ação administrativa registrada.</p>}
        </article>
      </section>
      {error && <div className="auth-message auth-error">{error}</div>}
    </div>
  );
}
