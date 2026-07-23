export type PlanId = "free" | "pro" | "teams";

export type PlanDefinition = {
  id: PlanId;
  name: string;
  eyebrow: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  aiDailyLimit: number;
  seatLimit: number;
  lessonLimit: number | null;
  features: string[];
};

export const plans: Record<PlanId, PlanDefinition> = {
  free: {
    id: "free",
    name: "Starter",
    eyebrow: "COMECE SEM RISCO",
    description: "Para criar consistência e experimentar o método Nexa.",
    monthlyPrice: 0,
    annualPrice: 0,
    aiDailyLimit: 8,
    seatLimit: 1,
    lessonLimit: 8,
    features: [
      "8 aulas fundamentais",
      "Progresso salvo na nuvem",
      "8 interações diárias com o mentor local",
      "Code Lab JavaScript",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    eyebrow: "PARA ACELERAR",
    description: "A jornada completa para construir portfólio e dominar fundamentos.",
    monthlyPrice: 39,
    annualPrice: 390,
    aiDailyLimit: 100,
    seatLimit: 1,
    lessonLimit: null,
    features: [
      "Todas as 44 aulas",
      "JavaScript, Python e C++",
      "Mentor avançado e revisão de código",
      "Projetos, histórico e certificados",
    ],
  },
  teams: {
    id: "teams",
    name: "Equipes",
    eyebrow: "ESCOLAS E TIMES",
    description: "Gestão de pessoas, convites e visão consolidada de evolução.",
    monthlyPrice: 149,
    annualPrice: 1490,
    aiDailyLimit: 500,
    seatLimit: 10,
    lessonLimit: null,
    features: [
      "Tudo do plano Pro",
      "10 membros incluídos",
      "Papéis de gestor, professor e aluno",
      "Relatórios e trilhas atribuídas",
    ],
  },
};

export const planOrder: PlanId[] = ["free", "pro", "teams"];

export function normalizePlan(value: string | null | undefined): PlanId {
  return value === "pro" || value === "teams" ? value : "free";
}

export function canUseFeature(
  planId: PlanId,
  feature: "all_lessons" | "certificates" | "advanced_ai" | "organizations",
) {
  if (feature === "organizations") return planId === "teams";
  return planId === "pro" || planId === "teams";
}

export function accessibleLessonIds(planId: PlanId, lessonIds: string[]) {
  const limit = plans[planId].lessonLimit;
  return limit === null ? lessonIds : lessonIds.slice(0, limit);
}
