"use client";

import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  BookOpen,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Cloud,
  Code2,
  GraduationCap,
  LockKeyhole,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { NexaMark } from "@/app/nexa-brand";

type AccountMode = "authenticated" | "device";

type ProfileData = {
  displayName: string;
  username: string;
  learningGoal: string;
  experienceLevel: string;
  weeklyGoal: number;
};

type Props = {
  mode: AccountMode;
  verifiedEmail: string;
  signInPath: string;
  initialProfile: ProfileData | null;
};

const goalOptions = [
  {
    id: "first-job",
    label: "Primeiro emprego",
    description: "Preparar portfólio e entrevistas",
    icon: Rocket,
  },
  {
    id: "career-change",
    label: "Mudar de carreira",
    description: "Construir uma nova base profissional",
    icon: Target,
  },
  {
    id: "college",
    label: "Faculdade",
    description: "Apoiar estudos e projetos acadêmicos",
    icon: GraduationCap,
  },
  {
    id: "freelance",
    label: "Trabalhar como freelancer",
    description: "Criar soluções para clientes",
    icon: Zap,
  },
  {
    id: "own-projects",
    label: "Projetos próprios",
    description: "Tirar ideias do papel",
    icon: Code2,
  },
  {
    id: "improve-skills",
    label: "Aprimorar conhecimentos",
    description: "Evoluir técnica e boas práticas",
    icon: BrainCircuit,
  },
];

const experienceOptions = [
  { id: "beginner", label: "Começando agora", detail: "Nunca programei" },
  { id: "basic", label: "Tenho uma base", detail: "Já vi lógica ou HTML/CSS" },
  { id: "intermediate", label: "Intermediário", detail: "Já construí pequenos projetos" },
  { id: "advanced", label: "Avançado", detail: "Quero aprofundar arquitetura" },
];

const initialData: ProfileData = {
  displayName: "",
  username: "",
  learningGoal: "",
  experienceLevel: "",
  weeklyGoal: 3,
};

function saveLocalDisplayProfile(profile: ProfileData, email: string) {
  window.localStorage.setItem(
    "nexacode-account-cache-v1",
    JSON.stringify({ ...profile, email, updatedAt: new Date().toISOString() }),
  );

  try {
    const progressKey = "nexacode-ai-progress-v1";
    const current = JSON.parse(window.localStorage.getItem(progressKey) ?? "{}") as Record<
      string,
      unknown
    >;
    window.localStorage.setItem(
      progressKey,
      JSON.stringify({ ...current, name: profile.displayName }),
    );
  } catch {
    // The account cache remains valid even if an old progress entry is malformed.
  }
}

