import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const output = path.join(root, "Curso");
const source = await fs.readFile(path.join(root, "lib", "course-data.ts"), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const courseModuleContainer = { exports: {} };
const localRequire = (id) => {
  if (id === "./multilanguage-data") {
    return { cppModules: [], pythonModules: [], programmingLanguages: [] };
  }
  throw new Error(`Importação inesperada durante a geração: ${id}`);
};
new Function("require", "exports", "module", compiled)(
  localRequire,
  courseModuleContainer.exports,
  courseModuleContainer,
);
const modules = courseModuleContainer.exports.javascriptModules;

if (!Array.isArray(modules) || modules.flatMap((item) => item.lessons).length !== 24) {
  throw new Error("A geração exige exatamente as 24 aulas originais de JavaScript.");
}

const clean = (value) => value.replace(/\s+/g, " ").trim();
const slugNumber = (value) => String(value).padStart(2, "0");
const write = async (relative, content) => {
  const target = path.join(output, relative);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, `${content.trim()}\n`, "utf8");
};

const objectiveQuestions = (lesson) => {
  const base = [
    {
      q: lesson.quiz.question,
      options: lesson.quiz.options,
      answer: lesson.quiz.answer,
      explanation: lesson.quiz.explanation,
    },
    {
      q: `Qual prática torna "${lesson.title}" mais segura em um projeto real?`,
      options: [
        "Ignorar entradas inválidas",
        lesson.engineering.verification,
        "Ocultar todas as falhas",
        "Otimizar antes de medir",
      ],
      answer: 1,
      explanation: lesson.engineering.verification,
    },
    {
      q: `Qual risco merece atenção ao aplicar "${lesson.title}"?`,
      options: [
        "Usar nomes claros",
        "Criar testes reproduzíveis",
        lesson.engineering.failureMode,
        "Documentar o contrato",
      ],
      answer: 2,
      explanation: lesson.engineering.failureMode,
    },
    {
      q: "Qual sequência representa uma aprendizagem tecnicamente responsável?",
      options: [
        "Copiar, publicar e só depois entender",
        "Entender, implementar, verificar e revisar",
        "Otimizar, ocultar erros e remover testes",
        "Decorar sintaxe sem praticar",
      ],
      answer: 1,
      explanation:
        "Entendimento, implementação e verificação conectam teoria a comportamento observável.",
    },
    {
      q: `Para que serve o exemplo de código desta aula?`,
      options: [
        "Substituir a compreensão",
        "Demonstrar o conceito em uma situação pequena e verificável",
        "Evitar qualquer adaptação",
        "Provar que erros não existem",
      ],
      answer: 1,
      explanation:
        "O exemplo reduz o problema para tornar o mecanismo visível; depois ele deve ser adaptado.",
    },
    {
      q: "O que deve acontecer quando uma entrada viola o contrato?",
      options: [
        "A aplicação deve fingir sucesso",
        "O valor deve ser aceito silenciosamente",
        "A falha deve ser tratada ou comunicada com clareza",
        "Todos os dados devem ser apagados",
      ],
      answer: 2,
      explanation:
        "Contratos só são úteis quando entradas inválidas recebem uma resposta previsível.",
    },
    {
      q: `Qual é o melhor primeiro passo antes de otimizar "${lesson.title}"?`,
      options: [
        "Medir e identificar um gargalo real",
        "Reduzir nomes de variáveis",
        "Remover validações",
        "Duplicar o código",
      ],
      answer: 0,
      explanation: lesson.engineering.performance,
    },
    {
      q: "Qual teste aumenta mais a confiança na solução?",
      options: [
        "Somente o caminho feliz",
        "Somente uma execução manual",
        "Caso normal, limite e falha esperada",
        "Nenhum teste até a publicação",
      ],
      answer: 2,
      explanation:
        "Os três grupos verificam comportamento comum, fronteiras e respostas a condições inválidas.",
    },
    {
      q: "Por que usar nomes que expressem intenção?",
      options: [
        "Para aumentar o arquivo",
        "Para comunicar o papel do dado ou operação",
        "Para evitar qualquer comentário",
        "Para alterar o resultado automaticamente",
      ],
      answer: 1,
      explanation:
        "Um nome preciso reduz a carga mental e ajuda outras pessoas a revisar o comportamento.",
    },
    {
      q: `Quando a solução de "${lesson.title}" pode ser considerada concluída?`,
      options: [
        "Quando compila uma única vez",
        "Quando parece bonita",
        "Quando atende ao contrato e passa pelas verificações definidas",
        "Quando não existem mensagens de erro visíveis",
      ],
      answer: 2,
      explanation:
        "Conclusão exige critérios observáveis, inclusive para limites e falhas.",
    },
  ];
  return base;
};

