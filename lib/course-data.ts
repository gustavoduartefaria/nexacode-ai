import { cppModules, programmingLanguages, pythonModules } from "./multilanguage-data";
import type {
  CourseModule,
  Difficulty,
  LanguageId,
  Lesson,
  ProgrammingLanguage,
} from "./course-types";

export type {
  CourseModule,
  Difficulty,
  LanguageId,
  Lesson,
  LessonVideoReference,
  ProgrammingLanguage,
} from "./course-types";

const cursoEmVideoPlaylist =
  "https://www.youtube.com/playlist?list=PLHz_AreHm4dlsK3Nr9GVvXCbpQyHQl1o1";

const javascriptVideoCoverage: Record<string, string> = {
  variaveis: "Módulo B · variáveis, identificadores e atribuição de valores.",
  tipos: "Módulo B · tipos primitivos, conversão e tratamento de dados.",
  operadores: "Módulo B · operadores aritméticos, relacionais e lógicos.",
  condicionais: "Módulo D · condições simples, compostas e aninhadas.",
  loops: "Módulo E · repetições com while, do...while e for.",
  erros: "Base consolidada da playlist, ampliada pelo NexaCode com validação e tratamento de falhas.",
  "funcoes-base": "Módulo F · funções, parâmetros, retorno e decomposição de problemas.",
  "arrow-functions": "Fundamentos de funções da playlist, estendidos para a sintaxe moderna de arrow functions.",
  "escopo-closures": "Fundamentos de variáveis e funções, aprofundados com escopo léxico e closures.",
  arrays: "Módulo F · variáveis compostas e operações fundamentais com arrays.",
  "metodos-array": "Base de arrays da playlist, ampliada com map, filter e reduce.",
  objetos: "Objetos apresentados na base de JavaScript, aprofundados com desestruturação e contratos.",
  "dom-selecao": "Módulo C · introdução ao DOM e seleção de elementos da página.",
  eventos: "Módulo C · eventos, interação e manipulação do DOM.",
  formularios: "DOM e eventos aplicados a formulários com validação e estados de erro.",
  promises: "Extensão NexaCode após a base da playlist: concorrência e estados assíncronos.",
  "async-await": "Extensão NexaCode após a base da playlist: composição assíncrona com async/await.",
  fetch: "Extensão NexaCode após a base da playlist: HTTP, APIs e tratamento de respostas.",
  modulos: "Organização profissional do código após consolidar os fundamentos da playlist.",
  classes: "Objetos e funções evoluídos para modelagem com classes e responsabilidades explícitas.",
  imutabilidade: "Arrays e objetos aprofundados com atualização previsível de estado.",
  "projeto-tarefas": "Aplicação prática dos módulos de DOM, eventos, condições, arrays e funções.",
  "projeto-api": "Projeto avançado que acrescenta APIs e assincronismo à base da playlist.",
  "projeto-final": "Síntese da formação: fundamentos da playlist e engenharia de produto do NexaCode.",
};

const lesson = (
  id: string,
  title: string,
  summary: string,
  duration: number,
  difficulty: Difficulty,
  theory: string,
  analogy: string,
  code: string,
  mission: string,
  question: string,
  options: string[],
  answer: number,
  explanation: string,
): Lesson => {
  const prerequisites =
    difficulty === "Iniciante"
      ? ["Leitura básica de código", "Uso do console do navegador"]
      : difficulty === "Intermediário"
        ? ["Domínio dos fundamentos de JavaScript", "Funções, escopo e estruturas de dados"]
        : ["JavaScript assíncrono", "Testes automatizados e organização modular"];
  return {
    id,
    title,
    summary,
    duration,
    difficulty,
    theory,
    analogy,
    code,
    mission,
    objectives: [
      `Explicar ${title.toLocaleLowerCase("pt-BR")} usando o modelo de execução do JavaScript.`,
      "Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.",
      "Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.",
    ],
    prerequisites,
    engineering: {
      productionContext:
        "Em produção, este conceito deve ficar isolado em uma unidade pequena, observável e com responsabilidade única. Prefira APIs explícitas a efeitos colaterais ocultos.",
      failureMode:
        "Os defeitos mais comuns surgem de coerção implícita, estado compartilhado, valores ausentes e caminhos de erro não tratados. Modele esses casos antes do caminho feliz.",
      verification:
        "Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.",
      performance:
        difficulty === "Avançado"
          ? "Analise custo de tempo e memória, identifique alocações e evite trabalho repetido em loops ou renderizações. Meça antes de otimizar."
          : "Priorize correção e legibilidade; depois observe quantas vezes cada operação é executada e quais dados permanecem em memória.",
    },
    videoReference: {
      title: "Curso de JavaScript",
      creator: "Curso em Vídeo · Prof. Gustavo Guanabara",
      url: cursoEmVideoPlaylist,
      coverage:
        javascriptVideoCoverage[id] ??
        "Referência audiovisual para revisar os fundamentos relacionados a esta aula.",
      note:
        "Material externo complementar. A explicação, o código, a micromissão e o checkpoint desta aula são conteúdos próprios do NexaCode AI.",
    },
    quiz: { question, options, answer, explanation },
  };
};

