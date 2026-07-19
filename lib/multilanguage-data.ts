import type {
  CourseModule,
  Difficulty,
  Lesson,
  ProgrammingLanguage,
} from "./course-types";

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
): Lesson => ({
  id,
  title,
  summary,
  duration,
  difficulty,
  theory,
  analogy,
  code,
  mission,
  quiz: { question, options, answer, explanation },
});

export const programmingLanguages: ProgrammingLanguage[] = [
  {
    id: "javascript",
    name: "JavaScript",
    shortName: "JS",
    tagline: "Web, interfaces e produtos digitais",
    description:
      "Domine a linguagem da web construindo interfaces, APIs e experiências interativas.",
    accent: "#f7df1e",
    accentSoft: "rgba(247, 223, 30, 0.12)",
    fileExtension: "js",
    runtimeLabel: "Nexa JavaScript Runtime",
  },
  {
    id: "python",
    name: "Python",
    shortName: "PY",
    tagline: "Automação, dados e inteligência artificial",
    description:
      "Aprenda sintaxe expressiva, estruturas de dados e arquitetura para automação e IA.",
    accent: "#57b8ff",
    accentSoft: "rgba(87, 184, 255, 0.12)",
    fileExtension: "py",
    runtimeLabel: "Python Study Lab",
  },
  {
    id: "cpp",
    name: "C++",
    shortName: "C++",
    tagline: "Performance, sistemas e engenharia",
    description:
      "Construa fundamentos sólidos de memória, orientação a objetos e C++ moderno.",
    accent: "#b58cff",
    accentSoft: "rgba(181, 140, 255, 0.12)",
    fileExtension: "cpp",
    runtimeLabel: "C++ Engineering Lab",
  },
];