const lessonMarkdown = (lesson, lessonNumber, moduleTitle, previousReview) => {
  const guide = lesson.studyGuide;
  const questions = objectiveQuestions(lesson);
  const objectives = lesson.objectives.map((item) => `- ${item}`).join("\n");
  const points = guide.keyPoints.map((item) => `- ${item}`).join("\n");
  const objectiveBlock = questions
    .map(
      (item, index) =>
        `${index + 1}. ${item.q}\n${item.options
          .map((option, optionIndex) => `   - ${String.fromCharCode(65 + optionIndex)}) ${clean(option)}`)
          .join("\n")}`,
    )
    .join("\n\n");
  const answers = questions
    .map(
      (item, index) =>
        `${index + 1}. **${String.fromCharCode(65 + item.answer)}.** ${clean(item.explanation)}`,
    )
    .join("\n");

  return `# Aula ${lessonNumber} — ${lesson.title}

> Módulo: ${moduleTitle} · Nível: ${lesson.difficulty} · Tempo sugerido: ${lesson.duration} minutos

## Objetivos da aula

${objectives}

## Revisão antes de começar

${previousReview}

## Introdução

Antes do código, pense nesta comparação cotidiana: **${lesson.analogy}**

${guide.overview} Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

${lesson.theory}

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **${lesson.title}** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

### Como funciona

1. Identifique a entrada ou estado envolvido.
2. Defina o resultado esperado antes de escrever a solução.
3. Aplique o conceito em uma unidade pequena.
4. Observe a saída real.
5. Compare o resultado com o contrato e trate casos inválidos.

### Quando utilizar

${lesson.engineering.productionContext}

### Quando não utilizar

Não use o conceito apenas porque a sintaxe está disponível. Evite-o quando uma construção mais simples comunicar melhor a regra ou quando sua adoção esconder efeitos colaterais e estados inválidos.

### Pontos-chave

${points}

### Revisão do tópico

- O conceito precisa ter uma finalidade clara.
- Entradas, saídas e falhas devem ser observáveis.
- Legibilidade vem antes de otimizações sem medição.

## Passo a passo

1. Leia o problema e destaque substantivos, ações e restrições.
2. Converta essas informações em dados e operações com nomes claros.
3. Implemente primeiro o caso normal.
4. Acrescente um caso de limite e uma entrada inválida.
5. Execute, registre a saída e compare com o resultado esperado.
6. Refatore somente depois de confirmar o comportamento.

## Exemplos práticos

### Exemplo técnico

\`\`\`javascript
${lesson.code}
\`\`\`

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

${guide.guidedPractice}

## Erros mais comuns

1. **Erro central:** ${guide.commonMistake}
2. Começar a codificar sem definir o resultado esperado.
3. Testar somente o caminho feliz.
4. Misturar cálculo, entrada e apresentação em um único bloco.
5. Ignorar mensagens de erro em vez de investigar sua origem.

## Dicas profissionais

- ${lesson.engineering.verification}
- ${lesson.engineering.performance}
- Escreva uma frase explicando o contrato antes da implementação.
- Prefira exemplos pequenos que possam ser executados e conferidos.
- Durante a revisão, procure estados inválidos e dependências ocultas.

## Resumo da aula

Você estudou **${lesson.title}**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: ${clean(guide.overview)}

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **${lesson.title}:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

${objectiveBlock}

### 5 questões dissertativas

1. Explique ${lesson.title.toLocaleLowerCase("pt-BR")} para alguém que nunca programou.
2. Compare o conceito com a analogia apresentada e indique o limite dessa comparação.
3. Descreva um caso real em que o conceito melhora a qualidade do software.
4. Analise o principal modo de falha: ${lesson.engineering.failureMode}
5. Proponha três testes para a micromissão desta aula.

### 3 estudos de caso

1. **Sistema educacional:** aplique o conceito ao progresso de um estudante e defina entradas, saída e falhas.
2. **Revisão de código:** encontre riscos no exemplo se ele recebesse dados externos não validados.
3. **Produção:** proponha logs, testes e critérios de aceite para publicar a solução.

## Gabarito comentado

### Questões objetivas

${answers}

### Orientação para questões abertas

Respostas adequadas devem definir o conceito com palavras próprias, relacionar teoria e prática, explicitar contratos, apresentar pelo menos um caso inválido e justificar as decisões. Nos estudos de caso, avalie segurança, clareza, possibilidade de teste e comportamento em falhas.

## Desafio prático

${lesson.mission}

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.
`;
};