export const javascriptModules: CourseModule[] = [
  {
    id: "fundamentos",
    language: "javascript",
    number: "01",
    title: "Fundamentos",
    subtitle: "A base sólida para pensar como programador",
    color: "#57f2cc",
    icon: "{ }",
    lessons: [
      lesson(
        "variaveis",
        "Variáveis: let e const",
        "Aprenda a guardar informações com nomes claros.",
        12,
        "Iniciante",
        "Variáveis são referências para valores. Use const quando a referência não será trocada e let quando ela precisa mudar. Prefira nomes que expliquem a intenção do dado.",
        "Imagine etiquetas coladas em caixas. A etiqueta é o nome da variável; o conteúdo da caixa é o valor.",
        `const nome = "Lia";
let pontos = 10;

pontos = pontos + 5;
console.log(\`\${nome} tem \${pontos} pontos\`);`,
        "Crie uma constante chamada linguagem e uma variável chamada nivel. Depois, aumente o nível em 1 e mostre uma frase no console.",
        "Qual declaração você deve preferir quando a referência não muda?",
        ["var", "let", "const", "static"],
        2,
        "const comunica que a referência não será reatribuída e deixa a intenção do código mais clara.",
      ),
      lesson(
        "tipos",
        "Tipos e valores",
        "Strings, números, booleanos e o poder de typeof.",
        14,
        "Iniciante",
        "JavaScript possui tipos primitivos como string, number, boolean, undefined, bigint e symbol. null representa intencionalmente a ausência de valor. typeof ajuda a investigar o tipo durante o aprendizado.",
        "Tipos são como formatos de peças: cada formato combina melhor com certas operações.",
        `const curso = "JavaScript";
const aulas = 24;
const ativo = true;

console.log(typeof curso);
console.log(typeof aulas);
console.log(typeof ativo);`,
        "Declare uma string, um número e um booleano sobre você. Mostre o valor e o tipo de cada um.",
        "Qual é o resultado de typeof 42?",
        ['"integer"', '"number"', '"float"', '"numeric"'],
        1,
        "Em JavaScript, inteiros e números decimais pertencem ao tipo number.",
      ),
      lesson(
        "operadores",
        "Operadores sem mistério",
        "Cálculos, comparações e decisões booleanas.",
        16,
        "Iniciante",
        "Operadores aritméticos calculam, operadores de comparação produzem true ou false e operadores lógicos combinam condições. Prefira === e !== para evitar conversões implícitas inesperadas.",
        "Operadores são verbos: somar, comparar, negar e combinar informações.",
        `const idade = 19;
const temIngresso = true;
const podeEntrar = idade >= 18 && temIngresso;

console.log("Entrada liberada?", podeEntrar);`,
        "Crie uma condição que seja verdadeira apenas quando uma pessoa tiver pelo menos 18 anos e um documento válido.",
        "Qual operador exige igualdade de valor e tipo?",
        ["==", "=", "===", "=>"],
        2,
        "=== compara valor e tipo, evitando coerções silenciosas.",
      ),
    ],
  },
  {
    id: "logica",
    language: "javascript",
    number: "02",
    title: "Lógica & Fluxo",
    subtitle: "Transforme regras em decisões claras",
    color: "#8b7cff",
    icon: "01",
    lessons: [
      lesson(
        "condicionais",
        "if, else e decisões",
        "Faça o programa escolher caminhos.",
        17,
        "Iniciante",
        "Uma condicional executa blocos diferentes conforme uma expressão booleana. Organize primeiro o caso principal e evite aninhamentos profundos usando retornos antecipados em funções.",
        "É como uma bifurcação: a condição decide qual estrada o programa seguirá.",
        `const nota = 8.4;

if (nota >= 7) {
  console.log("Aprovado");
} else if (nota >= 5) {
  console.log("Recuperação");
} else {
  console.log("Revisar conteúdo");
}`,
        "Classifique uma temperatura como fria, agradável ou quente usando if, else if e else.",
        "Quando o bloco else é executado?",
        [
          "Sempre",
          "Quando a primeira condição é verdadeira",
          "Quando nenhuma condição anterior é verdadeira",
          "Somente quando existe erro",
        ],
        2,
        "else representa o caminho alternativo quando as condições anteriores falham.",
      ),
      lesson(
        "loops",
        "Loops com propósito",
        "Repita tarefas sem repetir código.",
        20,
        "Iniciante",
        "Loops percorrem sequências ou repetem uma ação. Use for...of para valores iteráveis e métodos de array quando a intenção for transformar ou filtrar dados.",
        "Um loop é uma esteira: cada item passa pela mesma estação de trabalho.",
        `const tecnologias = ["HTML", "CSS", "JavaScript"];

for (const tecnologia of tecnologias) {
  console.log(\`Estudando \${tecnologia}\`);
}`,
        "Percorra uma lista de três metas e imprima cada uma com sua posição.",
        "Qual loop é direto para percorrer os valores de um array?",
        ["for...of", "switch", "if...else", "try...catch"],
        0,
        "for...of percorre diretamente os valores de objetos iteráveis, como arrays.",
      ),
      lesson(
        "erros",
        "Erros que ensinam",
        "Leia mensagens e trate falhas previsíveis.",
        18,
        "Intermediário",
        "Erros possuem nome, mensagem e pilha. try/catch deve tratar falhas esperadas em pontos específicos; ele não substitui validação nem deve esconder problemas sem registrar contexto.",
        "Uma mensagem de erro é um mapa do local do acidente, não um inimigo.",
        `function dividir(a, b) {
  if (b === 0) throw new Error("Divisor não pode ser zero");
  return a / b;
}

try {
  console.log(dividir(10, 0));
} catch (erro) {
  console.error(erro.message);
}`,
        "Crie uma função que rejeite idades negativas com uma mensagem clara.",
        "Qual bloco recebe um erro lançado dentro do try?",
        ["else", "finally", "catch", "switch"],
        2,
        "catch recebe o erro e permite responder de forma controlada.",
      ),
    ],
  },
  {
    id: "funcoes",
    language: "javascript",
    number: "03",
    title: "Funções",
    subtitle: "Código reutilizável, pequeno e expressivo",
    color: "#ff78bf",
    icon: "ƒ",
    lessons: [
      lesson(
        "funcoes-base",
        "Funções e retorno",
        "Empacote uma regra e reutilize-a.",
        18,
        "Iniciante",
        "Funções recebem entradas, executam uma responsabilidade e podem devolver um resultado com return. Uma boa função é pequena, possui nome descritivo e evita depender de estado externo.",
        "Uma função é uma máquina: recebe matéria-prima, trabalha e entrega um produto.",
        `function calcularDesconto(preco, percentual) {
  const desconto = preco * (percentual / 100);
  return preco - desconto;
}

console.log(calcularDesconto(200, 15));`,
        "Crie uma função calcularMedia que receba três notas e retorne a média.",
        "O que return faz?",
        [
          "Repete a função",
          "Encerra a função e devolve um valor",
          "Imprime automaticamente",
          "Cria uma variável global",
        ],
        1,
        "return encerra a execução daquela função e entrega o resultado ao chamador.",
      ),
      lesson(
        "arrow-functions",
        "Arrow functions",
        "Sintaxe moderna e callbacks mais legíveis.",
        15,
        "Intermediário",
        "Arrow functions oferecem sintaxe curta e não criam o próprio this. São excelentes para callbacks, mas funções nomeadas ainda podem comunicar melhor a intenção em regras importantes.",
        "É um atalho de escrita, não um tipo totalmente diferente de cálculo.",
        `const dobrar = numero => numero * 2;
const numeros = [2, 4, 6];
const dobrados = numeros.map(dobrar);

console.log(dobrados);`,
        "Crie uma arrow function que transforme um nome em uma saudação.",
        "Uma arrow function cria seu próprio this?",
        ["Sim, sempre", "Não", "Somente com async", "Somente sem parâmetros"],
        1,
        "Arrow functions capturam o this do contexto em que foram criadas.",
      ),
      lesson(
        "escopo-closures",
        "Escopo e closures",
        "Entenda onde os dados vivem.",
        24,
        "Intermediário",
        "Escopo determina onde uma variável pode ser acessada. Uma closure acontece quando uma função mantém acesso ao ambiente em que nasceu, mesmo após a função externa terminar.",
        "Closure é como uma mochila: a função leva consigo os dados do lugar onde foi criada.",
        `function criarContador() {
  let valor = 0;
  return () => ++valor;
}

const proximo = criarContador();
console.log(proximo());
console.log(proximo());`,
        "Crie uma função criarSaudacao que memorize um cumprimento e retorne outra função para receber o nome.",
        "O que uma closure preserva?",
        [
          "A tela do navegador",
          "O acesso ao escopo léxico",
          "Somente constantes globais",
          "O histórico do console",
        ],
        1,
        "A função interna preserva acesso às variáveis do escopo onde foi criada.",
      ),
    ],
  },
  {
    id: "dados",
    language: "javascript",
    number: "04",
    title: "Dados",
    subtitle: "Arrays e objetos trabalhando juntos",
    color: "#ffd166",
    icon: "[ ]",
    lessons: [
      lesson(
        "arrays",
        "Arrays na prática",
        "Organize coleções e acesse cada item.",
        18,
        "Iniciante",
        "Arrays armazenam listas ordenadas. Seus índices começam em zero. push adiciona no fim, includes verifica presença e length informa o tamanho.",
        "Um array é uma prateleira numerada, começando na posição zero.",
        `const tarefas = ["Estudar", "Praticar"];
tarefas.push("Revisar");

console.log(tarefas[0]);
console.log(tarefas.length);`,
        "Monte uma lista de tecnologias, adicione uma nova e mostre a primeira e a última.",
        "Qual é o índice do primeiro item?",
        ["1", "-1", "0", "first"],
        2,
        "Os índices de arrays em JavaScript começam em zero.",
      ),
      lesson(
        "metodos-array",
        "map, filter e reduce",
        "Transforme dados com intenção.",
        26,
        "Intermediário",
        "map transforma cada item, filter mantém itens que passam por uma condição e reduce combina toda a coleção em um único resultado. Esses métodos não precisam alterar o array original.",
        "map é uma linha de montagem; filter é uma peneira; reduce é um resumo.",
        `const valores = [20, 35, 10];
const comTaxa = valores.map(valor => valor * 1.1);
const maiores = comTaxa.filter(valor => valor > 25);
const total = maiores.reduce((soma, valor) => soma + valor, 0);

console.log(total);`,
        "Filtre notas aprovadas, some-as e calcule a média usando métodos de array.",
        "Qual método produz um novo array com cada item transformado?",
        ["filter", "map", "find", "reduce"],
        1,
        "map aplica uma transformação a cada item e devolve um novo array.",
      ),
      lesson(
        "objetos",
        "Objetos e desestruturação",
        "Modele entidades com propriedades.",
        22,
        "Intermediário",
        "Objetos agrupam valores relacionados por chaves. A desestruturação extrai propriedades de forma declarativa, e o spread cria cópias rasas com alterações pontuais.",
        "Um objeto é uma ficha organizada: cada campo possui um nome e um valor.",
        `const aluno = {
  nome: "Caio",
  nivel: 3,
  ativo: true
};

const { nome, nivel } = aluno;
const atualizado = { ...aluno, nivel: nivel + 1 };
console.log(nome, atualizado);`,
        "Modele um produto e crie uma cópia com o preço atualizado sem alterar o original.",
        "O que o spread {...objeto} cria?",
        [
          "Uma cópia rasa das propriedades",
          "Uma classe",
          "Um array vazio",
          "Uma cópia profunda automática",
        ],
        0,
        "O spread copia as propriedades de primeiro nível para um novo objeto.",
      ),
    ],
  },
  {
    id: "dom",
    language: "javascript",
    number: "05",
    title: "DOM & Interface",
    subtitle: "Dê vida às páginas da web",
    color: "#5ab5ff",
    icon: "</>",
    lessons: [
      lesson(
        "dom-selecao",
        "Selecionando elementos",
        "Conecte JavaScript ao HTML.",
        20,
        "Intermediário",
        "O DOM representa o documento como uma árvore de objetos. querySelector encontra o primeiro elemento compatível com um seletor CSS e permite ler ou alterar seu conteúdo.",
        "O DOM é um mapa vivo da página; seletores apontam para endereços nesse mapa.",
        `const titulo = document.querySelector("#titulo");

if (titulo) {
  titulo.textContent = "JavaScript em ação";
  titulo.classList.add("destaque");
}`,
        "Selecione um parágrafo por classe e troque seu texto com segurança.",
        "Qual método aceita seletores CSS e retorna o primeiro elemento?",
        ["getElement", "querySelector", "findNode", "selectOne"],
        1,
        "querySelector usa a mesma linguagem de seletores do CSS.",
      ),
      lesson(
        "eventos",
        "Eventos e interação",
        "Responda a cliques, digitação e envio.",
        23,
        "Intermediário",
        "addEventListener registra uma função para responder a um evento. O objeto event contém contexto sobre o que aconteceu e event.target aponta para o elemento que originou a interação.",
        "Eventos são campainhas: o código escolhe quem escuta e como responder.",
        `const botao = document.querySelector("#salvar");

botao?.addEventListener("click", () => {
  console.log("Dados salvos!");
});`,
        "Crie um botão contador que atualize um número na tela a cada clique.",
        "Qual método registra um ouvinte de evento?",
        ["onEvent", "listen", "addEventListener", "watch"],
        2,
        "addEventListener conecta um tipo de evento a uma função de resposta.",
      ),
      lesson(
        "formularios",
        "Formulários confiáveis",
        "Capture, valide e transforme entradas.",
        25,
        "Intermediário",
        "No evento submit, preventDefault evita o envio tradicional. FormData facilita a leitura dos campos. Valide perto da entrada e mostre mensagens específicas, sem culpar o usuário.",
        "Um formulário é uma conversa: cada pergunta precisa de uma resposta clara e de feedback útil.",
        `formulario.addEventListener("submit", evento => {
  evento.preventDefault();
  const dados = new FormData(evento.currentTarget);
  const email = String(dados.get("email") ?? "").trim();

  if (!email.includes("@")) {
    console.log("Informe um e-mail válido");
  }
});`,
        "Valide nome e e-mail, exibindo mensagens diferentes para cada problema.",
        "Por que usar preventDefault no submit durante uma interface dinâmica?",
        [
          "Para apagar o formulário",
          "Para impedir o envio/recarregamento padrão",
          "Para esconder o botão",
          "Para criar o FormData",
        ],
        1,
        "preventDefault impede a ação padrão e deixa o código controlar o fluxo.",
      ),
    ],
  },
  {
    id: "assincrono",
    language: "javascript",
    number: "06",
    title: "Assíncrono",
    subtitle: "Promessas, APIs e dados do mundo real",
    color: "#ff8a65",
    icon: "↯",
    lessons: [
      lesson(
        "promises",
        "Entendendo Promises",
        "Modele resultados que chegam no futuro.",
        24,
        "Intermediário",
        "Uma Promise representa uma operação pendente que será cumprida ou rejeitada. then trata sucesso, catch trata falha e finally executa ao final em ambos os casos.",
        "É como um protocolo de entrega: o pedido está pendente, chega ou falha, e você é avisado.",
        `const espera = new Promise(resolve => {
  setTimeout(() => resolve("Concluído"), 500);
});

espera
  .then(resultado => console.log(resultado))
  .catch(erro => console.error(erro));`,
        "Crie uma Promise que resolva uma mensagem após um pequeno intervalo.",
        "Quais estados finais uma Promise pode ter?",
        [
          "Ativa ou parada",
          "Cumprida ou rejeitada",
          "Aberta ou fechada",
          "True ou false",
        ],
        1,
        "Após pendente, uma Promise termina cumprida ou rejeitada.",
      ),
      lesson(
        "async-await",
        "async e await",
        "Leia código assíncrono como uma sequência.",
        23,
        "Intermediário",
        "Uma função async sempre retorna uma Promise. await pausa apenas aquela função até a Promise terminar. Use try/catch para tratar falhas e finally para restaurar estados de carregamento.",
        "await é uma pausa organizada na sua fila, não uma trava em todo o programa.",
        `async function carregarPerfil() {
  try {
    const perfil = await buscarPerfil();
    console.log(perfil);
  } catch (erro) {
    console.error("Não foi possível carregar", erro);
  }
}`,
        "Reescreva uma cadeia .then/.catch usando async, await e try/catch.",
        "O que uma função async retorna?",
        ["Sempre undefined", "Uma Promise", "Um evento", "Um array"],
        1,
        "Mesmo ao retornar um valor simples, async o envolve em uma Promise.",
      ),
      lesson(
        "fetch",
        "Consumindo APIs",
        "Busque JSON e trate respostas corretamente.",
        28,
        "Intermediário",
        "fetch resolve mesmo em respostas HTTP como 404. Verifique response.ok, converta o corpo com json e diferencie erro de rede de erro da resposta.",
        "Uma API é um balcão de atendimento com pedidos e respostas padronizadas.",
        `async function buscarUsuario() {
  const resposta = await fetch("https://api.exemplo.dev/usuario");
  if (!resposta.ok) {
    throw new Error(\`HTTP \${resposta.status}\`);
  }
  return resposta.json();
}`,
        "Crie uma função para buscar uma lista e retornar um array vazio em uma resposta sem conteúdo.",
        "fetch rejeita automaticamente toda resposta 404?",
        ["Sim", "Não", "Somente com POST", "Somente em localhost"],
        1,
        "fetch rejeita erros de rede; para erros HTTP, você deve verificar response.ok.",
      ),
    ],
  },
  {
    id: "moderno",
    language: "javascript",
    number: "07",
    title: "JavaScript Moderno",
    subtitle: "Código escalável e fácil de manter",
    color: "#c0ff57",
    icon: "ES",
    lessons: [
      lesson(
        "modulos",
        "Módulos",
        "Separe responsabilidades com import e export.",
        20,
        "Intermediário",
        "Módulos permitem dividir o sistema em arquivos com responsabilidades claras. Exporte apenas o necessário e prefira dependências explícitas.",
        "Módulos são peças de LEGO: cada peça resolve algo e se conecta por encaixes definidos.",
        `// matematica.js
export const somar = (a, b) => a + b;

// app.js
import { somar } from "./matematica.js";
console.log(somar(2, 3));`,
        "Separe uma função de formatação em um módulo e importe-a no arquivo principal.",
        "Qual palavra importa um valor exportado?",
        ["include", "requirement", "import", "using"],
        2,
        "import declara a dependência entre módulos JavaScript.",
      ),
      lesson(
        "classes",
        "Classes com propósito",
        "Modele comportamento sem criar hierarquias desnecessárias.",
        25,
        "Avançado",
        "Classes são uma sintaxe para criar objetos com estrutura e comportamento compartilhados. Prefira composição quando heranças profundas tornarem o sistema difícil de entender.",
        "Uma classe é uma planta de construção; cada instância é uma casa construída a partir dela.",
        `class Conta {
  #saldo = 0;

  depositar(valor) {
    if (valor > 0) this.#saldo += valor;
  }

  consultarSaldo() {
    return this.#saldo;
  }
}`,
        "Crie uma classe Tarefa que controle título e estado de conclusão.",
        "O que o prefixo # representa em um campo de classe?",
        ["Campo global", "Campo privado", "Comentário", "ID do objeto"],
        1,
        "Campos com # são privados à classe e não podem ser acessados diretamente de fora.",
      ),
      lesson(
        "imutabilidade",
        "Imutabilidade prática",
        "Atualize dados sem efeitos colaterais escondidos.",
        22,
        "Avançado",
        "Imutabilidade significa criar novos valores em vez de alterar estruturas compartilhadas. Isso facilita rastrear mudanças, testar regras e evitar efeitos colaterais.",
        "É como editar uma cópia do documento em vez de rabiscar o original de todos.",
        `const usuario = { nome: "Bia", pontos: 10 };
const atualizado = {
  ...usuario,
  pontos: usuario.pontos + 5
};

console.log(usuario.pontos, atualizado.pontos);`,
        "Atualize um item específico de um array de objetos sem alterar o array original.",
        "Qual operação preserva o objeto original?",
        [
          "objeto.valor++",
          "delete objeto.valor",
          "{ ...objeto, valor: novoValor }",
          "objeto.valor = novoValor",
        ],
        2,
        "O spread cria um novo objeto e a propriedade posterior substitui o valor copiado.",
      ),
    ],
  },
  {
    id: "projetos",
    language: "javascript",
    number: "08",
    title: "Projetos Reais",
    subtitle: "Transforme conhecimento em portfólio",
    color: "#ffffff",
    icon: "🚀",
    lessons: [
      lesson(
        "projeto-tarefas",
        "Projeto: Task Flow",
        "CRUD, filtros e persistência local.",
        45,
        "Intermediário",
        "Construa primeiro o modelo de dados, depois as funções puras e só então conecte a interface. Separe criar, atualizar, remover, filtrar e persistir tarefas.",
        "Um projeto forte nasce por camadas: dados, regras e interface.",
        `const estado = { tarefas: [] };

function adicionarTarefa(titulo) {
  const tarefa = {
    id: crypto.randomUUID(),
    titulo,
    concluida: false
  };
  estado.tarefas = [...estado.tarefas, tarefa];
}`,
        "Implemente adicionar, concluir, excluir, filtrar e salvar tarefas no localStorage.",
        "Qual etapa deve vir antes de estilizar a lista?",
        [
          "Escolher animações",
          "Definir dados e regras",
          "Publicar o projeto",
          "Criar um logotipo",
        ],
        1,
        "Definir o modelo e as regras primeiro reduz retrabalho na interface.",
      ),
      lesson(
        "projeto-api",
        "Projeto: Data Pulse",
        "Dashboard consumindo uma API.",
        55,
        "Avançado",
        "Modele os estados de uma busca: ocioso, carregando, sucesso, vazio e erro. Uma interface robusta não considera apenas o caminho feliz.",
        "Uma boa tela conta toda a jornada do dado, inclusive quando ele demora ou falha.",
        `const estado = {
  status: "idle",
  dados: [],
  erro: null
};

async function carregar() {
  estado.status = "loading";
  // buscar, validar, transformar e renderizar
}`,
        "Crie um dashboard que busque dados, mostre carregamento, trate falha e permita tentar novamente.",
        "Qual estado evita uma tela vazia enquanto os dados chegam?",
        ["loading", "success", "deleted", "cached"],
        0,
        "O estado loading comunica que a operação está em andamento.",
      ),
      lesson(
        "projeto-final",
        "Projeto final: Dev Portfolio",
        "Seu produto completo, acessível e publicável.",
        70,
        "Avançado",
        "Planeje conteúdo, componentes, estados, acessibilidade, responsividade e publicação. Um portfólio deve explicar decisões e resultados, não apenas exibir screenshots.",
        "Seu projeto final é uma narrativa: problema, processo, solução e aprendizado.",
        `const projeto = {
  problema: "O que precisa ser resolvido?",
  decisao: "Por que esta abordagem?",
  resultado: "O que passou a funcionar?",
  aprendizado: "O que eu faria melhor?"
};`,
        "Construa um portfólio responsivo com projetos, estudo de caso, contato e documentação das decisões.",
        "O que mais diferencia um bom estudo de caso?",
        [
          "Muitas cores",
          "Explicar problema, decisões e resultado",
          "Usar apenas imagens",
          "Esconder dificuldades",
        ],
        1,
        "Decisões bem explicadas demonstram raciocínio, não apenas acabamento visual.",
      ),
    ],
  },
];

