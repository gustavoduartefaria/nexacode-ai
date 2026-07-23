"use client";

import {
  Activity,
  BookOpen,
  Bot,
  BrainCircuit,
  Check,
  ChevronRight,
  CirclePlay,
  Code2,
  Command,
  Download,
  Flame,
  Gauge,
  GraduationCap,
  Home,
  Lightbulb,
  LockKeyhole,
  Menu,
  Play,
  RotateCcw,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Terminal,
  Trophy,
  UserPlus,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { NexaMark } from "@/app/nexa-brand";
import ThemeToggle from "@/app/theme-toggle";
import {
  allLessons,
  challenges,
  languages,
  lessonsByLanguage,
  modulesByLanguage,
  totalMinutesByLanguage,
  type LanguageId,
  type Lesson,
} from "@/lib/course-data";
import {
  buildMentorAnswer,
  calculateLearningScore,
  inspectCode,
  type MentorAnswer,
} from "@/lib/mentor";
import { accessibleLessonIds, type PlanId } from "@/lib/saas";

type View = "home" | "learn" | "lab" | "mentor" | "progress";

type ProgressState = {
  name: string;
  completedLessons: string[];
  completedChallenges: string[];
  xp: number;
  streak: number;
  lastVisit: string;
  activeLanguage: LanguageId;
  studyMinutes: number;
};

type WorkspaceUser = {
  id: string;
  email: string;
  displayName: string;
  role: "student" | "admin";
  status: string;
  planId: PlanId;
  emailVerified: boolean;
  avatarPreset: "orbit" | "terminal" | "pixel" | "nebula";
  themePreference: "system" | "dark" | "light";
};

type ChatMessage = {
  id: string;
  role: "mentor" | "student";
  text: string;
  answer?: MentorAnswer;
  engine?: string;
  disclosure?: string;
};

type AppNotification = {
  id: string;
  title: string;
  message: string;
  kind: string;
  readAt: string | null;
  createdAt: string;
};

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const STORAGE_KEY = "nexacode-ai-progress-v1";
const LEGACY_MIGRATION_OWNER_KEY = "nexacode-ai-legacy-owner-v3";
const todayKey = () => new Date().toISOString().slice(0, 10);

const initialProgress: ProgressState = {
  name: "Explorador",
  completedLessons: [],
  completedChallenges: [],
  xp: 0,
  streak: 1,
  lastVisit: todayKey(),
  activeLanguage: "javascript",
  studyMinutes: 0,
};

const navItems: Array<{
  id: View;
  label: string;
  shortLabel: string;
  icon: typeof Home;
}> = [
  { id: "home", label: "Visão geral", shortLabel: "Início", icon: Home },
  { id: "learn", label: "Trilhas de código", shortLabel: "Trilhas", icon: BookOpen },
  { id: "lab", label: "Code Lab", shortLabel: "Laboratório", icon: Code2 },
  { id: "mentor", label: "Mentor IA", shortLabel: "Mentor", icon: Bot },
  { id: "progress", label: "Meu progresso", shortLabel: "Progresso", icon: Trophy },
];

const quickQuestions = [
  "Explique esta aula de forma simples",
  "Analise o erro no meu código",
  "Me dê um exemplo prático",
  "Crie um desafio sem entregar a resposta",
];

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return hours ? `${hours}h ${remaining}min` : `${minutes}min`;
}

function Logo() {
  return (
    <div className="brand">
      <NexaMark />
      <div>
        <strong>
          NexaCode <i>AI</i>
        </strong>
        <span>multilanguage intelligence lab</span>
      </div>
    </div>
  );
}

function ProgressRing({
  value,
  size = "large",
}: {
  value: number;
  size?: "large" | "small";
}) {
  return (
    <div
      className={classNames("progress-ring", size === "small" && "progress-ring-small")}
      style={{ "--progress": `${Math.max(2, value) * 3.6}deg` } as React.CSSProperties}
      aria-label={`${value}% concluído`}
    >
      <div>
        <strong>{value}%</strong>
        {size === "large" && <span>da jornada</span>}
      </div>
    </div>
  );
}

function DifficultyBadge({ value }: { value: Lesson["difficulty"] }) {
  return (
    <span className={`difficulty difficulty-${value.toLowerCase().replace("á", "a")}`}>
      {value}
    </span>
  );
}

function LanguageSwitcher({
  active,
  onChange,
  compact = false,
}: {
  active: LanguageId;
  onChange: (language: LanguageId) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={classNames("language-switcher", compact && "language-switcher-compact")}
      aria-label="Escolher linguagem"
    >
      {languages.map((language) => (
        <button
          key={language.id}
          type="button"
          className={active === language.id ? "active" : ""}
          onClick={() => onChange(language.id)}
          aria-pressed={active === language.id}
          style={
            {
              "--language-accent": language.accent,
              "--language-soft": language.accentSoft,
            } as React.CSSProperties
          }
        >
          <span>{language.shortName}</span>
          {!compact && (
            <div>
              <strong>{language.name}</strong>
              <small>{language.tagline}</small>
            </div>
          )}
          <i />
        </button>
      ))}
    </div>
  );
}