await fs.rm(output, { recursive: true, force: true });

let globalLesson = 0;
const allLessonDocs = [];
const indexRows = [];
const progress = [];

for (const [moduleIndex, courseModule] of modules.entries()) {
  const moduleFolder = `Modulo${slugNumber(moduleIndex + 1)}`;
  let previousReview =
    moduleIndex === 0
      ? "Você não precisa conhecer programação. Basta saber usar o navegador, criar arquivos e seguir instruções passo a passo."
      : `Revise as ideias essenciais do módulo anterior: contratos explícitos, nomes claros, validação e testes de casos normais, limites e falhas.`;

  for (const lesson of courseModule.lessons) {
    globalLesson += 1;
    const file = `Aula${slugNumber(globalLesson)}.md`;
    const content = lessonMarkdown(
      lesson,
      globalLesson,
      courseModule.title,
      previousReview,
    );
    await write(path.join(moduleFolder, file), content);
    allLessonDocs.push(content);
    indexRows.push(
      `| ${globalLesson} | ${courseModule.title} | ${lesson.title} | ${lesson.difficulty} | ${lesson.duration} min |`,
    );
    progress.push({ id: lesson.id, lesson: globalLesson, processed: true });
    previousReview = `Na aula anterior você estudou **${lesson.title}**. Recorde o contrato, o exemplo e o principal erro antes de avançar.`;
  }
}

const allLessons = modules.flatMap((item) => item.lessons);
const examQuestions = Array.from({ length: 100 }, (_, index) => {
  const lesson = allLessons[index % allLessons.length];
  const q = objectiveQuestions(lesson)[index % 10];
  return { number: index + 1, lesson, ...q };
});

await write(
  "Indice.md",
  `# Índice completo

| Aula | Módulo | Tema | Nível | Duração |
|---:|---|---|---|---:|
${indexRows.join("\n")}
`,
);

await write(
  "GuiaDoAluno.md",
  `# Guia do aluno

## Como estudar

1. Leia a aula sem copiar código.
2. Reescreva a definição principal com suas palavras.
3. Execute o exemplo e altere uma entrada por vez.
4. Resolva os exercícios antes de consultar o gabarito.
5. Faça o desafio e registre dúvidas e decisões.
6. Só avance após explicar o conceito sem consultar a aula.

## Ritmo recomendado

Estude cinco dias por semana, entre 45 e 90 minutos. Use um dia para revisão e outro para descanso. Erros fazem parte do processo: leia a mensagem, isole o menor exemplo e teste uma hipótese por vez.
`,
);

await write(
  "Cronograma.md",
  `# Cronograma de estudos

| Semana | Conteúdo | Entrega |
|---:|---|---|
${modules
  .map(
    (item, index) =>
      `| ${index + 1} | ${item.title}: ${item.lessons.map((lesson) => lesson.title).join(", ")} | Exercícios e desafios do módulo |`,
  )
  .join("\n")}
| ${modules.length + 1} | Revisão integrada | Simulado final |
| ${modules.length + 2} | Construção e revisão | Projeto final publicado |
`,
);

await write(
  path.join("ProjetoFinal", "ProjetoFinal.md"),
  `# Projeto final — Plataforma pessoal de aprendizagem

Construa uma aplicação web que permita cadastrar trilhas, aulas e progresso.

## Requisitos

- Interface responsiva e acessível.
- Validação de formulários e mensagens por campo.
- Estado vazio, carregamento, sucesso e erro.
- Persistência local ou API real documentada.
- Filtros, ordenação e cálculo de progresso.
- Código modular, tratamento de falhas e testes.

## Entregáveis

1. Repositório organizado.
2. README com execução e decisões.
3. Aplicação publicada.
4. Evidências de testes.
5. Relatório de limitações.

## Critérios de avaliação

Correção 30%, clareza 20%, experiência 15%, acessibilidade 10%, testes 15% e documentação 10%.
`,
);

