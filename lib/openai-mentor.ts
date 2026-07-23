import type { LanguageId, Lesson } from "@/lib/course-data";
import type { MentorAnswer, MentorTestResult } from "@/lib/mentor";
import { mentorAnswerSchema, NEX_MENTOR_SYSTEM_PROMPT } from "@/lib/mentor-system-prompt";
import { runtimeValue } from "@/lib/runtime-env";
import type { PlanId } from "@/lib/saas";

type ResponsesPayload = {
  output?: Array<{
    type?: string;
    content?: Array<{ type?: string; text?: string }>;
  }>;
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
  };
};

export type RemoteMentorContext = {
  intent: string;
  planId: PlanId;
  hintStage: number;
  exerciseId?: string;
  exerciseGoal?: string;
  failedAttempts: number;
  recentErrors: string[];
  recentMessages: Array<{ role: "student" | "mentor"; text: string }>;
  testResults: MentorTestResult[];
  solutionExplicitlyRequested: boolean;
};

export function remoteMentorConfigured() {
  return runtimeValue("AI_PROVIDER") === "openai" && Boolean(runtimeValue("OPENAI_API_KEY"));
}

function extractText(payload: ResponsesPayload) {
  return (payload.output ?? [])
    .filter((item) => item.type === "message")
    .flatMap((item) => item.content ?? [])
    .filter((item) => item.type === "output_text" && typeof item.text === "string")
    .map((item) => item.text)
    .join("\n")
    .trim();
}

function parseMentorAnswer(raw: string): MentorAnswer {
  const jsonText = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  const value = JSON.parse(jsonText) as Partial<MentorAnswer>;
  if (
    typeof value.headline !== "string" ||
    typeof value.message !== "string" ||
    typeof value.nextStep !== "string"
  ) {
    throw new Error("Resposta remota fora do formato esperado.");
  }
  return {
    headline: value.headline.trim().slice(0, 120),
    message: value.message.trim().slice(0, 2400),
    example: typeof value.example === "string" ? value.example.trim().slice(0, 4000) : undefined,
    nextStep: value.nextStep.trim().slice(0, 600),
    hintStage:
      typeof value.hintStage === "number" ? Math.min(4, Math.max(1, value.hintStage)) : 1,
    intent: value.intent,
    detectedIssue:
      typeof value.detectedIssue === "string" ? value.detectedIssue.trim().slice(0, 400) : null,
    shouldRunTests: value.shouldRunTests !== false,
    confidence:
      value.confidence === "low" || value.confidence === "high" ? value.confidence : "medium",
  };
}

export function selectMentorModel(context: RemoteMentorContext) {
  const simple =
    runtimeValue("OPENAI_MODEL_SIMPLE") ||
    runtimeValue("OPENAI_MODEL") ||
    "gpt-5.6-luna";
  const advanced = runtimeValue("OPENAI_MODEL_ADVANCED") || "gpt-5.6-terra";
  const review = runtimeValue("OPENAI_MODEL_REVIEW") || "gpt-5.6-sol";
  if (context.planId === "free") return { model: simple, effort: "low", route: "simple" };
  if (
    context.hintStage >= 4 &&
    (context.intent === "review" || context.intent === "debug")
  ) {
    return { model: review, effort: "medium", route: "review" };
  }
  if (context.intent === "debug" || context.intent === "review") {
    return { model: advanced, effort: "low", route: "advanced" };
  }
  return { model: simple, effort: "low", route: "simple" };
}

export async function generateRemoteMentorAnswer(options: {
  question: string;
  code: string;
  lesson: Lesson & { language?: LanguageId };
  context: RemoteMentorContext;
}) {
  if (!remoteMentorConfigured()) return null;

  const { question, code, lesson, context } = options;
  const selection = selectMentorModel(context);
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${runtimeValue("OPENAI_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: selection.model,
      store: false,
      reasoning: { effort: selection.effort },
      text: {
        verbosity: "low",
        format: {
          type: "json_schema",
          name: "nex_mentor_answer",
          strict: true,
          schema: mentorAnswerSchema,
        },
      },
      max_output_tokens: selection.route === "review" ? 1200 : 800,
      instructions: NEX_MENTOR_SYSTEM_PROMPT,
      input: JSON.stringify({
        student: { plan: context.planId },
        lesson: {
          id: lesson.id,
          language: lesson.language,
          title: lesson.title,
          concept: lesson.summary,
          theory: lesson.theory,
          objectives: lesson.objectives,
          exerciseGoal: context.exerciseGoal ?? lesson.mission,
        },
        attempt: {
          code: code || null,
          question,
          exerciseId: context.exerciseId ?? null,
          testResults: context.testResults,
          hintStage: context.hintStage,
          failedAttempts: context.failedAttempts,
          recentErrors: context.recentErrors,
        },
        conversation: {
          recentMessages: context.recentMessages,
          solutionExplicitlyRequested: context.solutionExplicitlyRequested,
        },
      }),
    }),
    signal: AbortSignal.timeout(18_000),
  });

  if (!response.ok) throw new Error(`OpenAI respondeu com status ${response.status}.`);
  const payload = (await response.json()) as ResponsesPayload;
  const raw = extractText(payload);
  if (!raw) throw new Error("OpenAI não retornou texto utilizável.");
  return {
    answer: parseMentorAnswer(raw),
    inputUnits: payload.usage?.input_tokens ?? question.length + code.length,
    outputUnits: payload.usage?.output_tokens ?? raw.length,
    model: selection.model,
    route: selection.route,
  };
}