export default function NexaCodeApp({
  user,
  cloudProgress,
}: {
  user: WorkspaceUser;
  cloudProgress: ProgressState | null;
}) {
  const accountStorageKey = `${STORAGE_KEY}:${user.id}`;
  const [view, setView] = useState<View>("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [progress, setProgress] = useState<ProgressState>(initialProgress);
  const [hydrated, setHydrated] = useState(false);
  const [lessonId, setLessonId] = useState("variaveis");
  const [lessonOpen, setLessonOpen] = useState(false);
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [challengeId, setChallengeId] = useState(challenges[0].id);
  const currentChallenge = useMemo(
    () => challenges.find((challenge) => challenge.id === challengeId) ?? challenges[0],
    [challengeId],
  );
  const [code, setCode] = useState(currentChallenge.starter);
  const [consoleLines, setConsoleLines] = useState<string[]>([
    "Nexa runtime pronto. Execute seu código para ver a saída.",
  ]);
  const [running, setRunning] = useState(false);
  const [challengeResult, setChallengeResult] = useState<
    "idle" | "passed" | "failed"
  >("idle");
  const [showHint, setShowHint] = useState(false);
  const [mentorInput, setMentorInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "mentor",
      text: "Olá! Eu sou o NEX, seu mentor didático. Posso explicar conceitos, analisar seu código e criar pistas graduais. A ideia é fazer você pensar — não apenas copiar.",
    },
  ]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [profileEditing, setProfileEditing] = useState(false);
  const [draftName, setDraftName] = useState(progress.name);
  const [resetOpen, setResetOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const runToken = useRef(0);
  const messageToken = useRef(1);

  const activeLanguage =
    languages.find((language) => language.id === progress.activeLanguage) ?? languages[0];
  const activeModules = modulesByLanguage[activeLanguage.id];
  const activeLessons = lessonsByLanguage[activeLanguage.id];
  const currentLesson =
    allLessons.find((current) => current.id === lessonId) ?? activeLessons[0];
  const currentLanguage =
    languages.find((language) => language.id === currentLesson.language) ??
    activeLanguage;
  const nextLesson =
    activeLessons.find((current) => !progress.completedLessons.includes(current.id)) ??
    activeLessons[activeLessons.length - 1];
  const activeCompletedLessons = activeLessons.filter((lessonItem) =>
    progress.completedLessons.includes(lessonItem.id),
  ).length;
  const completion = Math.round(
    (activeCompletedLessons / activeLessons.length) * 100,
  );
  const globalCompletion = Math.round(
    (progress.completedLessons.length / allLessons.length) * 100,
  );
  const learningScore = calculateLearningScore(
    progress.completedLessons.length,
    progress.completedChallenges.length,
    progress.streak,
  );
  const allowedLessonIds = useMemo(
    () =>
      new Set(
        accessibleLessonIds(
          user.planId,
          allLessons.map((lesson) => lesson.id),
        ),
      ),
    [user.planId],
  );

  useEffect(() => {
    const accountSaved = window.localStorage.getItem(accountStorageKey);
    const migrationOwner = window.localStorage.getItem(LEGACY_MIGRATION_OWNER_KEY);
    const saved =
      accountSaved ??
      (!migrationOwner ? window.localStorage.getItem(STORAGE_KEY) : null);
    if (!accountSaved && saved && !migrationOwner) {
      window.localStorage.setItem(LEGACY_MIGRATION_OWNER_KEY, user.id);
    }
    let restoredProgress: ProgressState | null = null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ProgressState;
        const currentDate = new Date();
        const lastDate = new Date(`${parsed.lastVisit}T12:00:00`);
        const difference = Math.round(
          (currentDate.setHours(12, 0, 0, 0) - lastDate.getTime()) / 86_400_000,
        );
        restoredProgress = {
          ...initialProgress,
          ...parsed,
          streak:
            difference === 1
              ? parsed.streak + 1
              : difference > 1
                ? 1
                : parsed.streak,
          lastVisit: todayKey(),
        };
      } catch {
        window.localStorage.removeItem(accountStorageKey);
      }
    }
    const hydrationTimer = window.setTimeout(() => {
      const mergedProgress: ProgressState = {
        ...initialProgress,
        ...(restoredProgress ?? {}),
        ...(cloudProgress ?? {}),
        name: cloudProgress?.name || user.displayName,
        completedLessons: [
          ...new Set([
            ...(restoredProgress?.completedLessons ?? []),
            ...(cloudProgress?.completedLessons ?? []),
          ]),
        ].filter((id) => allowedLessonIds.has(id)),
        completedChallenges: [
          ...new Set([
            ...(restoredProgress?.completedChallenges ?? []),
            ...(cloudProgress?.completedChallenges ?? []),
          ]),
        ],
        xp: Math.max(restoredProgress?.xp ?? 0, cloudProgress?.xp ?? 0),
        streak: Math.max(restoredProgress?.streak ?? 1, cloudProgress?.streak ?? 1),
        lastVisit: todayKey(),
      };
      setProgress(mergedProgress);
      setDraftName(mergedProgress.name);
      setHydrated(true);
    }, 0);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }

    const handleInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handleInstall);
    return () => {
      window.clearTimeout(hydrationTimer);
      window.removeEventListener("beforeinstallprompt", handleInstall);
    };
  }, [accountStorageKey, allowedLessonIds, cloudProgress, user.displayName, user.id]);

  useEffect(() => {
    fetch("/api/notifications")
      .then(async (response) => {
        if (!response.ok) return;
        const result = (await response.json()) as { notifications?: AppNotification[] };
        setNotifications(result.notifications ?? []);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(accountStorageKey, JSON.stringify(progress));
      const syncTimer = window.setTimeout(() => {
        fetch("/api/progress", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(progress),
        }).catch(() => undefined);
      }, 500);
      return () => window.clearTimeout(syncTimer);
    }
  }, [accountStorageKey, hydrated, progress]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const navigate = (next: View) => {
    setView(next);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openCodeLab = () => {
    if (activeLanguage.id !== "javascript") {
      setToast(
        `O runtime do navegador executa JavaScript; as missões de ${activeLanguage.name} continuam guiadas nas aulas.`,
      );
    }
    navigate("lab");
  };

  const selectLanguage = (language: LanguageId) => {
    const firstLesson = lessonsByLanguage[language][0];
    setProgress((current) => ({ ...current, activeLanguage: language }));
    if (firstLesson) setLessonId(firstLesson.id);
    setToast(`${languages.find((item) => item.id === language)?.name} selecionado`);
  };

  const openLesson = (id: string) => {
    if (!allowedLessonIds.has(id)) {
      setToast("Esta aula faz parte dos planos Pro e Equipes.");
      return;
    }
    const selectedLesson = allLessons.find((item) => item.id === id);
    if (selectedLesson) {
      setProgress((current) => ({
        ...current,
        activeLanguage: selectedLesson.language,
      }));
    }
    setLessonId(id);
    setQuizChoice(null);
    setQuizChecked(false);
    setLessonOpen(true);
  };

  const completeLesson = () => {
    if (!progress.completedLessons.includes(currentLesson.id)) {
      setProgress((current) => ({
        ...current,
        completedLessons: [...current.completedLessons, currentLesson.id],
        xp: current.xp + 60,
      }));
      setToast("+60 XP · Aula concluída");
    } else {
      setToast("Esta aula já está concluída");
    }
  };

  const chooseChallenge = (id: string) => {
    const selected = challenges.find((challenge) => challenge.id === id);
    if (!selected) return;
    setChallengeId(id);
    setCode(selected.starter);
    setConsoleLines(["Novo desafio carregado. Leia a missão antes de programar."]);
    setChallengeResult("idle");
    setShowHint(false);
  };

  const runCode = async () => {
    const token = ++runToken.current;
    setRunning(true);
    setChallengeResult("idle");
    setConsoleLines(["▶ Executando em ambiente isolado..."]);

    const workerSource = `
      const format = (value) => {
        if (typeof value === "string") return value;
        if (typeof value === "undefined") return "undefined";
        try { return JSON.stringify(value); } catch { return String(value); }
      };
      console.log = (...args) => postMessage({ type: "log", value: args.map(format).join(" ") });
      console.warn = (...args) => postMessage({ type: "warn", value: args.map(format).join(" ") });
      console.error = (...args) => postMessage({ type: "error", value: args.map(format).join(" ") });
      onmessage = (event) => {
        try {
          const result = new Function(event.data)();
          if (result && typeof result.then === "function") {
            result.then(() => postMessage({ type: "done" })).catch((error) =>
              postMessage({ type: "error", value: error.message })
            );
          } else {
            postMessage({ type: "done" });
          }
        } catch (error) {
          postMessage({ type: "error", value: error.name + ": " + error.message });
          postMessage({ type: "done" });
        }
      };
    `;
    const blob = new Blob([workerSource], { type: "text/javascript" });
    const objectUrl = URL.createObjectURL(blob);
    const worker = new Worker(objectUrl);
    const lines: string[] = [];
    let completed = false;

    const finish = () => {
      if (completed) return;
      completed = true;
      worker.terminate();
      URL.revokeObjectURL(objectUrl);
      if (runToken.current !== token) return;
      const finalLines = lines.length ? lines : ["✓ Código executado sem saída no console."];
      setConsoleLines(finalLines);
      const validationOutput = finalLines
        .map((line) => line.replace(/^[›⚠✕]\s*/, ""))
        .join("\n");
      const passed = currentChallenge.validate(validationOutput, code);
      setChallengeResult(passed ? "passed" : "failed");
      setRunning(false);
      if (passed && !progress.completedChallenges.includes(currentChallenge.id)) {
        setProgress((current) => ({
          ...current,
          completedChallenges: [...current.completedChallenges, currentChallenge.id],
          xp: current.xp + currentChallenge.xp,
        }));
        setToast(`Desafio concluído · +${currentChallenge.xp} XP`);
      }
    };

    const timeout = window.setTimeout(() => {
      lines.push("⏱ Execução interrompida após 3 segundos. Verifique loops infinitos.");
      finish();
    }, 3000);

    worker.onmessage = (event: MessageEvent<{ type: string; value?: string }>) => {
      if (event.data.type === "log") lines.push(`› ${event.data.value}`);
      if (event.data.type === "warn") lines.push(`⚠ ${event.data.value}`);
      if (event.data.type === "error") lines.push(`✕ ${event.data.value}`);
      if (event.data.type === "done") {
        window.clearTimeout(timeout);
        finish();
      }
    };
    worker.onerror = (event) => {
      lines.push(`✕ ${event.message}`);
      window.clearTimeout(timeout);
      finish();
    };
    worker.postMessage(code);
  };

  const askMentor = async (question = mentorInput) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;
    const stamp = messageToken.current++;
    setMessages((current) => [
      ...current,
      { id: `student-${stamp}`, role: "student", text: cleanQuestion },
    ]);
    setMentorInput("");
    try {
      const response = await fetch("/api/ai/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: cleanQuestion,
          lessonId: currentLesson.id,
          code,
        }),
      });
      const result = (await response.json()) as {
        answer?: MentorAnswer;
        error?: string;
        engine?: string;
        disclosure?: string;
      };
      if (!response.ok && response.status < 500) {
        const message = result.error ?? "O mentor não está disponível para esta conta.";
        setMessages((current) => [
          ...current,
          { id: `mentor-${stamp}`, role: "mentor", text: message },
        ]);
        setToast(message);
        return;
      }
      if (!response.ok || !result.answer) {
        throw new Error(result.error ?? "Mentor indisponível.");
      }
      setMessages((current) => [
        ...current,
        {
          id: `mentor-${stamp}`,
          role: "mentor",
          text: result.answer!.message,
          answer: result.answer,
          engine: result.engine,
          disclosure: result.disclosure,
        },
      ]);
    } catch (error) {
      const answer = buildMentorAnswer(cleanQuestion, currentLesson, code);
      setMessages((current) => [
        ...current,
        { id: `mentor-${stamp}`, role: "mentor", text: answer.message, answer },
      ]);
      setToast(
        error instanceof Error
          ? `${error.message} Usei o mentor local como alternativa.`
          : "Usei o mentor local como alternativa.",
      );
    }
  };

  const analyzeInMentor = () => {
    navigate("mentor");
    askMentor("Analise o erro no meu código");
  };

  const installApp = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      const result = await installPrompt.userChoice;
      setInstallPrompt(null);
      setToast(
        result.outcome === "accepted"
          ? "NexaCode instalado com sucesso"
          : "Instalação cancelada",
      );
      return;
    }
    setToast(
      /iPhone|iPad/i.test(navigator.userAgent)
        ? "No Safari: Compartilhar → Adicionar à Tela de Início"
        : "Use o menu do navegador → Instalar aplicativo",
    );
  };

  const saveName = () => {
    const name = draftName.trim() || "Explorador";
    setProgress((current) => ({ ...current, name }));
    setDraftName(name);
    setProfileEditing(false);
    setToast("Perfil atualizado");
  };

  const resetProgress = () => {
    setProgress({ ...initialProgress, lastVisit: todayKey() });
    setDraftName("Explorador");
    setResetOpen(false);
    setToast("Progresso reiniciado");
  };

  const renderHome = () => (
    <div className="view-stack view-enter">
      <section className="language-hub">
        <div>
          <span className="section-kicker">ESCOLHA SUA ESPECIALIZAÇÃO</span>
          <strong>Uma plataforma, três caminhos de engenharia.</strong>
        </div>
        <LanguageSwitcher active={activeLanguage.id} onChange={selectLanguage} />
      </section>

      <section className="hero-panel">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="orbit-core">
            <strong>{activeLanguage.shortName}</strong>
          </span>
        </div>
        <div className="hero-copy">
          <span className="eyebrow">
            <i /> Sistema de aprendizagem ativo
          </span>
          <h1>
            Domine {activeLanguage.name}.
            <span>Pense como quem constrói.</span>
          </h1>
          <p>{activeLanguage.description}</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => openLesson(nextLesson.id)}>
              <CirclePlay size={19} />
              Continuar missão
            </button>
            <button className="button button-glass" onClick={openCodeLab}>
              <Terminal size={18} />
              {activeLanguage.id === "javascript"
                ? "Abrir Code Lab"
                : "Ver ambiente de prática"}
            </button>
          </div>
          <div className="hero-proof">
            <span>
              <ShieldCheck size={16} /> Progresso sincronizado na nuvem
            </span>
            <span>
              <BrainCircuit size={16} /> Mentor didático local
            </span>
          </div>
        </div>
        <div className="hero-progress">
          <ProgressRing value={completion} />
          <span>{activeCompletedLessons} aulas dominadas em {activeLanguage.name}</span>
        </div>
      </section>

      <section className="metric-grid">
        <article className="metric-card metric-streak">
          <div className="metric-icon">
            <Flame size={22} />
          </div>
          <div>
            <span>Sequência atual</span>
            <strong>{progress.streak} dias</strong>
          </div>
          <small>Volte amanhã para manter o ritmo</small>
        </article>
        <article className="metric-card">
          <div className="metric-icon violet">
            <Zap size={22} />
          </div>
          <div>
            <span>Experiência</span>
            <strong>{progress.xp} XP</strong>
          </div>
          <small>Próximo marco: {Math.max(0, 500 - (progress.xp % 500))} XP</small>
        </article>
        <article className="metric-card">
          <div className="metric-icon blue">
            <Gauge size={22} />
          </div>
          <div>
            <span>Índice de domínio</span>
            <strong>{learningScore}/100</strong>
          </div>
          <small>Baseado em aulas, prática e constância</small>
        </article>
        <article className="metric-card">
          <div className="metric-icon pink">
            <Target size={22} />
          </div>
          <div>
            <span>Desafios resolvidos</span>
            <strong>
              {progress.completedChallenges.length}/{challenges.length}
            </strong>
          </div>
          <small>Pratique para consolidar a teoria</small>
        </article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="section-kicker">ROADMAP INTERATIVO</span>
            <h2>Sua rota para fluência</h2>
          </div>
          <button className="text-button" onClick={() => navigate("learn")}>
            Ver trilha completa <ChevronRight size={17} />
          </button>
        </div>
        <div className="module-strip">
          {activeModules.slice(0, 5).map((module, index) => {
            const completed = module.lessons.filter((item) =>
              progress.completedLessons.includes(item.id),
            ).length;
            const moduleProgress = Math.round((completed / module.lessons.length) * 100);
            return (
              <button
                className="module-card"
                key={module.id}
                onClick={() => navigate("learn")}
                style={{ "--module-color": module.color } as React.CSSProperties}
              >
                <div className="module-top">
                  <span className="module-number">{module.number}</span>
                  <span className="module-symbol">{module.icon}</span>
                </div>
                <h3>{module.title}</h3>
                <p>{module.subtitle}</p>
                <div className="module-progress-line">
                  <i style={{ width: `${moduleProgress}%` }} />
                </div>
                <div className="module-meta">
                  <span>{module.lessons.length} missões</span>
                  <span>{moduleProgress}%</span>
                </div>
                {index < 4 && <span className="module-connector" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </section>

      <section className="home-split">
        <article className="continue-card">
          <div className="card-glow" aria-hidden="true" />
          <div className="continue-label">
            <span>
              <Activity size={15} /> PRÓXIMA MISSÃO
            </span>
            <DifficultyBadge value={nextLesson.difficulty} />
          </div>
          <h2>{nextLesson.title}</h2>
          <p>{nextLesson.summary}</p>
          <div className="code-window">
            <div className="window-bar">
              <span />
              <span />
              <span />
              <small>{`mission.${activeLanguage.fileExtension}`}</small>
            </div>
            <pre>
              <code>{nextLesson.code.split("\n").slice(0, 5).join("\n")}</code>
            </pre>
          </div>
          <button className="button button-primary" onClick={() => openLesson(nextLesson.id)}>
            Iniciar aula <ChevronRight size={18} />
          </button>
        </article>

        <article className="mentor-card">
          <div className="mentor-avatar">
            <BrainCircuit size={30} />
            <i />
          </div>
          <span className="section-kicker">NEX · MENTOR INTELIGENTE</span>
          <h2>Aprenda a raciocinar, não a decorar.</h2>
          <p>
            Peça explicações, analise erros e receba pistas progressivas baseadas no
            conteúdo que você está estudando.
          </p>
          <div className="mentor-suggestion">
            <Lightbulb size={18} />
            <span>
              “Quando travar, descreva o que esperava e o que realmente aconteceu.”
            </span>
          </div>
          <button className="button button-glass wide" onClick={() => navigate("mentor")}>
            Conversar com NEX <Sparkles size={17} />
          </button>
        </article>
      </section>
    </div>
  );

  const renderLearn = () => (
    <div className="view-stack view-enter">
      <section className="page-intro">
        <div>
          <span className="eyebrow">
            <GraduationCap size={15} /> TRILHA ESTRUTURADA
          </span>
          <h1>{activeLanguage.name} do fundamento ao produto real.</h1>
          <p>
            {activeLessons.length} aulas práticas ·{" "}
            {formatDuration(totalMinutesByLanguage[activeLanguage.id])} · progresso
            independente
          </p>
        </div>
        <ProgressRing value={completion} size="small" />
      </section>

      <LanguageSwitcher active={activeLanguage.id} onChange={selectLanguage} />

      <div className="learning-path">
        <span className="path-line" aria-hidden="true" />
        {activeModules.map((module) => {
          const completedCount = module.lessons.filter((item) =>
            progress.completedLessons.includes(item.id),
          ).length;
          return (
            <section
              className="path-module"
              id={`module-${module.id}`}
              key={module.id}
              style={{ "--module-color": module.color } as React.CSSProperties}
            >
              <div className="path-node">
                <span>{module.number}</span>
              </div>
              <div className="path-content">
                <div className="path-heading">
                  <div>
                    <span className="section-kicker">MÓDULO {module.number}</span>
                    <h2>{module.title}</h2>
                    <p>{module.subtitle}</p>
                  </div>
                  <span className="path-counter">
                    {completedCount}/{module.lessons.length} concluídas
                  </span>
                </div>
                <div className="lesson-grid">
                  {module.lessons.map((item, index) => {
                    const completed = progress.completedLessons.includes(item.id);
                    const accessible = allowedLessonIds.has(item.id);
                    return (
                      <button
                        className={classNames(
                          "lesson-card",
                          completed && "lesson-completed",
                          !accessible && "lesson-locked",
                        )}
                        key={item.id}
                        onClick={() => openLesson(item.id)}
                        aria-label={
                          accessible ? item.title : `${item.title}, disponível no plano Pro`
                        }
                      >
                        <span className="lesson-index">
                          {!accessible ? (
                            <LockKeyhole size={15} />
                          ) : completed ? (
                            <Check size={16} />
                          ) : (
                            String(index + 1).padStart(2, "0")
                          )}
                        </span>
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.summary}</p>
                          <span className="lesson-meta">
                            {item.duration} min <i /> {item.difficulty}
                          </span>
                        </div>
                        <ChevronRight size={18} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );

  const renderLab = () => {
    const insights = inspectCode(code);
    return (
      <div className="view-stack view-enter lab-view">
        <section className="page-intro compact">
          <div>
            <span className="eyebrow">
              <Terminal size={15} /> JAVASCRIPT RUNTIME
            </span>
            <h1>Code Lab · JavaScript</h1>
            <p>
              Execução real e isolada no navegador. Python e C++ usam missões
              guiadas sem simular um compilador inexistente.
            </p>
          </div>
          <button className="button button-glass" onClick={analyzeInMentor}>
            <BrainCircuit size={17} /> Analisar com NEX
          </button>
        </section>

        <div className="lab-layout">
          <aside className="challenge-panel">
            <div className="panel-title">
              <span>DESAFIOS</span>
              <strong>
                {progress.completedChallenges.length}/{challenges.length}
              </strong>
            </div>
            <div className="challenge-list">
              {challenges.map((challenge) => (
                <button
                  key={challenge.id}
                  className={classNames(
                    "challenge-item",
                    challenge.id === currentChallenge.id && "active",
                  )}
                  onClick={() => chooseChallenge(challenge.id)}
                >
                  <span
                    className={classNames(
                      "challenge-status",
                      progress.completedChallenges.includes(challenge.id) && "done",
                    )}
                  >
                    {progress.completedChallenges.includes(challenge.id) ? (
                      <Check size={14} />
                    ) : (
                      <Code2 size={14} />
                    )}
                  </span>
                  <span>
                    <strong>{challenge.title}</strong>
                    <small>
                      {challenge.category} · {challenge.xp} XP
                    </small>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <section className="workspace-panel">
            <div className="challenge-brief">
              <div>
                <span className="section-kicker">{currentChallenge.category}</span>
                <h2>{currentChallenge.title}</h2>
              </div>
              <DifficultyBadge value={currentChallenge.difficulty} />
              <p>{currentChallenge.description}</p>
              <div className="challenge-tools">
                <button
                  className="inline-action"
                  onClick={() => setShowHint((current) => !current)}
                >
                  <Lightbulb size={16} /> {showHint ? "Ocultar pista" : "Usar uma pista"}
                </button>
                <span>Recompensa: +{currentChallenge.xp} XP</span>
              </div>
              {showHint && (
                <div className="hint-box">
                  <Lightbulb size={17} />
                  <span>{currentChallenge.hint}</span>
                </div>
              )}
            </div>

            <div className="editor-shell">
              <div className="editor-toolbar">
                <div className="file-tab">
                  <i /> desafio.js
                </div>
                <div>
                  <button
                    className="icon-button"
                    aria-label="Restaurar código inicial"
                    title="Restaurar código inicial"
                    onClick={() => {
                      setCode(currentChallenge.starter);
                      setChallengeResult("idle");
                      setConsoleLines(["Código inicial restaurado."]);
                    }}
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button className="run-button" onClick={runCode} disabled={running}>
                    <Play size={15} fill="currentColor" />
                    {running ? "Executando" : "Executar"}
                  </button>
                </div>
              </div>
              <div className="editor-area">
                <div className="line-numbers" aria-hidden="true">
                  {Array.from({ length: Math.max(code.split("\n").length, 12) }).map(
                    (_, index) => (
                      <span key={index}>{index + 1}</span>
                    ),
                  )}
                </div>
                <textarea
                  aria-label="Editor de código JavaScript"
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value);
                    setChallengeResult("idle");
                  }}
                  spellCheck={false}
                />
              </div>
              <div className="console-panel">
                <div className="console-header">
                  <span>
                    <Terminal size={14} /> CONSOLE
                  </span>
                  <button onClick={() => setConsoleLines([])}>Limpar</button>
                </div>
                <div className="console-output" aria-live="polite">
                  {consoleLines.map((line, index) => (
                    <div
                      key={`${line}-${index}`}
                      className={
                        line.startsWith("✕") || line.startsWith("⏱")
                          ? "console-error"
                          : ""
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {challengeResult !== "idle" && (
              <div
                className={classNames(
                  "result-banner",
                  challengeResult === "passed" ? "result-success" : "result-failed",
                )}
              >
                {challengeResult === "passed" ? <Trophy size={22} /> : <Target size={22} />}
                <div>
                  <strong>
                    {challengeResult === "passed"
                      ? "Missão cumprida!"
                      : "Você está perto — continue investigando."}
                  </strong>
                  <span>
                    {challengeResult === "passed"
                      ? `A saída esperada foi encontrada: ${currentChallenge.expected}`
                      : `Compare sua saída com o objetivo: ${currentChallenge.expected}`}
                  </span>
                </div>
              </div>
            )}
          </section>

          <aside className="insights-panel">
            <div className="panel-title">
              <span>NEX INSIGHTS</span>
              <BrainCircuit size={17} />
            </div>
            <p className="panel-description">
              Análise local da estrutura do seu código. Seus dados não saem do aparelho.
            </p>
            <div className="insight-list">
              {insights.map((insight, index) => (
                <article className={`insight insight-${insight.level}`} key={index}>
                  <span>
                    {insight.level === "success" ? (
                      <Check size={14} />
                    ) : insight.level === "warning" ? (
                      <Activity size={14} />
                    ) : (
                      <Lightbulb size={14} />
                    )}
                  </span>
                  <div>
                    <strong>{insight.title}</strong>
                    <p>{insight.detail}</p>
                  </div>
                </article>
              ))}
            </div>
            <button className="button button-glass wide" onClick={analyzeInMentor}>
              Pedir explicação <ChevronRight size={16} />
            </button>
          </aside>
        </div>
      </div>
    );
  };

  const renderMentor = () => (
    <div className="mentor-view view-enter">
      <section className="mentor-sidebar">
        <div className="mentor-identity">
          <div className="mentor-avatar large">
            <BrainCircuit size={36} />
            <i />
          </div>
          <span className="online-label">
            <i /> NEX ONLINE
          </span>
          <h2>Mentor de raciocínio</h2>
          <p>Orientação contextual, privada e disponível durante toda a trilha.</p>
        </div>
        <div className="mentor-context">
          <span>CONTEXTO ATUAL</span>
          <strong>{currentLesson.title}</strong>
          <small>{currentLesson.moduleTitle}</small>
          <button onClick={() => openLesson(currentLesson.id)}>Reabrir aula</button>
        </div>
        <div className="privacy-note">
          <LockKeyhole size={18} />
          <div>
            <strong>Motor didático transparente</strong>
            <span>Sem API remota: o processamento usa regras locais do NexaCode.</span>
          </div>
        </div>
      </section>

      <section className="chat-panel">
        <div className="chat-header">
          <div>
            <span className="section-kicker">MENTORIA ATIVA</span>
            <h1>Como posso destravar seu aprendizado?</h1>
          </div>
          <span className="local-chip">
            <ShieldCheck size={14} /> NEX Tutor · uso controlado
          </span>
        </div>
        <div className="chat-messages" aria-live="polite">
          {messages.map((message) => (
            <article
              className={classNames(
                "chat-message",
                message.role === "student" && "student-message",
              )}
              key={message.id}
            >
              <div className="message-avatar">
                {message.role === "mentor" ? (
                  <BrainCircuit size={19} />
                ) : (
                  <UserRound size={18} />
                )}
              </div>
              <div className="message-bubble">
                {message.answer?.headline && <strong>{message.answer.headline}</strong>}
                <p>{message.text}</p>
                {message.answer?.example && (
                  <pre>
                    <code>{message.answer.example}</code>
                  </pre>
                )}
                {message.answer?.nextStep && (
                  <div className="next-step">
                    <Target size={16} />
                    <span>
                      <strong>Próximo passo:</strong> {message.answer.nextStep}
                    </span>
                  </div>
                )}
                {message.disclosure && (
                  <small className="mentor-disclosure">
                    {message.engine === "openai-responses" ? "IA REMOTA" : "MOTOR LOCAL"} · {message.disclosure}
                  </small>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="quick-prompts">
          {quickQuestions.map((question) => (
            <button key={question} onClick={() => askMentor(question)}>
              {question}
            </button>
          ))}
        </div>
        <form
          className="mentor-composer"
          onSubmit={(event) => {
            event.preventDefault();
            askMentor();
          }}
        >
          <Sparkles size={18} />
          <input
            value={mentorInput}
            onChange={(event) => setMentorInput(event.target.value)}
            placeholder="Ex.: por que meu loop não termina?"
            aria-label="Pergunta para o mentor"
          />
          <button type="submit" disabled={!mentorInput.trim()}>
            Enviar <ChevronRight size={17} />
          </button>
        </form>
      </section>
    </div>
  );

  const renderProgress = () => (
    <div className="view-stack view-enter">
      <section className="page-intro profile-intro">
        <div className="profile-hero-avatar">
          <span className={`avatar-preset-${user.avatarPreset}`}>{progress.name.slice(0, 1).toUpperCase()}</span>
          <i />
        </div>
        <div className="profile-main-copy">
          <span className="eyebrow">
            <Trophy size={15} /> PERFIL DE APRENDIZAGEM
          </span>
          {profileEditing ? (
            <div className="name-editor">
              <input
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
                maxLength={28}
                aria-label="Seu nome"
              />
              <button className="button button-primary" onClick={saveName}>
                Salvar
              </button>
              <button className="button button-glass" onClick={() => setProfileEditing(false)}>
                Cancelar
              </button>
            </div>
          ) : (
            <h1>{progress.name}</h1>
          )}
          <p>Continue construindo constância, prática e profundidade técnica.</p>
        </div>
        {!profileEditing && (
          <div className="profile-actions">
            <Link className="button button-primary" href="/conta">
              <UserPlus size={16} />
              Completar conta
            </Link>
            <button className="button button-glass" onClick={() => setProfileEditing(true)}>
              Editar nome rápido
            </button>
          </div>
        )}
      </section>

      <section className="score-grid">
        <article className="score-card primary-score">
          <ProgressRing value={globalCompletion} />
          <div>
            <span>PROGRESSO DA TRILHA</span>
            <h2>
              {progress.completedLessons.length} de {allLessons.length} aulas
            </h2>
            <p>
              Seu avanço é calculado pelas aulas concluídas. Prática e sequência
              alimentam o índice de domínio.
            </p>
          </div>
        </article>
        <article className="score-card">
          <BrainCircuit size={28} />
          <span>ÍNDICE DE DOMÍNIO</span>
          <strong>{learningScore}</strong>
          <small>de 100 pontos</small>
        </article>
        <article className="score-card">
          <Flame size={28} />
          <span>SEQUÊNCIA</span>
          <strong>{progress.streak}</strong>
          <small>dias ativos</small>
        </article>
        <article className="score-card">
          <Zap size={28} />
          <span>EXPERIÊNCIA</span>
          <strong>{progress.xp}</strong>
          <small>XP acumulados</small>
        </article>
      </section>

      <section className="language-progress-grid">
        {languages.map((language) => {
          const languageLessons = lessonsByLanguage[language.id];
          const completed = languageLessons.filter((lessonItem) =>
            progress.completedLessons.includes(lessonItem.id),
          ).length;
          const value = Math.round((completed / languageLessons.length) * 100);
          return (
            <button
              key={language.id}
              onClick={() => {
                selectLanguage(language.id);
                navigate("learn");
              }}
              style={
                {
                  "--language-accent": language.accent,
                  "--language-soft": language.accentSoft,
                } as React.CSSProperties
              }
            >
              <span>{language.shortName}</span>
              <div>
                <small>TRILHA {language.name.toUpperCase()}</small>
                <strong>
                  {completed}/{languageLessons.length} aulas
                </strong>
                <i>
                  <b style={{ width: `${value}%` }} />
                </i>
              </div>
              <em>{value}%</em>
            </button>
          );
        })}
      </section>

      <section className="progress-details">
        <article className="module-progress-card">
          <div className="section-heading">
            <div>
              <span className="section-kicker">DOMÍNIO POR MÓDULO</span>
              <h2>Mapa de {activeLanguage.name}</h2>
            </div>
            <LanguageSwitcher
              active={activeLanguage.id}
              onChange={selectLanguage}
              compact
            />
          </div>
          <div className="skill-bars">
            {activeModules.map((module) => {
              const count = module.lessons.filter((item) =>
                progress.completedLessons.includes(item.id),
              ).length;
              const value = Math.round((count / module.lessons.length) * 100);
              return (
                <button key={module.id} onClick={() => navigate("learn")}>
                  <span>{module.title}</span>
                  <div>
                    <i
                      style={
                        {
                          width: `${value}%`,
                          "--skill-color": module.color,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                  <strong>{value}%</strong>
                </button>
              );
            })}
          </div>
        </article>

        <aside className="device-card">
          <div className="device-orbit">
            <Smartphone size={36} />
          </div>
          <span className="section-kicker">APLICATIVO PWA</span>
          <h2>Leve o laboratório com você.</h2>
          <p>
            Instale na tela inicial e continue estudando com aparência de aplicativo.
          </p>
          <button className="button button-primary wide" onClick={installApp}>
            <Download size={17} /> Instalar NexaCode
          </button>
          <small>Sem loja de aplicativos. Sua conta mantém tudo sincronizado.</small>
        </aside>
      </section>

      <section className="danger-zone">
        <div>
          <strong>Recomeçar jornada</strong>
          <span>Apaga aulas, desafios e XP da sua conta sincronizada.</span>
        </div>
        <button onClick={() => setResetOpen(true)}>Reiniciar progresso</button>
      </section>
    </div>
  );

  const renderView = () => {
    if (view === "learn") return renderLearn();
    if (view === "lab") return renderLab();
    if (view === "mentor") return renderMentor();
    if (view === "progress") return renderProgress();
    return renderHome();
  };

  return (
    <div className="nexa-app">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <aside className={classNames("sidebar", mobileMenu && "sidebar-open")}>
        <Logo />
        <button
          className="close-mobile"
          aria-label="Fechar menu"
          onClick={() => setMobileMenu(false)}
        >
          <X size={20} />
        </button>
        <nav>
          <span className="nav-label">NAVEGAÇÃO</span>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={view === item.id ? "active" : ""}
                onClick={() => navigate(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.id === "mentor" && <i className="ai-dot" />}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-language-dock">
          <span className="nav-label">LINGUAGEM ATIVA</span>
          <LanguageSwitcher
            active={activeLanguage.id}
            onChange={selectLanguage}
            compact
          />
        </div>
        <Link className="account-sidebar-link" href="/conta">
          <UserPlus size={17} />
          <span>
            <strong>Minha conta</strong>
            <small>Perfil e objetivos</small>
          </span>
          <ChevronRight size={16} />
        </Link>
        <div className="daily-mission">
          <div className="daily-icon">
            <Rocket size={20} />
          </div>
          <span>MISSÃO DIÁRIA</span>
          <strong>15 minutos de foco</strong>
          <div className="daily-progress">
            <i style={{ width: progress.completedLessons.length ? "72%" : "18%" }} />
          </div>
          <small>{progress.completedLessons.length ? "11 de 15 min" : "3 de 15 min"}</small>
        </div>
        <button className="install-sidebar" onClick={installApp}>
          <Smartphone size={17} />
          <span>
            <strong>Instalar aplicativo</strong>
            <small>Android, iPhone e PC</small>
          </span>
          <ChevronRight size={16} />
        </button>
        <div className="sidebar-profile">
          <button onClick={() => navigate("progress")}>
            <span className={`avatar-preset-${user.avatarPreset}`}>{progress.name.slice(0, 1).toUpperCase()}</span>
            <div>
              <strong>{progress.name}</strong>
              <small>
                Nível {Math.floor(progress.xp / 500) + 1} · {progress.xp} XP
              </small>
            </div>
            <ChevronRight size={15} />
          </button>
        </div>
      </aside>

      {mobileMenu && (
        <button
          className="mobile-backdrop"
          aria-label="Fechar menu"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <div className="app-shell">
        <header className="topbar">
          <button
            className="menu-button"
            aria-label="Abrir menu"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={21} />
          </button>
          <div className="mobile-logo">
            <Logo />
          </div>
          <div className="topbar-context">
            <span>
              {view === "home"
                ? `CENTRAL · ${activeLanguage.name.toUpperCase()}`
                : navItems.find((item) => item.id === view)?.label.toUpperCase()}
            </span>
            <small>
              Olá, {progress.name}.{" "}
              {view === "home"
                ? "Pronto para evoluir hoje?"
                : "Mantenha o foco na próxima ação."}
            </small>
          </div>
          <div className="topbar-actions">
            <ThemeToggle preferredTheme={user.themePreference} />
            <button className="search-trigger" onClick={() => setSearchOpen(true)}>
              <Search size={17} />
              <span>Buscar uma aula...</span>
              <kbd>
                <Command size={12} /> K
              </kbd>
            </button>
            <Link className="topbar-account-link" href="/conta">
              <UserPlus size={17} />
              <span>Minha conta</span>
            </Link>
            <div className="notification-wrap">
              <button
                className="icon-button notification-button"
                aria-label="Notificações"
                aria-expanded={notificationsOpen}
                onClick={() => {
                  const opening = !notificationsOpen;
                  setNotificationsOpen(opening);
                  if (opening && notifications.some((item) => !item.readAt)) {
                    setNotifications((items) => items.map((item) => ({ ...item, readAt: item.readAt ?? new Date().toISOString() })));
                    void fetch("/api/notifications", { method: "PATCH" });
                  }
                }}
              >
                <Activity size={18} />
                {notifications.some((item) => !item.readAt) && <i />}
              </button>
              {notificationsOpen && (
                <div className="notification-popover" role="status">
                  <span>CENTRAL DE ATUALIZAÇÕES</span>
                  {notifications.length ? notifications.slice(0, 4).map((notification) => (
                    <article key={notification.id}>
                      <strong>{notification.title}</strong>
                      <p>{notification.message}</p>
                      <small>{new Date(notification.createdAt).toLocaleDateString("pt-BR")}</small>
                    </article>
                  )) : (
                    <article>
                      <strong>{nextLesson.title}</strong>
                      <p>Uma aula curta já é suficiente para manter sua sequência.</p>
                    </article>
                  )}
                  <button onClick={() => { setNotificationsOpen(false); openLesson(nextLesson.id); }}>
                    Continuar estudando
                  </button>
                </div>
              )}
            </div>
            <button className={`avatar-button avatar-preset-${user.avatarPreset}`} onClick={() => navigate("progress")}>
              {progress.name.slice(0, 1).toUpperCase()}
            </button>
          </div>
        </header>

        <main>{renderView()}</main>
      </div>

      <nav className="mobile-nav" aria-label="Navegação principal">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={view === item.id ? "active" : ""}
              onClick={() => navigate(item.id)}
            >
              <Icon size={19} />
              <span>{item.shortLabel}</span>
            </button>
          );
        })}
      </nav>

      {lessonOpen && (
        <div
          className="modal-layer"
          role="dialog"
          aria-modal="true"
          aria-label={currentLesson.title}
        >
          <button
            className="modal-backdrop"
            aria-label="Fechar aula"
            onClick={() => setLessonOpen(false)}
          />
          <section className="lesson-modal">
            <div className="lesson-modal-header">
              <div>
                <span className="section-kicker">
                  {currentLanguage.shortName} · {currentLesson.moduleTitle}
                </span>
                <h2>{currentLesson.title}</h2>
                <p>
                  {currentLesson.duration} min · {currentLesson.difficulty}
                </p>
              </div>
              <button
                className="icon-button"
                aria-label="Fechar aula"
                onClick={() => setLessonOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="lesson-modal-body">
              <div className="concept-block">
                <span>CONCEITO-CHAVE</span>
                <p>{currentLesson.theory}</p>
              </div>
              <div className="analogy-block">
                <Lightbulb size={20} />
                <div>
                  <strong>Modelo mental</strong>
                  <p>{currentLesson.analogy}</p>
                </div>
              </div>
              {currentLesson.studyGuide && (
                <section className="lesson-written-guide">
                  <div className="lesson-written-guide-heading">
                    <div className="lesson-written-guide-icon" aria-hidden="true">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <span>LEITURA GUIADA · CONTEÚDO NEXACODE</span>
                      <h3>{currentLesson.studyGuide.title}</h3>
                    </div>
                  </div>
                  <p className="lesson-written-guide-overview">
                    {currentLesson.studyGuide.overview}
                  </p>
                  <div className="lesson-written-guide-grid">
                    <div>
                      <strong>PONTOS-CHAVE</strong>
                      <ul>
                        {currentLesson.studyGuide.keyPoints.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    <aside>
                      <strong>ERRO COMUM</strong>
                      <p>{currentLesson.studyGuide.commonMistake}</p>
                    </aside>
                  </div>
                  <div className="lesson-written-guide-practice">
                    <Target size={17} aria-hidden="true" />
                    <div>
                      <strong>PRÁTICA ORIENTADA</strong>
                      <p>{currentLesson.studyGuide.guidedPractice}</p>
                    </div>
                  </div>
                </section>
              )}
              <section className="lesson-objectives">
                <div>
                  <span>OBJETIVOS VERIFICÁVEIS</span>
                  <ul>
                    {currentLesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}
                  </ul>
                </div>
                <div>
                  <span>PRÉ-REQUISITOS</span>
                  <ul>
                    {currentLesson.prerequisites.map((prerequisite) => <li key={prerequisite}>{prerequisite}</li>)}
                  </ul>
                </div>
              </section>
              <div className="lesson-code">
                <div className="window-bar">
                  <span />
                  <span />
                  <span />
                  <small>{`exemplo.${currentLanguage.fileExtension}`}</small>
                  <button
                    onClick={async () => {
                      await navigator.clipboard.writeText(currentLesson.code);
                      setToast("Código copiado");
                    }}
                  >
                    Copiar
                  </button>
                </div>
                <pre>
                  <code>{currentLesson.code}</code>
                </pre>
              </div>
              <section className="lesson-engineering">
                <span>REVISÃO DE ENGENHARIA</span>
                <div>
                  <article><strong>Uso em produção</strong><p>{currentLesson.engineering.productionContext}</p></article>
                  <article><strong>Falhas que importam</strong><p>{currentLesson.engineering.failureMode}</p></article>
                  <article><strong>Estratégia de testes</strong><p>{currentLesson.engineering.verification}</p></article>
                  <article><strong>Custo e desempenho</strong><p>{currentLesson.engineering.performance}</p></article>
                </div>
              </section>
              <div className="mission-block">
                <Target size={21} />
                <div>
                  <span>MICROMISSÃO</span>
                  <p>{currentLesson.mission}</p>
                </div>
                <button
                  onClick={async () => {
                    if (currentLesson.language === "javascript") {
                      setLessonOpen(false);
                      navigate("lab");
                      return;
                    }
                    await navigator.clipboard.writeText(currentLesson.mission);
                    setToast("Micromissão copiada para você praticar");
                  }}
                >
                  {currentLesson.language === "javascript"
                    ? "Praticar no Lab"
                    : "Copiar micromissão"}{" "}
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="quiz-block">
                <span>CHECKPOINT DE COMPREENSÃO</span>
                <h3>{currentLesson.quiz.question}</h3>
                <div className="quiz-options">
                  {currentLesson.quiz.options.map((option, index) => (
                    <button
                      key={option}
                      className={classNames(
                        quizChoice === index && "selected",
                        quizChecked && index === currentLesson.quiz.answer && "correct",
                        quizChecked &&
                          quizChoice === index &&
                          index !== currentLesson.quiz.answer &&
                          "incorrect",
                      )}
                      onClick={() => {
                        if (!quizChecked) setQuizChoice(index);
                      }}
                    >
                      <span>{String.fromCharCode(65 + index)}</span>
                      {option}
                      {quizChecked && index === currentLesson.quiz.answer && (
                        <Check size={17} />
                      )}
                    </button>
                  ))}
                </div>
                {quizChecked && (
                  <p className="quiz-explanation">{currentLesson.quiz.explanation}</p>
                )}
                <button
                  className="button button-glass"
                  disabled={quizChoice === null}
                  onClick={() => setQuizChecked(true)}
                >
                  Verificar resposta
                </button>
              </div>
            </div>
            <div className="lesson-modal-footer">
              <button
                className="text-button"
                onClick={() => {
                  setLessonOpen(false);
                  navigate("mentor");
                }}
              >
                <BrainCircuit size={17} /> Tirar dúvida com NEX
              </button>
              <button className="button button-primary" onClick={completeLesson}>
                <Check size={17} />
                {progress.completedLessons.includes(currentLesson.id)
                  ? "Aula concluída"
                  : "Concluir e ganhar 60 XP"}
              </button>
            </div>
          </section>
        </div>
      )}

      {searchOpen && (
        <div className="modal-layer command-layer" role="dialog" aria-modal="true">
          <button
            className="modal-backdrop"
            aria-label="Fechar busca"
            onClick={() => setSearchOpen(false)}
          />
          <section className="command-palette">
            <div className="command-input">
              <Search size={19} />
              <input
                autoFocus
                placeholder="Busque por aula, conceito ou módulo..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <button onClick={() => setSearchOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="command-results">
              {(search
                ? allLessons.filter((item) =>
                    `${item.title} ${item.summary} ${item.moduleTitle}`
                      .toLocaleLowerCase("pt-BR")
                      .includes(search.toLocaleLowerCase("pt-BR")),
                  )
                : allLessons.slice(0, 7)
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSearchOpen(false);
                    setSearch("");
                    openLesson(item.id);
                  }}
                >
                  <span>
                    <Code2 size={17} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>
                      {languages.find((language) => language.id === item.language)
                        ?.shortName ?? ""}{" "}
                      · {item.moduleTitle} · {item.duration} min
                    </small>
                  </div>
                  <ChevronRight size={17} />
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {resetOpen && (
        <div className="modal-layer" role="dialog" aria-modal="true">
          <button
            className="modal-backdrop"
            aria-label="Cancelar"
            onClick={() => setResetOpen(false)}
          />
          <section className="confirm-modal">
            <div className="confirm-icon">
              <RotateCcw size={24} />
            </div>
            <h2>Reiniciar sua jornada?</h2>
            <p>
              Aulas concluídas, desafios e XP serão apagados neste dispositivo. Essa
              ação não pode ser desfeita.
            </p>
            <div>
              <button className="button button-glass" onClick={() => setResetOpen(false)}>
                Manter progresso
              </button>
              <button className="button button-danger" onClick={resetProgress}>
                Sim, reiniciar
              </button>
            </div>
          </section>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