export const pythonModules: CourseModule[] = [
  {
    id: "python-fundamentos",
    language: "python",
    number: "01",
    title: "Essência Python",
    subtitle: "Sintaxe limpa, valores e comunicação com o programa",
    color: "#57b8ff",
    icon: "Py",
    lessons: [
      lesson(
        "python-variaveis-tipos",
        "Variáveis e tipagem dinâmica",
        "Modele informações com nomes expressivos e tipos previsíveis.",
        18,
        "Iniciante",
        "Em Python, uma variável referencia um objeto e seu tipo é determinado em tempo de execução. Use nomes em snake_case, type hints para comunicar contratos e conversões explícitas quando a entrada chega como texto.",
        "Variáveis são etiquetas móveis apontando para objetos; o type hint é a legenda que explica o que esperamos encontrar.",
        `nome: str = "Lina"
tentativas: int = 3
precisao: float = 0.94
ativo: bool = True

print(f"{nome} · {tentativas} tentativas")
print(type(precisao).__name__)`,
        "Crie nome, horas_estudo e concluiu_modulo com type hints. Exiba uma frase usando f-string e confirme o tipo de cada valor.",
        "O que um type hint faz em Python?",
        [
          "Converte o valor automaticamente",
          "Comunica o tipo esperado e ajuda ferramentas",
          "Impede toda mudança de tipo em execução",
          "Substitui testes",
        ],
        1,
        "Type hints documentam contratos e permitem análise estática, mas não transformam Python em uma linguagem estaticamente tipada durante a execução.",
      ),
      lesson(
        "python-entrada-saida",
        "Entrada, saída e validação",
        "Transforme texto recebido em dados confiáveis.",
        20,
        "Iniciante",
        "input sempre devolve uma string. Um programa robusto normaliza espaços, converte o tipo conscientemente e valida limites antes de usar o valor. Mensagens de erro devem explicar como corrigir a entrada.",
        "A entrada é a recepção de um laboratório: antes de liberar o acesso, ela confere identidade, formato e regras.",
        `entrada = " 42 "

try:
    idade = int(entrada.strip())
    if not 0 <= idade <= 120:
        raise ValueError("idade fora do intervalo")
    print(f"Idade válida: {idade}")
except ValueError as erro:
    print(f"Entrada inválida: {erro}")`,
        "Receba uma nota textual, converta para float e aceite somente valores entre 0 e 10. Mostre uma mensagem útil quando a validação falhar.",
        "Qual tipo input devolve?",
        ["int", "str", "bytes", "Depende do conteúdo"],
        1,
        "input devolve str; qualquer conversão numérica deve ser feita explicitamente.",
      ),
    ],
  },
  {
    id: "python-fluxo",
    language: "python",
    number: "02",
    title: "Decisões & Iteração",
    subtitle: "Expresse regras e percorra dados com clareza",
    color: "#52e0c4",
    icon: "if",
    lessons: [
      lesson(
        "python-condicionais",
        "Condições legíveis",
        "Organize decisões com if, elif, else e guard clauses.",
        22,
        "Iniciante",
        "Python usa indentação para definir blocos. Combine comparações sem repetições, aproveite operadores como in e escreva primeiro os casos inválidos quando isso reduzir aninhamentos.",
        "Uma condição é um controle de tráfego: regras simples e bem sinalizadas evitam cruzamentos confusos.",
        `def classificar_nota(nota: float) -> str:
    if not 0 <= nota <= 10:
        return "nota inválida"
    if nota >= 9:
        return "excelente"
    if nota >= 7:
        return "aprovado"
    return "revisar"

print(classificar_nota(8.5))`,
        "Crie uma função que classifique uma temperatura como fria, confortável ou quente e trate valores fisicamente improváveis.",
        "O que define um bloco em Python?",
        ["Chaves", "Indentação", "Palavra begin", "Parênteses"],
        1,
        "A indentação faz parte da sintaxe e determina quais instruções pertencem a cada bloco.",
      ),
      lesson(
        "python-lacos-compreensoes",
        "Laços e compreensões",
        "Percorra, filtre e transforme coleções sem ruído.",
        25,
        "Intermediário",
        "Use for para percorrer iteráveis, enumerate quando precisar do índice e zip para combinar sequências. Compreensões são adequadas para transformações curtas; regras complexas ficam mais legíveis em um laço convencional.",
        "Um iterável é uma linha de itens; for é o operador que atende cada item, e a compreensão é uma esteira compacta para tarefas simples.",
        `temperaturas = [18, 22, 31, 16, 27]

confortaveis = [
    valor
    for valor in temperaturas
    if 20 <= valor <= 28
]

for posicao, valor in enumerate(confortaveis, start=1):
    print(posicao, valor)`,
        "A partir de uma lista de preços, gere outra com 10% de desconto apenas para valores acima de 100. Arredonde para duas casas.",
        "Quando uma compreensão deve ser evitada?",
        [
          "Quando transforma uma lista",
          "Quando a regra possui muitas condições e efeitos",
          "Quando existe um filtro simples",
          "Quando o resultado é uma coleção",
        ],
        1,
        "Compreensões densas sacrificam leitura; regras complexas merecem nomes e passos explícitos.",
      ),
    ],
  },
  {
    id: "python-dados",
    language: "python",
    number: "03",
    title: "Estruturas de Dados",
    subtitle: "Escolha a coleção certa para cada problema",
    color: "#ff83b8",
    icon: "[]",
    lessons: [
      lesson(
        "python-listas-tuplas",
        "Listas, tuplas e slicing",
        "Trabalhe com sequências mutáveis e imutáveis.",
        24,
        "Intermediário",
        "Listas são mutáveis e ideais para coleções que evoluem. Tuplas expressam registros ou sequências que não devem mudar. Slicing cria recortes previsíveis e unpacking deixa a estrutura explícita.",
        "Uma lista é um quadro editável; uma tupla é uma fotografia do estado que deve permanecer estável.",
        `tarefas = ["planejar", "codificar", "testar", "publicar"]
primeiras = tarefas[:2]
ultima = tarefas[-1]

coordenada = (-23.55, -46.63)
latitude, longitude = coordenada

print(primeiras, ultima)
print(latitude, longitude)`,
        "Modele as etapas de um projeto em uma lista, extraia as três primeiras com slicing e use uma tupla para guardar versão e data da entrega.",
        "Qual estrutura comunica melhor uma coordenada fixa?",
        ["list", "tuple", "set", "dict vazio"],
        1,
        "Uma tupla representa bem um pequeno registro ordenado que não deve ser alterado.",
      ),
      lesson(
        "python-dicionarios-conjuntos",
        "Dicionários e conjuntos",
        "Acesse dados por chave e elimine duplicidades.",
        27,
        "Intermediário",
        "Dicionários relacionam chaves a valores e são excelentes para entidades e índices. Sets armazenam elementos únicos e tornam operações de pertencimento, união e interseção eficientes.",
        "O dicionário é um armário etiquetado; o conjunto é uma catraca que deixa cada identidade entrar apenas uma vez.",
        `usuarios = [
    {"id": 1, "nome": "Ada", "skills": {"python", "dados"}},
    {"id": 2, "nome": "Linus", "skills": {"cpp", "sistemas"}},
]

indice = {usuario["id"]: usuario for usuario in usuarios}
skills_comuns = {"python", "dados"} & indice[1]["skills"]

print(indice[2]["nome"])
print(skills_comuns)`,
        "Crie um índice de produtos por código e use conjuntos para descobrir quais categorias aparecem em duas listas diferentes.",
        "Qual operação encontra itens comuns entre dois sets?",
        ["União |", "Interseção &", "Diferença -", "append"],
        1,
        "A interseção retorna somente os elementos presentes nos dois conjuntos.",
      ),
    ],
  },
  {
    id: "python-arquitetura",
    language: "python",
    number: "04",
    title: "Funções & Confiabilidade",
    subtitle: "Contratos claros, composição e falhas controladas",
    color: "#ffad66",
    icon: "ƒ",
    lessons: [
      lesson(
        "python-funcoes",
        "Funções, parâmetros e composição",
        "Crie unidades pequenas, tipadas e reutilizáveis.",
        28,
        "Intermediário",
        "Uma função deve ter responsabilidade única, entradas explícitas e retorno previsível. Evite argumentos mutáveis como padrão, use keyword arguments para chamadas claras e componha funções puras quando possível.",
        "Funções são estações especializadas: cada uma transforma uma entrada e entrega um resultado verificável para a próxima.",
        `from collections.abc import Iterable

def media(valores: Iterable[float]) -> float:
    numeros = list(valores)
    if not numeros:
        raise ValueError("a coleção não pode ser vazia")
    return sum(numeros) / len(numeros)

def aprovado(notas: list[float], minimo: float = 7.0) -> bool:
    return media(notas) >= minimo

print(aprovado([8.0, 7.5, 9.0]))`,
        "Crie funções separadas para calcular subtotal, desconto e total de um pedido. Use type hints e valide entradas negativas.",
        "Por que evitar uma lista como valor padrão de parâmetro?",
        [
          "Listas não podem ser parâmetros",
          "O mesmo objeto mutável é reutilizado entre chamadas",
          "Python converte a lista em tupla",
          "A função deixa de retornar",
        ],
        1,
        "Valores padrão são criados uma vez; um objeto mutável pode acumular estado entre chamadas.",
      ),
      lesson(
        "python-excecoes-testes",
        "Exceções e testes orientados a comportamento",
        "Falhe com contexto e prove regras importantes.",
        30,
        "Avançado",
        "Exceções devem representar situações excepcionais e específicas. Capture apenas o que consegue tratar. Testes devem cobrir comportamento observável, limites e falhas esperadas, sem depender da implementação interna.",
        "A exceção é um alarme identificado; o teste é a simulação que confirma se o alarme dispara na situação correta.",
        `def sacar(saldo: float, valor: float) -> float:
    if valor <= 0:
        raise ValueError("valor deve ser positivo")
    if valor > saldo:
        raise RuntimeError("saldo insuficiente")
    return saldo - valor

def test_saque_valido() -> None:
    assert sacar(100, 35) == 65

def test_valor_invalido() -> None:
    try:
        sacar(100, 0)
        assert False, "deveria lançar ValueError"
    except ValueError:
        pass`,
        "Implemente uma função reservar_vaga e escreva testes para reserva válida, quantidade zero e capacidade insuficiente.",
        "Qual exceção deve ser capturada?",
        [
          "Sempre Exception de forma genérica",
          "Somente a exceção que o código consegue tratar",
          "Nenhuma exceção",
          "Apenas SyntaxError",
        ],
        1,
        "Capturas específicas preservam erros inesperados e deixam a estratégia de recuperação clara.",
      ),
    ],
  },
  {
    id: "python-produto",
    language: "python",
    number: "05",
    title: "Objetos & Produto",
    subtitle: "Modele domínios e entregue uma automação real",
    color: "#86f29f",
    icon: "◈",
    lessons: [
      lesson(
        "python-classes-dataclasses",
        "Classes e dataclasses",
        "Modele entidades mantendo regras perto dos dados.",
        32,
        "Avançado",
        "Classes fazem sentido quando estado e comportamento formam uma unidade. dataclasses reduzem código repetitivo para entidades de dados. Valide invariantes na criação e prefira composição a hierarquias profundas.",
        "Uma classe é uma planta com regras de construção; cada objeto é uma unidade válida produzida a partir dela.",
        `from dataclasses import dataclass

@dataclass(frozen=True, slots=True)
class Produto:
    codigo: str
    nome: str
    preco: float

    def com_desconto(self, percentual: float) -> float:
        if not 0 <= percentual <= 100:
            raise ValueError("desconto inválido")
        return self.preco * (1 - percentual / 100)

produto = Produto("NX-01", "Curso Python", 199.0)
print(round(produto.com_desconto(15), 2))`,
        "Crie uma dataclass Tarefa com título, prioridade e conclusão. Implemente um método que conclua a tarefa sem permitir título vazio.",
        "Quando uma classe é especialmente útil?",
        [
          "Para qualquer variável",
          "Quando estado e comportamentos relacionados formam uma entidade",
          "Somente para imprimir texto",
          "Para substituir todas as funções",
        ],
        1,
        "Classes são adequadas para entidades com invariantes e comportamentos ligados ao seu estado.",
      ),
      lesson(
        "python-projeto-automacao",
        "Projeto: Pipeline de relatórios",
        "Leia, valide, transforme e gere indicadores reproduzíveis.",
        42,
        "Avançado",
        "Uma automação confiável separa entrada, validação, transformação e saída. Registre quantidades processadas, rejeições e duração. Faça a regra central funcionar com dados em memória antes de conectar arquivos ou serviços.",
        "Um pipeline é uma linha de produção observável: cada estação tem entrada, saída e controle de qualidade.",
        `from dataclasses import dataclass

@dataclass(frozen=True)
class Venda:
    categoria: str
    valor: float

def consolidar(vendas: list[Venda]) -> dict[str, float]:
    totais: dict[str, float] = {}
    for venda in vendas:
        if venda.valor < 0:
            raise ValueError("venda negativa")
        totais[venda.categoria] = totais.get(venda.categoria, 0) + venda.valor
    return totais

dados = [Venda("cursos", 120), Venda("livros", 45), Venda("cursos", 80)]
print(consolidar(dados))`,
        "Construa um pipeline que receba transações, rejeite registros inválidos, agrupe valores por categoria e produza um resumo com total e quantidade.",
        "Qual separação melhora mais a testabilidade do pipeline?",
        [
          "Misturar leitura e cálculo",
          "Isolar a transformação central das entradas e saídas",
          "Usar apenas variáveis globais",
          "Imprimir dentro de toda função",
        ],
        1,
        "Uma transformação central pura pode ser testada com dados pequenos sem depender de arquivos ou rede.",
      ),
    ],
  },
];