await write(
  path.join("Simulados", "SimuladoFinal.md"),
  `# Simulado final — 100 questões

${examQuestions
  .map(
    (item) =>
      `${item.number}. **${item.lesson.title}:** ${item.q}\n${item.options
        .map((option, optionIndex) => `   - ${String.fromCharCode(65 + optionIndex)}) ${clean(option)}`)
        .join("\n")}`,
  )
  .join("\n\n")}
`,
);

await write(
  path.join("Simulados", "GabaritoCompleto.md"),
  `# Gabarito completo do simulado

${examQuestions
  .map(
    (item) =>
      `${item.number}. **${String.fromCharCode(65 + item.answer)}.** ${clean(item.explanation)}`,
  )
  .join("\n")}
`,
);

await write(
  path.join("Exercicios", "BancoDeExercicios.md"),
  `# Banco de exercícios

O curso contém **240 questões objetivas, 120 questões dissertativas, 72 estudos de caso e 24 desafios práticos**, todos distribuídos nas aulas. Resolva primeiro nos arquivos de cada módulo e use este banco como checklist.

${allLessons.map((lesson, index) => `- [ ] Aula ${index + 1}: ${lesson.title}`).join("\n")}
`,
);

await write(
  "Glossario.md",
  `# Glossário geral

- **Algoritmo:** sequência finita de passos para resolver um problema.
- **API:** contrato usado por programas para trocar dados e solicitar operações.
- **Código-fonte:** texto escrito pelo programador.
- **Compilação:** transformação ou preparação do código para execução.
- **DOM:** representação em árvore de uma página HTML.
- **Estado:** dados que descrevem a situação atual do programa.
- **Função:** unidade reutilizável de comportamento.
- **HTTP:** protocolo de comunicação usado na web.
- **Imutabilidade:** prática de criar um novo estado sem alterar o anterior.
- **Runtime:** ambiente responsável por executar o código.
- **Sintaxe:** regras de escrita de uma linguagem.
- **Validação:** confirmação de que dados respeitam regras definidas.
`,
);

await write(
  "ChecklistCompetencias.md",
  `# Checklist de competências

${allLessons.map((lesson) => `- [ ] Explico e aplico ${lesson.title}.`).join("\n")}
- [ ] Valido entradas e comunico falhas.
- [ ] Escrevo testes para caso normal, fronteira e erro.
- [ ] Organizo código em módulos com contratos claros.
- [ ] Publico e documento uma aplicação completa.
`,
);

await write(
  "FAQ.md",
  `# Perguntas frequentes

## Preciso memorizar tudo?
Não. Entenda o mecanismo, pratique e saiba consultar documentação.

## Posso avançar com exercícios pendentes?
Revise primeiro os conceitos que impedem explicar ou executar o desafio.

## O que fazer quando o código não funciona?
Leia o erro, reduza o problema, confirme entradas e teste uma hipótese por vez.

## Quando estou pronto para o projeto final?
Quando consegue combinar funções, dados, DOM, assincronismo, validação e testes.
`,
);

await write(
  "Bibliografia.md",
  `# Bibliografia e recursos complementares

- MDN Web Docs — JavaScript, DOM, HTTP e acessibilidade.
- ECMAScript Language Specification — referência normativa da linguagem.
- web.dev — desempenho, acessibilidade e boas práticas para a web.
- OWASP Cheat Sheet Series — segurança de aplicações.
- Documentação do Node.js — runtime, módulos e APIs do servidor.

Use documentação primária para confirmar comportamento que possa mudar entre versões.
`,
);

await write(
  "ResumoGeral.md",
  `# Resumo geral do curso

O curso começa por valores, decisões e repetições; evolui para funções, coleções e objetos; conecta JavaScript ao DOM; introduz assincronismo, APIs e módulos; e termina com arquitetura, projetos e publicação. A progressão transforma sintaxe em capacidade de construir, testar e explicar produtos reais.
`,
);

await write(
  "CursoCompleto.md",
  `# NexaCode AI — Curso completo de JavaScript

${(await fs.readFile(path.join(output, "Indice.md"), "utf8")).trim()}

${allLessonDocs.join("\n\n---\n\n")}
`,
);

await write(
  "progresso.json",
  JSON.stringify(
    {
      source: "Conteúdo original do NexaCode AI",
      generatedAt: new Date().toISOString(),
      totalLessons: progress.length,
      lessons: progress,
    },
    null,
    2,
  ),
);

console.log(`Curso escrito gerado: ${progress.length} aulas, 100 questões finais.`);
