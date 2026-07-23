import type { LanguageId, Lesson } from "@/lib/course-data";
import type { MentorAnswer } from "@/lib/mentor";
import { runtimeValue } from "@/lib/runtime-env";

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
  const jsonText = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
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
  };
}

export async function generateRemoteMentorAnswer(options: {
  question: string;
  code: string;
  lesson: Lesson & { language?: LanguageId };
}) {
  if (!remoteMentorConfigured()) return null;

  const { question, code, lesson } = options;
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${runtimeValue("OPENAI_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: runtimeValue("OPENAI_MODEL") || "gpt-5.6-luna",
      store: false,
      reasoning: { effort: "low" },
      text: { verbosity: "low" },
      max_output_tokens: 900,
      instructions:
        "Você é NEX, mentor de programação do NexaCode AI. Responda em português do Brasil, ensine o raciocínio sem entregar soluções inteiras quando uma pista bastar e nunca invente execução de código. Retorne somente JSON válido com headline, message, example opcional e nextStep.",
      input: [
        `Linguagem: ${lesson.language}`,
        `Aula: ${lesson.title}`,
        `Resumo: ${lesson.summary}`,
        `Objetivos: ${lesson.objectives.join("; ")}`,
        `Pergunta do aluno: ${question}`,
        code.trim() ? `Código enviado:\n${code}` : "Código enviado: nenhum",
      ].join("\n\n"),
    }),
    signal: AbortSignal.timeout(18_000),
  });

  if (!response.ok) {
    throw new Error(`OpenAI respondeu com status ${response.status}.`);
  }
  const payload = (await response.json()) as ResponsesPayload;
  const raw = extractText(payload);
  if (!raw) throw new Error("OpenAI não retornou texto utilizável.");
  return {
    answer: parseMentorAnswer(raw),
    inputUnits: payload.usage?.input_tokens ?? question.length + code.length,
    outputUnits: payload.usage?.output_tokens ?? raw.length,
  };
}
