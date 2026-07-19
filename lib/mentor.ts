import type { LanguageId, Lesson } from "./course-data";

export type CodeInsight = {
  level: "success" | "warning" | "idea";
  title: string;
  detail: string;
};

export type MentorAnswer = {
  headline: string;
  message: string;
  example?: string;
  nextStep: string;
};

export function inspectCode(code: string): CodeInsight[] {
  const insights: CodeInsight[] = [];
  const trimmed = code.trim();

  if (!trimmed) {
    return [
      {
        level: "idea",
        title: "Comece pequeno",
        detail:
          "Escreva uma variável e um console.log. Depois execute para observar o fluxo.",
      },
    ];
  }

  try {
    // Parse only. User code is executed in a sandboxed iframe by the interface.
    new Function(trimmed);
    insights.push({
      level: "success",
      title: "Sintaxe válida",
      detail: "O JavaScript conseguiu interpretar a estrutura do seu código.",
    });
  } catch (error) {
    insights.push({
      level: "warning",
      title: "Revise a sintaxe",
      detail:
        error instanceof Error
          ? error.message
          : "Existe um símbolo ou bloco fora do lugar.",
    });
    return insights;
  }

  if (/\bvar\b/.test(code)) {
    insights.push({
      level: "warning",
      title: "Prefira let ou const",
      detail:
        "var possui escopo de função e pode causar comportamentos inesperados. Use const por padrão e let quando houver reatribuição.",
    });
  }

  if (/[^=!]==[^=]/.test(code) || /[^!]!=[^=]/.test(code)) {
    insights.push({
      level: "warning",
      title: "Comparação mais previsível",
      detail:
        "Considere === ou !== para comparar valor e tipo sem conversões implícitas.",
    });
  }

  if (/\bfunction\s*\([^)]*\)/.test(code)) {
    insights.push({
      level: "idea",
      title: "Nomeie a intenção",
      detail:
        "Uma função nomeada deixa mensagens de erro e manutenção mais fáceis de entender.",
    });
  }

  if (/console\.log/.test(code)) {
    insights.push({
      level: "success",
      title: "Observação ativa",
      detail:
        "Você está usando o console para verificar hipóteses — um ótimo hábito de depuração.",
    });
  } else {
    insights.push({
      level: "idea",
      title: "Torne o resultado visível",
      detail:
        "Adicione um console.log temporário para confirmar entradas, etapas e saída.",
    });
  }

  const openBraces = (code.match(/{/g) ?? []).length;
  const closeBraces = (code.match(/}/g) ?? []).length;
  if (openBraces !== closeBraces) {
    insights.push({
      level: "warning",
      title: "Chaves desequilibradas",
      detail: `Há ${openBraces} chave(s) aberta(s) e ${closeBraces} fechada(s).`,
    });
  }

  return insights.slice(0, 4);
}

