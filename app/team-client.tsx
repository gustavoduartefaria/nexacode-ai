"use client";

import {
  BookOpen,
  Building2,
  CheckCircle2,
  LoaderCircle,
  Mail,
  Plus,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type Organization = {
  id: string;
  name: string;
  slug: string;
  seatLimit: number;
  role: string;
  memberCount: number;
  classroomCount: number;
};

type Classroom = {
  id: string;
  name: string;
};

export default function TeamClient() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [classroomName, setClassroomName] = useState("");
  const organization = organizations[0];

  const load = () =>
    fetch("/api/organizations")
      .then(async (response) => {
        const result = (await response.json()) as {
          organizations?: Organization[];
          error?: string;
        };
        if (!response.ok) throw new Error(result.error ?? "Falha ao carregar equipe.");
        setOrganizations(result.organizations ?? []);
      })
      .catch((currentError: unknown) =>
        setError(currentError instanceof Error ? currentError.message : "Falha ao carregar."),
      )
      .finally(() => setLoading(false));

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (!organization?.id) return;
    void fetch(`/api/organizations/classrooms?organizationId=${encodeURIComponent(organization.id)}`)
      .then(async (response) => {
        const result = (await response.json()) as { classrooms?: Classroom[]; error?: string };
        if (!response.ok) throw new Error(result.error ?? "Falha ao carregar turmas.");
        setClassrooms(result.classrooms ?? []);
      })
      .catch((currentError: unknown) =>
        setError(currentError instanceof Error ? currentError.message : "Falha ao carregar turmas."),
      );
  }, [organization?.id]);

  const createOrganization = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/organizations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const result = (await response.json()) as { error?: string };
    if (!response.ok) setError(result.error ?? "Não foi possível criar.");
    else {
      setName("");
      setMessage("Organização criada.");
      await load();
    }
    setLoading(false);
  };

  const invite = async (event: FormEvent) => {
    event.preventDefault();
    if (!organization) return;
    setLoading(true);
    setError("");
    setMessage("");
    const response = await fetch("/api/organizations/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ organizationId: organization.id, email, role }),
    });
    const result = (await response.json()) as {
      error?: string;
      invitation?: { email: string; emailSent: boolean };
      previewUrl?: string;
    };
    if (!response.ok) setError(result.error ?? "Não foi possível convidar.");
    else {
      setEmail("");
      setMessage(
        result.invitation?.emailSent
          ? `Convite enviado para ${result.invitation.email}.`
          : result.previewUrl
            ? "Convite criado em modo local. O link de teste está disponível na resposta da API."
            : "Convite criado. O envio aguarda a configuração do e-mail transacional.",
      );
    }
    setLoading(false);
  };

  const createClassroom = async (event: FormEvent) => {
    event.preventDefault();
    if (!organization) return;
    setLoading(true);
    setError("");
    setMessage("");
    const response = await fetch("/api/organizations/classrooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ organizationId: organization.id, name: classroomName }),
    });
    const result = (await response.json()) as { classroom?: Classroom; error?: string };
    if (!response.ok || !result.classroom) {
      setError(result.error ?? "Não foi possível criar a turma.");
    } else {
      setClassrooms((current) => [...current, result.classroom!]);
      setClassroomName("");
      setMessage("Turma criada e pronta para receber alunos.");
      await load();
    }
    setLoading(false);
  };

  if (loading && !organization) {
    return <div className="product-loading"><LoaderCircle className="auth-spin" size={28} /> Carregando equipe...</div>;
  }

  return (
    <div className="team-dashboard">
      <section className="team-hero">
        <span className="marketing-kicker"><Building2 size={14} /> NEXACODE EQUIPES</span>
        <h1>{organization ? organization.name : "Crie seu ambiente de aprendizagem."}</h1>
        <p>{organization ? `Espaço protegido · ${organization.seatLimit} lugares · você é ${organization.role}` : "Organize alunos, professores e colaboradores em uma jornada compartilhada."}</p>
      </section>

      {!organization ? (
        <form className="team-create-card" onSubmit={createOrganization}>
          <span><Plus size={23} /></span>
          <h2>Nova organização</h2>
          <p>Seu plano inclui uma organização com até 10 membros.</p>
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nome da escola ou equipe" required minLength={2} maxLength={80} />
          <button className="marketing-primary" type="submit"><Building2 size={17} /> Criar organização</button>
        </form>
      ) : (
        <div className="team-content-grid">
          <form className="team-invite-card" onSubmit={invite}>
            <span className="account-icon"><UserPlus size={20} /></span>
            <small>CONVIDAR MEMBRO</small>
            <h2>Amplie o time.</h2>
            <label><span>E-mail</span><div><Mail size={17} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="aluno@escola.com" required /></div></label>
            <label><span>Papel</span><select value={role} onChange={(event) => setRole(event.target.value)}><option value="student">Aluno</option><option value="teacher">Professor</option><option value="admin">Administrador</option></select></label>
            <button className="marketing-primary" type="submit" disabled={loading}>{loading ? <LoaderCircle className="auth-spin" size={17} /> : <UserPlus size={17} />} Enviar convite</button>
          </form>
          <section className="team-metrics">
            <article><Users size={22} /><strong>{organization.memberCount}</strong><span>{organization.memberCount === 1 ? "membro ativo" : "membros ativos"}</span></article>
            <article><BookOpen size={22} /><strong>{organization.classroomCount}</strong><span>{organization.classroomCount === 1 ? "turma criada" : "turmas criadas"}</span></article>
            <article><CheckCircle2 size={22} /><strong>44</strong><span>aulas liberadas</span></article>
          </section>
          <section className="team-classrooms">
            <div>
              <span className="account-icon"><ShieldCheck size={20} /></span>
              <small>TURMAS</small>
              <h2>Organize a aprendizagem.</h2>
            </div>
            <form onSubmit={createClassroom}>
              <input value={classroomName} onChange={(event) => setClassroomName(event.target.value)} placeholder="Nome da nova turma" required minLength={2} maxLength={60} />
              <button className="marketing-primary" type="submit" disabled={loading}><Plus size={16} /> Criar turma</button>
            </form>
            <div className="team-classroom-list">
              {classrooms.length ? classrooms.map((classroom) => <article key={classroom.id}><BookOpen size={17} /><strong>{classroom.name}</strong><span>Relatório de progresso será consolidado por membros atribuídos.</span></article>) : <p>Nenhuma turma criada. Comece agrupando alunos por jornada.</p>}
            </div>
          </section>
        </div>
      )}
      {message && <div className="auth-message auth-success">{message}</div>}
      {error && <div className="auth-message auth-error">{error}</div>}
    </div>
  );
}