export const languages: ProgrammingLanguage[] = programmingLanguages;

export const courseModules: CourseModule[] = [
  ...javascriptModules,
  ...pythonModules,
  ...cppModules,
];

export const modulesByLanguage: Record<LanguageId, CourseModule[]> = {
  javascript: javascriptModules,
  python: pythonModules,
  cpp: cppModules,
};

export type Challenge = {
  id: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  xp: number;
  description: string;
  starter: string;
  hint: string;
  validate: (output: string, code: string) => boolean;
  expected: string;
};

export const challenges: Challenge[] = [
  {
    id: "saudacao",
    title: "Saudação personalizada",
    category: "Variáveis",
    difficulty: "Iniciante",
    xp: 40,
    description: 'Crie uma constante nome e mostre exatamente: "Olá, Ada!"',
    starter: `// Crie sua constante abaixo\n\nconsole.log();`,
    hint: 'Use const nome = "Ada" e uma template string com crase.',
    validate: (output) => output.trim() === "Olá, Ada!",
    expected: "Olá, Ada!",
  },
  {
    id: "par-ou-impar",
    title: "Par ou ímpar",
    category: "Lógica",
    difficulty: "Iniciante",
    xp: 55,
    description: "Dado o número 17, mostre no console se ele é par ou ímpar.",
    starter: `const numero = 17;\n\n// Sua condição aqui`,
    hint: "O resto da divisão por 2 pode ser obtido com o operador %.",
    validate: (output) => output.trim().toLowerCase() === "ímpar",
    expected: "ímpar",
  },
  {
    id: "soma-array",
    title: "Somando uma coleção",
    category: "Arrays",
    difficulty: "Intermediário",
    xp: 80,
    description: "Some [12, 8, 20, 10] e mostre 50 no console.",
    starter: `const valores = [12, 8, 20, 10];\n\n// Calcule e mostre o total`,
    hint: "reduce pode acumular cada valor começando em zero.",
    validate: (output) => output.trim() === "50",
    expected: "50",
  },
  {
    id: "nomes-ativos",
    title: "Usuários ativos",
    category: "Objetos",
    difficulty: "Intermediário",
    xp: 95,
    description: "Filtre os usuários ativos e mostre seus nomes separados por vírgula.",
    starter: `const usuarios = [
  { nome: "Lia", ativo: true },
  { nome: "Rui", ativo: false },
  { nome: "Bia", ativo: true }
];

// Resultado esperado: Lia, Bia`,
    hint: "Combine filter, map e join.",
    validate: (output) => output.trim() === "Lia, Bia",
    expected: "Lia, Bia",
  },
  {
    id: "fibonacci",
    title: "Sequência de Fibonacci",
    category: "Algoritmos",
    difficulty: "Avançado",
    xp: 130,
    description: "Gere os 8 primeiros números de Fibonacci e mostre-os separados por vírgula.",
    starter: `const quantidade = 8;\nconst sequencia = [0, 1];\n\n// Complete o algoritmo`,
    hint: "Cada novo número é a soma dos dois anteriores.",
    validate: (output) => output.replace(/\s/g, "") === "0,1,1,2,3,5,8,13",
    expected: "0, 1, 1, 2, 3, 5, 8, 13",
  },
  {
    id: "agrupar",
    title: "Agrupando pedidos",
    category: "Dados",
    difficulty: "Avançado",
    xp: 150,
    description: "Some os valores por categoria e mostre o objeto em JSON.",
    starter: `const pedidos = [
  { categoria: "livros", valor: 30 },
  { categoria: "cursos", valor: 90 },
  { categoria: "livros", valor: 20 }
];

// Esperado: {"livros":50,"cursos":90}`,
    hint: "Use reduce com um objeto vazio como acumulador.",
    validate: (output) => output.replace(/\s/g, "") === '{"livros":50,"cursos":90}',
    expected: '{"livros":50,"cursos":90}',
  },
];

export const allLessons = courseModules.flatMap((module) =>
  module.lessons.map((currentLesson) => ({
    ...currentLesson,
    language: module.language,
    moduleId: module.id,
    moduleTitle: module.title,
    moduleColor: module.color,
  })),
);

export const lessonsByLanguage = {
  javascript: allLessons.filter((lessonItem) => lessonItem.language === "javascript"),
  python: allLessons.filter((lessonItem) => lessonItem.language === "python"),
  cpp: allLessons.filter((lessonItem) => lessonItem.language === "cpp"),
} satisfies Record<LanguageId, typeof allLessons>;

export const totalCourseMinutes = allLessons.reduce(
  (total, currentLesson) => total + currentLesson.duration,
  0,
);

export const totalMinutesByLanguage: Record<LanguageId, number> = {
  javascript: lessonsByLanguage.javascript.reduce(
    (total, currentLesson) => total + currentLesson.duration,
    0,
  ),
  python: lessonsByLanguage.python.reduce(
    (total, currentLesson) => total + currentLesson.duration,
    0,
  ),
  cpp: lessonsByLanguage.cpp.reduce(
    (total, currentLesson) => total + currentLesson.duration,
    0,
  ),
};