export default function CadastroClient({
  mode,
  verifiedEmail,
  signInPath,
  initialProfile,
}: Props) {
  const [step, setStep] = useState(initialProfile ? 2 : 0);
  const [data, setData] = useState<ProfileData>(initialProfile ?? initialData);
  const [deviceEmail, setDeviceEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(Boolean(initialProfile));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const email = mode === "authenticated" ? verifiedEmail : deviceEmail.trim();
  const isEditing = Boolean(initialProfile);
  const progress = success ? 100 : ((step + 1) / 3) * 100;

  const selectedGoal = useMemo(
    () => goalOptions.find((option) => option.id === data.learningGoal),
    [data.learningGoal],
  );

  const update = <Key extends keyof ProfileData>(key: Key, value: ProfileData[Key]) => {
    setData((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const validateStep = () => {
    if (step === 0) {
      if (data.displayName.trim().length < 2) {
        setError("Informe seu nome com pelo menos 2 caracteres.");
        return false;
      }
      if (!/^[a-z0-9][a-z0-9._-]{2,23}$/.test(data.username.trim().toLowerCase())) {
        setError(
          "Crie um usuário de 3 a 24 caracteres, usando letras, números, ponto, traço ou underline.",
        );
        return false;
      }
      if (mode === "device" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deviceEmail.trim())) {
        setError("Informe um e-mail válido para identificar o perfil deste dispositivo.");
        return false;
      }
    }
    if (step === 1 && (!data.learningGoal || !data.experienceLevel)) {
      setError("Escolha seu objetivo e seu nível de experiência.");
      return false;
    }
    if (step === 2 && !acceptedTerms) {
      setError("Aceite os termos e a política de privacidade para continuar.");
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((current) => Math.min(2, current + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    if (!validateStep()) return;
    setSaving(true);
    setError("");

    try {
      const normalized = {
        ...data,
        displayName: data.displayName.trim(),
        username: data.username.trim().toLowerCase(),
      };

      if (mode === "authenticated") {
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...normalized, acceptedTerms }),
        });
        const result = (await response.json()) as { error?: string };
        if (!response.ok) {
          throw new Error(result.error ?? "Não foi possível criar sua conta.");
        }
      } else {
        window.localStorage.setItem(
          "nexacode-device-profile-v1",
          JSON.stringify({
            ...normalized,
            email: deviceEmail.trim().toLowerCase(),
            acceptedTermsAt: new Date().toISOString(),
          }),
        );
      }

      saveLocalDisplayProfile(normalized, email.toLowerCase());
      setData(normalized);
      setSuccess(true);
    } catch (currentError) {
      setError(
        currentError instanceof Error
          ? currentError.message
          : "Não foi possível concluir o cadastro.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (success) {
    return (
      <main className="signup-page signup-success-page">
        <div className="signup-ambient" aria-hidden="true" />
        <section className="signup-success">
          <div className="success-orbit">
            <CheckCircle2 size={42} />
            <i />
            <i />
          </div>
          <span className="signup-kicker">CONTA CONFIGURADA</span>
          <h1>Seu próximo nível começa agora.</h1>
          <p>
            Olá, {data.displayName}. Sua jornada foi personalizada para o objetivo{" "}
            <strong>{selectedGoal?.label.toLowerCase()}</strong>.
          </p>
          <div className="success-stats">
            <div>
              <strong>{data.weeklyGoal}x</strong>
              <span>por semana</span>
            </div>
            <div>
              <strong>44</strong>
              <span>aulas em 3 trilhas</span>
            </div>
            <div>
              <strong>6</strong>
              <span>desafios práticos</span>
            </div>
          </div>
          <Link className="signup-primary" href="/">
            Entrar no NexaCode <ArrowRight size={18} />
          </Link>
          {mode === "device" && (
            <div className="device-mode-note compact">
              <ShieldCheck size={17} />
              <span>
                Perfil salvo somente neste dispositivo. Entre na versão online para
                sincronizar uma conta.
              </span>
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="signup-page">
      <div className="signup-ambient" aria-hidden="true" />
      <aside className="signup-story">
        <Link className="signup-logo" href="/">
          <NexaMark compact />
          <div>
            <strong>NexaCode</strong>
            <small>MULTILANGUAGE INTELLIGENCE LAB</small>
          </div>
        </Link>
        <div className="story-copy">
          <span className="signup-kicker">
            <Sparkles size={15} /> EXPERIÊNCIA PERSONALIZADA
          </span>
          <h1>
            Uma conta.
            <span>Toda sua evolução.</span>
          </h1>
          <p>
            Configure sua jornada para receber a trilha certa, acompanhar o progresso
            e estudar no ritmo que realmente cabe na sua rotina.
          </p>
          <div className="story-features">
            <div>
              <span>
                <BookOpen size={18} />
              </span>
              <div>
                <strong>Trilha adaptada</strong>
                <p>Conteúdo organizado pelo seu momento e objetivo.</p>
              </div>
            </div>
            <div>
              <span>
                <Cloud size={18} />
              </span>
              <div>
                <strong>Perfil persistente</strong>
                <p>Na versão online, seu cadastro fica salvo com segurança.</p>
              </div>
            </div>
            <div>
              <span>
                <LockKeyhole size={18} />
              </span>
              <div>
                <strong>Sem senha armazenada pelo app</strong>
                <p>Sua identidade online é verificada pela hospedagem.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="story-code" aria-hidden="true">
          <span>const</span> futuro = <span>await</span> aprender({"{ "}
          <br />
          &nbsp;&nbsp;prática: <b>true</b>,
          <br />
          &nbsp;&nbsp;constância: <b>true</b>
          <br />
          {"}"});
        </div>
      </aside>

      <section className="signup-workspace">
        <div className="signup-topbar">
          <Link href="/">
            <ArrowLeft size={16} /> Voltar ao aplicativo
          </Link>
          <span>
            {isEditing ? "Atualizar conta" : "Criar conta"} · Etapa {step + 1} de 3
          </span>
        </div>

        <div className="signup-progress" aria-label={`${Math.round(progress)}% concluído`}>
          <i style={{ width: `${progress}%` }} />
        </div>

        <div className="signup-card">
          {mode === "device" && (
            <div className="device-mode-note">
              <ShieldCheck size={18} />
              <div>
                <strong>Modo deste dispositivo</strong>
                <span>
                  Este perfil ficará somente neste computador. Para sincronizar online,{" "}
                  <a href={signInPath}>entre com uma identidade verificada</a>.
                </span>
              </div>
            </div>
          )}

          {step === 0 && (
            <div className="signup-step">
              <div className="step-icon">
                <CircleUserRound size={25} />
              </div>
              <span className="signup-kicker">ETAPA 01 · IDENTIDADE</span>
              <h2>Como devemos chamar você?</h2>
              <p>Essas informações aparecem no seu perfil e na área de progresso.</p>

              <label className="signup-field">
                <span>Nome completo</span>
                <div>
                  <UserRound size={17} />
                  <input
                    autoFocus
                    value={data.displayName}
                    onChange={(event) => update("displayName", event.target.value)}
                    placeholder="Ex.: Marina Oliveira"
                    maxLength={60}
                    autoComplete="name"
                  />
                </div>
              </label>

              <label className="signup-field">
                <span>Nome de usuário</span>
                <div>
                  <AtSign size={17} />
                  <input
                    value={data.username}
                    onChange={(event) =>
                      update(
                        "username",
                        event.target.value.toLowerCase().replace(/\s/g, ""),
                      )
                    }
                    placeholder="marina.dev"
                    maxLength={24}
                    autoComplete="username"
                  />
                </div>
                <small>3 a 24 caracteres: letras, números, ponto, traço ou underline.</small>
              </label>

              <label className="signup-field">
                <span>E-mail {mode === "authenticated" && "verificado"}</span>
                <div className={mode === "authenticated" ? "verified-field" : ""}>
                  <AtSign size={17} />
                  <input
                    value={email}
                    onChange={(event) => setDeviceEmail(event.target.value)}
                    placeholder="voce@email.com"
                    readOnly={mode === "authenticated"}
                    autoComplete="email"
                    type="email"
                  />
                  {mode === "authenticated" && <Check size={16} />}
                </div>
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="signup-step">
              <div className="step-icon violet">
                <Target size={25} />
              </div>
              <span className="signup-kicker">ETAPA 02 · OBJETIVO</span>
              <h2>Para onde você quer ir?</h2>
              <p>Vamos usar sua resposta para organizar recomendações e metas.</p>

              <fieldset className="goal-fieldset">
                <legend>Objetivo principal</legend>
                <div className="goal-options">
                  {goalOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        type="button"
                        key={option.id}
                        className={data.learningGoal === option.id ? "selected" : ""}
                        onClick={() => update("learningGoal", option.id)}
                      >
                        <span>
                          <Icon size={18} />
                        </span>
                        <div>
                          <strong>{option.label}</strong>
                          <small>{option.description}</small>
                        </div>
                        <i>{data.learningGoal === option.id && <Check size={13} />}</i>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="experience-fieldset">
                <legend>Seu nível atual</legend>
                <div>
                  {experienceOptions.map((option) => (
                    <button
                      type="button"
                      key={option.id}
                      className={data.experienceLevel === option.id ? "selected" : ""}
                      onClick={() => update("experienceLevel", option.id)}
                    >
                      <span />
                      <strong>{option.label}</strong>
                      <small>{option.detail}</small>
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {step === 2 && (
            <div className="signup-step">
              <div className="step-icon blue">
                <BrainCircuit size={25} />
              </div>
              <span className="signup-kicker">ETAPA 03 · ROTINA</span>
              <h2>Crie uma meta sustentável.</h2>
              <p>Consistência vence intensidade. Escolha uma frequência que você consegue manter.</p>

              <div className="weekly-goal">
                <div>
                  <span>Dias de estudo por semana</span>
                  <strong>{data.weeklyGoal}x</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={data.weeklyGoal}
                  onChange={(event) => update("weeklyGoal", Number(event.target.value))}
                  aria-label="Dias de estudo por semana"
                />
                <div className="range-labels">
                  <span>1 dia</span>
                  <span>7 dias</span>
                </div>
              </div>

              <div className="account-summary">
                <div>
                  <span>
                    <UserRound size={17} />
                  </span>
                  <div>
                    <small>PERFIL</small>
                    <strong>@{data.username}</strong>
                  </div>
                </div>
                <div>
                  <span>
                    <Target size={17} />
                  </span>
                  <div>
                    <small>OBJETIVO</small>
                    <strong>{selectedGoal?.label ?? "Não informado"}</strong>
                  </div>
                </div>
                <div>
                  <span>
                    <Zap size={17} />
                  </span>
                  <div>
                    <small>RITMO</small>
                    <strong>{data.weeklyGoal} dias por semana</strong>
                  </div>
                </div>
              </div>

              <label className="terms-check">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => {
                    setAcceptedTerms(event.target.checked);
                    setError("");
                  }}
                />
                <span>
                  <Check size={13} />
                </span>
                <p>
                  Li e aceito os <Link href="/termos">Termos de Uso</Link> e a{" "}
                  <Link href="/privacidade">Política de Privacidade</Link>.
                </p>
              </label>
            </div>
          )}

          {error && <div className="signup-error">{error}</div>}

          <div className="signup-actions">
            {step > 0 ? (
              <button
                type="button"
                className="signup-secondary"
                onClick={() => {
                  setStep((current) => current - 1);
                  setError("");
                }}
              >
                <ArrowLeft size={16} /> Voltar
              </button>
            ) : (
              <span />
            )}
            {step < 2 ? (
              <button type="button" className="signup-primary" onClick={next}>
                Continuar <ArrowRight size={17} />
              </button>
            ) : (
              <button
                type="button"
                className="signup-primary"
                onClick={submit}
                disabled={saving}
              >
                {saving
                  ? "Salvando..."
                  : isEditing
                    ? "Atualizar conta"
                    : "Criar minha conta"}
                {!saving && <ChevronRight size={17} />}
              </button>
            )}
          </div>

          <div className="signup-security">
            <LockKeyhole size={14} />
            <span>
              O NexaCode não recebe nem armazena a senha da sua identidade online.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