export function buildMentorAnswer(
  question: string,
  lesson: Lesson & { language?: LanguageId },
  code: string,
): MentorAnswer {
  const normalized = question.toLocaleLowerCase("pt-BR");
  const languageName =
    lesson.language === "python" ? "Python" : lesson.language === "cpp" ? "C++" : "JavaScript";
  const firstInsight =
    lesson.language && lesson.language !== "javascript"
      ? {
          level: "idea" as const,
          title: `Depuração em ${languageName}`,
          detail:
            "Compare a primeira mensagem do interpretador ou compilador com a linha indicada e reduza o exemplo até isolar a causa.",
        }
      : inspectCode(code)[0];

  if (
    normalized.includes("erro") ||
    normalized.includes("não funciona") ||
    normalized.includes("nao funciona") ||
    normalized.includes("bug")
  ) {
    return {
      headline: "Vamos depurar por evidências",
      message:
        firstInsight.level === "warning"
          ? `${firstInsight.detail} Leia a primeira mensagem do console, localize a linha indicada e confirme os valores imediatamente antes dela.`
          : "A sintaxe parece válida. Agora verifique se as entradas têm os valores esperados e se cada condição realmente pode ser alcançada.",
      example:
        lesson.language === "python" || lesson.language === "cpp"
          ? lesson.code
          : `console.log({ etapa: "antes da regra", valor });`,
      nextStep:
        "Execute de novo com um console.log antes do ponto que falha e me conte o primeiro valor inesperado.",
    };
  }

  if (
    normalized.includes("explica") ||
    normalized.includes("explique") ||
    normalized.includes("entender") ||
    normalized.includes("o que")
  ) {
    return {
      headline: `${lesson.title}, em linguagem simples`,
      message: `${lesson.theory} Pense assim: ${lesson.analogy}`,
      example: lesson.code,
      nextStep: `Faça esta microprática: ${lesson.mission}`,
    };
  }

  if (normalized.includes("exemplo")) {
    return {
      headline: "Exemplo com intenção",
      message:
        "Antes de copiar, leia cada linha e tente prever a saída. Depois altere um valor e compare o resultado.",
      example: lesson.code,
      nextStep:
        "Troque os nomes e valores do exemplo por dados do seu cotidiano e execute novamente.",
    };
  }

  if (
    normalized.includes("desafio") ||
    normalized.includes("exercício") ||
    normalized.includes("exercicio")
  ) {
    return {
      headline: "Seu próximo passo",
      message:
        "Divida o problema em três partes: quais dados entram, qual regra transforma esses dados e qual saída prova que funcionou.",
      nextStep: lesson.mission,
    };
  }

  if (normalized.includes("diferença") || normalized.includes("diferenca")) {
    return {
      headline: "Compare pelo comportamento",
      message:
        "Não memorize apenas a sintaxe. Pergunte: que dado cada opção recebe, o que devolve e se altera o valor original. Essa comparação revela a diferença real.",
      nextStep:
        "Crie dois exemplos mínimos lado a lado, usando a mesma entrada, e compare as saídas no console.",
    };
  }

  if (normalized.includes("array")) {
    if (lesson.language && lesson.language !== "javascript") {
      return {
        headline: `Coleções em ${languageName}`,
        message:
          "Escolha a estrutura pelo comportamento: ordem, mutabilidade, busca e propriedade dos dados. Depois teste com uma coleção mínima e um caso de limite.",
        example: lesson.code,
        nextStep: lesson.mission,
      };
    }
    return {
      headline: "Arrays são fluxos de dados",
      message:
        "Use map para transformar, filter para selecionar, find para localizar um item e reduce para combinar a coleção. Escolha o método pelo verbo da tarefa.",
      example: `const aprovados = notas
  .filter(nota => nota >= 7)
  .map(nota => ({ nota, status: "aprovado" }));`,
      nextStep:
        "Diga em voz alta o verbo do seu problema; ele normalmente aponta para o método certo.",
    };
  }

  if (normalized.includes("async") || normalized.includes("promise")) {
    return {
      headline: "Assíncrono sem mágica",
      message:
        "Uma Promise representa um resultado futuro. await organiza a leitura desse fluxo dentro de uma função async, enquanto try/catch cuida das falhas esperadas.",
      example: `async function carregar() {
  try {
    const resposta = await buscarDados();
    return resposta;
  } catch (erro) {
    console.error("Falha ao carregar", erro);
  }
}`,
      nextStep:
        "Modele os estados loading, success e error antes de conectar uma API real.",
    };
  }

  return {
    headline: "Vamos transformar a dúvida em experimento",
    message: `Você está estudando ${lesson.title} em ${languageName}. Formule uma hipótese, mude apenas uma coisa no código e observe o resultado. ${firstInsight.detail}`,
    nextStep:
      "Pergunte “o que espero ver no console?” e execute o menor exemplo capaz de responder.",
  };
}

export function calculateLearningScore(
  completedLessons: number,
  completedChallenges: number,
  streak: number,
) {
  return Math.min(
    100,
    completedLessons * 3 + completedChallenges * 5 + Math.min(streak, 10) * 2,
  );
}