export const cppModules: CourseModule[] = [
  {
    id: "cpp-fundamentos",
    language: "cpp",
    number: "01",
    title: "Base Compilada",
    subtitle: "Do código-fonte ao executável com tipos explícitos",
    color: "#b58cff",
    icon: "C++",
    lessons: [
      lesson(
        "cpp-compilacao-io",
        "Compilação e entrada/saída",
        "Entenda cada etapa até o programa virar um executável.",
        22,
        "Iniciante",
        "C++ é compilado: pré-processamento, compilação, montagem e linkedição transformam arquivos-fonte em um executável. Warnings fazem parte da qualidade; compile com avisos altos e trate mensagens pela primeira causa.",
        "O compilador é uma fábrica: valida as peças, monta módulos e conecta tudo antes de liberar o produto final.",
        `#include <iostream>
#include <string>

int main() {
    const std::string nome{"Ada"};
    const int missoes{3};

    std::cout << nome << " concluiu "
              << missoes << " missões\\n";
    return 0;
}`,
        "Escreva um programa que mostre seu nome, linguagem escolhida e horas semanais. Compile com -Wall -Wextra -Wpedantic.",
        "Qual etapa conecta funções e bibliotecas em um executável?",
        ["Pré-processamento", "Linkedição", "Indentação", "Execução"],
        1,
        "O linker resolve símbolos entre unidades compiladas e bibliotecas para produzir o executável.",
      ),
      lesson(
        "cpp-tipos-const",
        "Tipos, inicialização e const",
        "Evite conversões silenciosas e estados indefinidos.",
        24,
        "Iniciante",
        "C++ oferece controle explícito sobre representação e tamanho. Prefira inicialização com chaves, const por padrão e conversões intencionais. auto reduz repetição quando o tipo permanece evidente pela expressão.",
        "O tipo é o molde físico da peça; const é o lacre que impede alterações acidentais.",
        `#include <iostream>

int main() {
    const int alunos{24};
    const double progresso{0.875};
    const auto concluidos{
        static_cast<int>(alunos * progresso)
    };

    std::cout << concluidos << " alunos\\n";
}`,
        "Modele quantidade, preço unitário e total. Use const, inicialização com chaves e uma conversão explícita em um cálculo.",
        "Por que inicialização com chaves é recomendada?",
        [
          "Porque aceita qualquer conversão",
          "Porque ajuda a impedir conversões estreitadoras",
          "Porque remove os tipos",
          "Porque sempre aloca no heap",
        ],
        1,
        "A inicialização uniforme com chaves rejeita várias conversões que poderiam perder informação.",
      ),
    ],
  },
  {
    id: "cpp-fluxo",
    language: "cpp",
    number: "02",
    title: "Fluxo & Algoritmos",
    subtitle: "Decisões previsíveis e iteração segura",
    color: "#62d8ff",
    icon: "01",
    lessons: [
      lesson(
        "cpp-condicionais-enum",
        "Condições e enum class",
        "Modele estados válidos e decisões exaustivas.",
        24,
        "Iniciante",
        "enum class cria um conjunto tipado de estados e evita números mágicos. switch funciona bem para categorias fechadas; if é melhor para intervalos e condições compostas.",
        "Um enum class é um painel com posições nomeadas: apenas estados previstos podem ser selecionados.",
        `#include <iostream>

enum class Nivel { iniciante, intermediario, avancado };

const char* recomendar(Nivel nivel) {
    switch (nivel) {
        case Nivel::iniciante: return "fundamentos";
        case Nivel::intermediario: return "estruturas";
        case Nivel::avancado: return "arquitetura";
    }
    return "desconhecido";
}

int main() {
    std::cout << recomendar(Nivel::intermediario) << '\\n';
}`,
        "Crie um enum class StatusPedido e uma função que devolva a próxima ação para cada estado.",
        "Qual vantagem enum class possui sobre constantes inteiras soltas?",
        [
          "Remove a necessidade de compilar",
          "Cria estados nomeados com segurança de tipo",
          "Transforma tudo em string",
          "Permite qualquer valor automaticamente",
        ],
        1,
        "enum class limita valores ao domínio declarado e evita colisões e comparações indevidas.",
      ),
      lesson(
        "cpp-lacos-ranges",
        "Laços, iteradores e ranges",
        "Percorra coleções sem ultrapassar limites.",
        27,
        "Intermediário",
        "O range-based for expressa iteração por valores de uma coleção. Use referência const para evitar cópias, índices apenas quando fazem parte da regra e algoritmos da biblioteca quando comunicam melhor a intenção.",
        "Iteradores são trilhos seguros sobre a coleção; referências const permitem observar cada vagão sem duplicá-lo.",
        `#include <iostream>
#include <string>
#include <vector>

int main() {
    const std::vector<std::string> linguagens{
        "JavaScript", "Python", "C++"
    };

    for (const auto& linguagem : linguagens) {
        std::cout << linguagem << '\\n';
    }
}`,
        "Percorra um vector de notas por referência const, conte aprovados e calcule a média sem acessar posições inválidas.",
        "Por que usar const auto& em uma coleção de objetos?",
        [
          "Para copiar cada objeto",
          "Para observar sem copiar nem alterar",
          "Para apagar os elementos",
          "Para ordenar automaticamente",
        ],
        1,
        "A referência evita cópia e const impede alteração acidental do elemento.",
      ),
    ],
  },
  {
    id: "cpp-funcoes-memoria",
    language: "cpp",
    number: "03",
    title: "Funções & Memória",
    subtitle: "Contratos explícitos e recursos com tempo de vida seguro",
    color: "#55efc4",
    icon: "&",
    lessons: [
      lesson(
        "cpp-funcoes-referencias",
        "Funções, referências e contratos",
        "Passe dados com intenção e mantenha retornos previsíveis.",
        30,
        "Intermediário",
        "Passe valores pequenos por valor, objetos grandes somente de leitura por const referência e use referência mutável apenas quando a alteração for parte clara do contrato. [[nodiscard]] ajuda a impedir que resultados importantes sejam ignorados.",
        "A assinatura é um contrato de entrega: ela revela o que entra, o que pode mudar e o que precisa ser usado.",
        `#include <numeric>
#include <stdexcept>
#include <vector>

[[nodiscard]]
double media(const std::vector<double>& valores) {
    if (valores.empty()) {
        throw std::invalid_argument{"lista vazia"};
    }
    const double total{
        std::accumulate(valores.begin(), valores.end(), 0.0)
    };
    return total / static_cast<double>(valores.size());
}`,
        "Crie uma função total_pedido que receba um vector por const referência, valide valores negativos e devolva o total.",
        "Quando usar const T&?",
        [
          "Para sempre modificar a entrada",
          "Para ler um objeto potencialmente grande sem copiá-lo",
          "Somente com inteiros",
          "Para retornar uma variável local",
        ],
        1,
        "const referência evita uma cópia e comunica que a função não alterará o objeto recebido.",
      ),
      lesson(
        "cpp-raii-ponteiros",
        "RAII, pilha e ponteiros",
        "Controle recursos pelo tempo de vida dos objetos.",
        34,
        "Avançado",
        "RAII vincula a aquisição de um recurso à construção de um objeto e sua liberação ao destrutor. Prefira objetos por valor e smart pointers; ponteiros crus não devem expressar propriedade.",
        "RAII é um crachá temporário: ao sair do escopo, o próprio sistema devolve o acesso e libera o recurso.",
        `#include <iostream>
#include <memory>
#include <string>

class Sessao {
public:
    explicit Sessao(std::string id) : id_{std::move(id)} {
        std::cout << "abrindo " << id_ << '\\n';
    }

    ~Sessao() {
        std::cout << "fechando " << id_ << '\\n';
    }

private:
    std::string id_;
};

int main() {
    auto sessao = std::make_unique<Sessao>("NX-42");
}`,
        "Implemente uma classe ArquivoSimulado que registre abertura na construção e fechamento no destrutor. Gerencie-a com unique_ptr.",
        "O que um unique_ptr representa?",
        [
          "Propriedade exclusiva de um recurso",
          "Um recurso sem proprietário",
          "Memória que nunca é liberada",
          "Uma cópia automática",
        ],
        0,
        "unique_ptr possui propriedade exclusiva e libera o recurso automaticamente ao sair do escopo.",
      ),
    ],
  },
  {
    id: "cpp-stl-objetos",
    language: "cpp",
    number: "04",
    title: "STL & Objetos",
    subtitle: "Coleções, algoritmos e modelos de domínio",
    color: "#ff7fae",
    icon: "STL",
    lessons: [
      lesson(
        "cpp-vector-algoritmos",
        "vector e algoritmos da STL",
        "Transforme coleções declarando a intenção.",
        32,
        "Intermediário",
        "std::vector é a coleção sequencial padrão. Algoritmos como find_if, count_if, transform e sort separam o que fazer de como percorrer, reduzindo erros de índice.",
        "A STL é uma caixa de ferramentas testada: você escolhe o verbo correto em vez de construir cada ferramenta do zero.",
        `#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> notas{6, 9, 7, 10, 5};

    const auto aprovados = std::count_if(
        notas.cbegin(),
        notas.cend(),
        [](int nota) { return nota >= 7; }
    );

    std::ranges::sort(notas);
    std::cout << aprovados << " aprovados\\n";
}`,
        "Use algoritmos da STL para filtrar logicamente preços acima de 100, contar ocorrências e ordenar a coleção.",
        "Qual algoritmo conta elementos que atendem a uma condição?",
        ["std::count_if", "std::move", "std::swap", "std::cin"],
        0,
        "std::count_if aplica um predicado a cada elemento e devolve a quantidade de correspondências.",
      ),
      lesson(
        "cpp-classes-valor",
        "Classes e semântica de valor",
        "Proteja invariantes e prefira objetos fáceis de usar corretamente.",
        35,
        "Avançado",
        "Uma classe sólida mantém seu estado válido desde a construção, expõe operações com nomes de domínio e reduz setters genéricos. Tipos com semântica de valor são simples de copiar, comparar e testar.",
        "A classe é um cofre com operações autorizadas: as regras ficam na porta, não espalhadas pelo sistema.",
        `#include <stdexcept>
#include <string>

class Conta {
public:
    Conta(std::string titular, double saldo_inicial)
        : titular_{std::move(titular)}, saldo_{saldo_inicial} {
        if (saldo_inicial < 0) {
            throw std::invalid_argument{"saldo inválido"};
        }
    }

    void depositar(double valor) {
        if (valor <= 0) {
            throw std::invalid_argument{"depósito inválido"};
        }
        saldo_ += valor;
    }

    [[nodiscard]] double saldo() const { return saldo_; }

private:
    std::string titular_;
    double saldo_;
};`,
        "Modele uma classe Curso com título, limite de vagas e matrícula. Garanta que o objeto nunca ultrapasse a capacidade.",
        "Onde uma invariável deve ser protegida?",
        [
          "Somente na interface",
          "Dentro do tipo que possui o estado",
          "Em comentários",
          "Depois que o erro acontece",
        ],
        1,
        "O próprio tipo deve impedir estados inválidos, independentemente de quem o utiliza.",
      ),
    ],
  },
  {
    id: "cpp-moderno-produto",
    language: "cpp",
    number: "05",
    title: "C++ Moderno & Produto",
    subtitle: "Recursos seguros, concorrência e projeto integrador",
    color: "#ffb55f",
    icon: "20",
    lessons: [
      lesson(
        "cpp-smart-pointers-move",
        "Smart pointers e move semantics",
        "Transfira recursos sem cópias desnecessárias.",
        38,
        "Avançado",
        "Move semantics permite transferir recursos de objetos temporários ou que não serão mais usados. unique_ptr deixa a propriedade explícita; shared_ptr deve ser reservado para propriedade realmente compartilhada.",
        "Mover é transferir a chave de um laboratório; copiar seria construir outro laboratório inteiro.",
        `#include <memory>
#include <string>
#include <utility>
#include <vector>

struct Modulo {
    explicit Modulo(std::string nome) : nome{std::move(nome)} {}
    std::string nome;
};

int main() {
    std::vector<std::unique_ptr<Modulo>> trilha;
    auto modulo = std::make_unique<Modulo>("Performance");
    trilha.push_back(std::move(modulo));
}`,
        "Crie uma coleção de recursos com unique_ptr, transfira a propriedade com std::move e explique por que o ponteiro original fica vazio.",
        "O que std::move faz diretamente?",
        [
          "Move bytes obrigatoriamente",
          "Permite que o objeto seja tratado como transferível",
          "Duplica o recurso",
          "Libera toda memória imediatamente",
        ],
        1,
        "std::move é uma conversão que permite selecionar operações de movimento; a transferência real ocorre no construtor ou operador correspondente.",
      ),
      lesson(
        "cpp-projeto-telemetria",
        "Projeto: Motor de telemetria",
        "Modele eventos, processe métricas e entregue um CLI robusto.",
        48,
        "Avançado",
        "Um projeto de sistemas deve separar captura, modelo, processamento e apresentação. Use tipos para unidades, algoritmos para agregação, RAII para recursos e testes para limites. Comece com dados em memória e só depois conecte arquivos.",
        "Telemetria é uma central de controle: sensores enviam eventos, o motor consolida sinais e a interface destaca decisões.",
        `#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

struct Evento {
    std::string origem;
    double latencia_ms;
    bool sucesso;
};

double taxa_de_sucesso(const std::vector<Evento>& eventos) {
    if (eventos.empty()) return 0.0;
    const auto sucessos = std::count_if(
        eventos.cbegin(), eventos.cend(),
        [](const Evento& evento) { return evento.sucesso; }
    );
    return 100.0 * static_cast<double>(sucessos) /
           static_cast<double>(eventos.size());
}

int main() {
    const std::vector<Evento> eventos{
        {"api", 42.5, true},
        {"worker", 81.2, false},
        {"api", 36.8, true}
    };
    std::cout << taxa_de_sucesso(eventos) << "%\\n";
}`,
        "Construa um CLI que receba eventos, calcule latência média, taxa de sucesso e origens críticas. Separe modelo, processamento e apresentação.",
        "Qual deve ser o primeiro passo do projeto?",
        [
          "Conectar rede e banco imediatamente",
          "Validar o modelo e as regras com dados em memória",
          "Criar animações",
          "Usar ponteiros crus para tudo",
        ],
        1,
        "Dados em memória permitem provar regras e interfaces dos componentes antes de adicionar infraestrutura.",
      ),
    ],
  },
];
