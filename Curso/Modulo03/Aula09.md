# Aula 9 — Escopo e closures

> Módulo: Funções · Nível: Intermediário · Tempo sugerido: 24 minutos

## Objetivos da aula

- Explicar escopo e closures usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **Arrow functions**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Closure é como uma mochila: a função leva consigo os dados do lugar onde foi criada.**

Closures surgem quando uma função preserva acesso ao ambiente em que foi criada. Elas permitem encapsular estado, mas também podem manter dados vivos por mais tempo do que o necessário. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Escopo determina onde uma variável pode ser acessada. Uma closure acontece quando uma função mantém acesso ao ambiente em que nasceu, mesmo após a função externa terminar.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Escopo e closures** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

### Como funciona

1. Identifique a entrada ou estado envolvido.
2. Defina o resultado esperado antes de escrever a solução.
3. Aplique o conceito em uma unidade pequena.
4. Observe a saída real.
5. Compare o resultado com o contrato e trate casos inválidos.

### Quando utilizar

Em produção, este conceito deve ficar isolado em uma unidade pequena, observável e com responsabilidade única. Prefira APIs explícitas a efeitos colaterais ocultos.

### Quando não utilizar

Não use o conceito apenas porque a sintaxe está disponível. Evite-o quando uma construção mais simples comunicar melhor a regra ou quando sua adoção esconder efeitos colaterais e estados inválidos.

### Pontos-chave

- Escopo é definido pela posição do código, não pelo local da chamada.
- Cada execução pode criar um ambiente fechado independente.
- Observe referências retidas em callbacks de longa duração.

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

```javascript
function criarContador() {
  let valor = 0;
  return () => ++valor;
}

const proximo = criarContador();
console.log(proximo());
console.log(proximo());
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Construa uma fábrica de contadores de progresso e prove que duas instâncias não compartilham o mesmo estado.

## Erros mais comuns

1. **Erro central:** Compartilhar a mesma variável mutável entre callbacks e esperar estados independentes.
2. Começar a codificar sem definir o resultado esperado.
3. Testar somente o caminho feliz.
4. Misturar cálculo, entrada e apresentação em um único bloco.
5. Ignorar mensagens de erro em vez de investigar sua origem.

## Dicas profissionais

- Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
- Priorize correção e legibilidade; depois observe quantas vezes cada operação é executada e quais dados permanecem em memória.
- Escreva uma frase explicando o contrato antes da implementação.
- Prefira exemplos pequenos que possam ser executados e conferidos.
- Durante a revisão, procure estados inválidos e dependências ocultas.

## Resumo da aula

Você estudou **Escopo e closures**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Closures surgem quando uma função preserva acesso ao ambiente em que foi criada. Elas permitem encapsular estado, mas também podem manter dados vivos por mais tempo do que o necessário.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Escopo e closures:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. O que uma closure preserva?
   - A) A tela do navegador
   - B) O acesso ao escopo léxico
   - C) Somente constantes globais
   - D) O histórico do console

2. Qual prática torna "Escopo e closures" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Escopo e closures"?
   - A) Usar nomes claros
   - B) Criar testes reproduzíveis
   - C) Os defeitos mais comuns surgem de coerção implícita, estado compartilhado, valores ausentes e caminhos de erro não tratados. Modele esses casos antes do caminho feliz.
   - D) Documentar o contrato

4. Qual sequência representa uma aprendizagem tecnicamente responsável?
   - A) Copiar, publicar e só depois entender
   - B) Entender, implementar, verificar e revisar
   - C) Otimizar, ocultar erros e remover testes
   - D) Decorar sintaxe sem praticar

5. Para que serve o exemplo de código desta aula?
   - A) Substituir a compreensão
   - B) Demonstrar o conceito em uma situação pequena e verificável
   - C) Evitar qualquer adaptação
   - D) Provar que erros não existem

6. O que deve acontecer quando uma entrada viola o contrato?
   - A) A aplicação deve fingir sucesso
   - B) O valor deve ser aceito silenciosamente
   - C) A falha deve ser tratada ou comunicada com clareza
   - D) Todos os dados devem ser apagados

7. Qual é o melhor primeiro passo antes de otimizar "Escopo e closures"?
   - A) Medir e identificar um gargalo real
   - B) Reduzir nomes de variáveis
   - C) Remover validações
   - D) Duplicar o código

8. Qual teste aumenta mais a confiança na solução?
   - A) Somente o caminho feliz
   - B) Somente uma execução manual
   - C) Caso normal, limite e falha esperada
   - D) Nenhum teste até a publicação

9. Por que usar nomes que expressem intenção?
   - A) Para aumentar o arquivo
   - B) Para comunicar o papel do dado ou operação
   - C) Para evitar qualquer comentário
   - D) Para alterar o resultado automaticamente

10. Quando a solução de "Escopo e closures" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique escopo e closures para alguém que nunca programou.
2. Compare o conceito com a analogia apresentada e indique o limite dessa comparação.
3. Descreva um caso real em que o conceito melhora a qualidade do software.
4. Analise o principal modo de falha: Os defeitos mais comuns surgem de coerção implícita, estado compartilhado, valores ausentes e caminhos de erro não tratados. Modele esses casos antes do caminho feliz.
5. Proponha três testes para a micromissão desta aula.

### 3 estudos de caso

1. **Sistema educacional:** aplique o conceito ao progresso de um estudante e defina entradas, saída e falhas.
2. **Revisão de código:** encontre riscos no exemplo se ele recebesse dados externos não validados.
3. **Produção:** proponha logs, testes e critérios de aceite para publicar a solução.

## Gabarito comentado

### Questões objetivas

1. **B.** A função interna preserva acesso às variáveis do escopo onde foi criada.
2. **B.** Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
3. **C.** Os defeitos mais comuns surgem de coerção implícita, estado compartilhado, valores ausentes e caminhos de erro não tratados. Modele esses casos antes do caminho feliz.
4. **B.** Entendimento, implementação e verificação conectam teoria a comportamento observável.
5. **B.** O exemplo reduz o problema para tornar o mecanismo visível; depois ele deve ser adaptado.
6. **C.** Contratos só são úteis quando entradas inválidas recebem uma resposta previsível.
7. **A.** Priorize correção e legibilidade; depois observe quantas vezes cada operação é executada e quais dados permanecem em memória.
8. **C.** Os três grupos verificam comportamento comum, fronteiras e respostas a condições inválidas.
9. **B.** Um nome preciso reduz a carga mental e ajuda outras pessoas a revisar o comportamento.
10. **C.** Conclusão exige critérios observáveis, inclusive para limites e falhas.

### Orientação para questões abertas

Respostas adequadas devem definir o conceito com palavras próprias, relacionar teoria e prática, explicitar contratos, apresentar pelo menos um caso inválido e justificar as decisões. Nos estudos de caso, avalie segurança, clareza, possibilidade de teste e comportamento em falhas.

## Desafio prático

Crie uma função criarSaudacao que memorize um cumprimento e retorne outra função para receber o nome.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.
