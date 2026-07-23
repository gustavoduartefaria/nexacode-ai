# NexaCode AI — Curso completo de JavaScript

# Índice completo

| Aula | Módulo | Tema | Nível | Duração |
|---:|---|---|---|---:|
| 1 | Fundamentos | Variáveis: let e const | Iniciante | 12 min |
| 2 | Fundamentos | Tipos e valores | Iniciante | 14 min |
| 3 | Fundamentos | Operadores sem mistério | Iniciante | 16 min |
| 4 | Lógica & Fluxo | if, else e decisões | Iniciante | 17 min |
| 5 | Lógica & Fluxo | Loops com propósito | Iniciante | 20 min |
| 6 | Lógica & Fluxo | Erros que ensinam | Intermediário | 18 min |
| 7 | Funções | Funções e retorno | Iniciante | 18 min |
| 8 | Funções | Arrow functions | Intermediário | 15 min |
| 9 | Funções | Escopo e closures | Intermediário | 24 min |
| 10 | Dados | Arrays na prática | Iniciante | 18 min |
| 11 | Dados | map, filter e reduce | Intermediário | 26 min |
| 12 | Dados | Objetos e desestruturação | Intermediário | 22 min |
| 13 | DOM & Interface | Selecionando elementos | Intermediário | 20 min |
| 14 | DOM & Interface | Eventos e interação | Intermediário | 23 min |
| 15 | DOM & Interface | Formulários confiáveis | Intermediário | 25 min |
| 16 | Assíncrono | Entendendo Promises | Intermediário | 24 min |
| 17 | Assíncrono | async e await | Intermediário | 23 min |
| 18 | Assíncrono | Consumindo APIs | Intermediário | 28 min |
| 19 | JavaScript Moderno | Módulos | Intermediário | 20 min |
| 20 | JavaScript Moderno | Classes com propósito | Avançado | 25 min |
| 21 | JavaScript Moderno | Imutabilidade prática | Avançado | 22 min |
| 22 | Projetos Reais | Projeto: Task Flow | Intermediário | 45 min |
| 23 | Projetos Reais | Projeto: Data Pulse | Avançado | 55 min |
| 24 | Projetos Reais | Projeto final: Dev Portfolio | Avançado | 70 min |

# Aula 1 — Variáveis: let e const

> Módulo: Fundamentos · Nível: Iniciante · Tempo sugerido: 12 minutos

## Objetivos da aula

- Explicar variáveis: let e const usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Você não precisa conhecer programação. Basta saber usar o navegador, criar arquivos e seguir instruções passo a passo.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Imagine etiquetas coladas em caixas. A etiqueta é o nome da variável; o conteúdo da caixa é o valor.**

Uma variável associa um nome a um valor dentro de um escopo. const impede a reatribuição da referência, mas não torna objetos imutáveis; let deve aparecer apenas quando a troca de valor faz parte do modelo. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Variáveis são referências para valores. Use const quando a referência não será trocada e let quando ela precisa mudar. Prefira nomes que expliquem a intenção do dado.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Variáveis: let e const** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Declare no menor escopo possível e inicialize perto do uso.
- Prefira const e use let para estado que realmente evolui.
- Nomes devem revelar unidade, finalidade e significado do valor.

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
const nome = "Lia";
let pontos = 10;

pontos = pontos + 5;
console.log(`${nome} tem ${pontos} pontos`);
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Modele o estado de uma matrícula com constantes para identidade e uma variável para o progresso. Depois identifique quais mudanças são permitidas.

## Erros mais comuns

1. **Erro central:** Confundir const com imutabilidade profunda e alterar objetos compartilhados sem perceber.
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

Você estudou **Variáveis: let e const**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Uma variável associa um nome a um valor dentro de um escopo. const impede a reatribuição da referência, mas não torna objetos imutáveis; let deve aparecer apenas quando a troca de valor faz parte do modelo.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Variáveis: let e const:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Qual declaração você deve preferir quando a referência não muda?
   - A) var
   - B) let
   - C) const
   - D) static

2. Qual prática torna "Variáveis: let e const" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Variáveis: let e const"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Variáveis: let e const"?
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

10. Quando a solução de "Variáveis: let e const" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique variáveis: let e const para alguém que nunca programou.
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

1. **C.** const comunica que a referência não será reatribuída e deixa a intenção do código mais clara.
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

Crie uma constante chamada linguagem e uma variável chamada nivel. Depois, aumente o nível em 1 e mostre uma frase no console.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 2 — Tipos e valores

> Módulo: Fundamentos · Nível: Iniciante · Tempo sugerido: 14 minutos

## Objetivos da aula

- Explicar tipos e valores usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **Variáveis: let e const**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Tipos são como formatos de peças: cada formato combina melhor com certas operações.**

JavaScript possui valores primitivos e valores por referência. O tipo determina quais operações fazem sentido, enquanto conversões implícitas podem produzir resultados válidos sintaticamente, mas incorretos para o domínio. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

JavaScript possui tipos primitivos como string, number, boolean, undefined, bigint e symbol. null representa intencionalmente a ausência de valor. typeof ajuda a investigar o tipo durante o aprendizado.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Tipos e valores** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Diferencie ausência intencional com null de valor ainda não definido.
- Converta entradas textuais explicitamente antes de calcular.
- Valide Number.isNaN e limites do domínio após a conversão.

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
const curso = "JavaScript";
const aulas = 24;
const ativo = true;

console.log(typeof curso);
console.log(typeof aulas);
console.log(typeof ativo);
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Receba idade, nome e aceite dos termos como texto, converta cada campo e produza uma lista de erros específicos.

## Erros mais comuns

1. **Erro central:** Confiar somente em typeof, especialmente para null, arrays e valores numéricos inválidos.
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

Você estudou **Tipos e valores**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: JavaScript possui valores primitivos e valores por referência. O tipo determina quais operações fazem sentido, enquanto conversões implícitas podem produzir resultados válidos sintaticamente, mas incorretos para o domínio.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Tipos e valores:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Qual é o resultado de typeof 42?
   - A) "integer"
   - B) "number"
   - C) "float"
   - D) "numeric"

2. Qual prática torna "Tipos e valores" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Tipos e valores"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Tipos e valores"?
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

10. Quando a solução de "Tipos e valores" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique tipos e valores para alguém que nunca programou.
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

1. **B.** Em JavaScript, inteiros e números decimais pertencem ao tipo number.
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

Declare uma string, um número e um booleano sobre você. Mostre o valor e o tipo de cada um.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 3 — Operadores sem mistério

> Módulo: Fundamentos · Nível: Iniciante · Tempo sugerido: 16 minutos

## Objetivos da aula

- Explicar operadores sem mistério usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **Tipos e valores**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Operadores são verbos: somar, comparar, negar e combinar informações.**

Operadores formam expressões que calculam ou decidem. A legibilidade depende de precedência explícita, comparações estritas e uso consciente do curto-circuito lógico. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Operadores aritméticos calculam, operadores de comparação produzem true ou false e operadores lógicos combinam condições. Prefira === e !== para evitar conversões implícitas inesperadas.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Operadores sem mistério** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Use === e !== para evitar coerções silenciosas.
- Agrupe expressões complexas com parênteses e nomes intermediários.
- Diferencie || de ?? quando zero e string vazia são valores válidos.

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
const idade = 19;
const temIngresso = true;
const podeEntrar = idade >= 18 && temIngresso;

console.log("Entrada liberada?", podeEntrar);
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Calcule o acesso a um curso combinando idade, assinatura e autorização, nomeando cada condição antes da expressão final.

## Erros mais comuns

1. **Erro central:** Usar || para valores padrão e substituir acidentalmente 0, false ou uma string vazia válida.
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

Você estudou **Operadores sem mistério**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Operadores formam expressões que calculam ou decidem. A legibilidade depende de precedência explícita, comparações estritas e uso consciente do curto-circuito lógico.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Operadores sem mistério:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Qual operador exige igualdade de valor e tipo?
   - A) ==
   - B) =
   - C) ===
   - D) =>

2. Qual prática torna "Operadores sem mistério" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Operadores sem mistério"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Operadores sem mistério"?
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

10. Quando a solução de "Operadores sem mistério" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique operadores sem mistério para alguém que nunca programou.
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

1. **C.** === compara valor e tipo, evitando coerções silenciosas.
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

Crie uma condição que seja verdadeira apenas quando uma pessoa tiver pelo menos 18 anos e um documento válido.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 4 — if, else e decisões

> Módulo: Lógica & Fluxo · Nível: Iniciante · Tempo sugerido: 17 minutos

## Objetivos da aula

- Explicar if, else e decisões usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Revise as ideias essenciais do módulo anterior: contratos explícitos, nomes claros, validação e testes de casos normais, limites e falhas.

## Introdução

Antes do código, pense nesta comparação cotidiana: **É como uma bifurcação: a condição decide qual estrada o programa seguirá.**

Uma condicional deve expressar uma regra observável, não apenas controlar linhas de código. Casos inválidos tratados primeiro reduzem aninhamentos e deixam o caminho principal evidente. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Uma condicional executa blocos diferentes conforme uma expressão booleana. Organize primeiro o caso principal e evite aninhamentos profundos usando retornos antecipados em funções.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **if, else e decisões** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Transforme condições extensas em variáveis ou funções booleanas.
- Use guard clauses para rejeitar estados inválidos cedo.
- Garanta que todos os casos relevantes tenham comportamento definido.

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
const nota = 8.4;

if (nota >= 7) {
  console.log("Aprovado");
} else if (nota >= 5) {
  console.log("Recuperação");
} else {
  console.log("Revisar conteúdo");
}
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Implemente uma política de certificado considerando progresso, nota e situação da conta, incluindo mensagens para cada impedimento.

## Erros mais comuns

1. **Erro central:** Criar árvores profundas de if/else que misturam validação, cálculo e apresentação.
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

Você estudou **if, else e decisões**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Uma condicional deve expressar uma regra observável, não apenas controlar linhas de código. Casos inválidos tratados primeiro reduzem aninhamentos e deixam o caminho principal evidente.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **if, else e decisões:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Quando o bloco else é executado?
   - A) Sempre
   - B) Quando a primeira condição é verdadeira
   - C) Quando nenhuma condição anterior é verdadeira
   - D) Somente quando existe erro

2. Qual prática torna "if, else e decisões" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "if, else e decisões"?
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

7. Qual é o melhor primeiro passo antes de otimizar "if, else e decisões"?
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

10. Quando a solução de "if, else e decisões" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique if, else e decisões para alguém que nunca programou.
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

1. **C.** else representa o caminho alternativo quando as condições anteriores falham.
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

Classifique uma temperatura como fria, agradável ou quente usando if, else if e else.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 5 — Loops com propósito

> Módulo: Lógica & Fluxo · Nível: Iniciante · Tempo sugerido: 20 minutos

## Objetivos da aula

- Explicar loops com propósito usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **if, else e decisões**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Um loop é uma esteira: cada item passa pela mesma estação de trabalho.**

Todo laço precisa de uma coleção ou condição, uma operação por passo e uma garantia de término. Escolha a construção que melhor comunica se você percorre valores, índices ou repete até uma condição. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Loops percorrem sequências ou repetem uma ação. Use for...of para valores iteráveis e métodos de array quando a intenção for transformar ou filtrar dados.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Loops com propósito** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Use for...of para valores e for clássico quando o índice fizer parte da regra.
- Defina a condição de parada antes de escrever o corpo.
- Evite alterar a coleção que está sendo percorrida sem uma estratégia explícita.

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
const tecnologias = ["HTML", "CSS", "JavaScript"];

for (const tecnologia of tecnologias) {
  console.log(`Estudando ${tecnologia}`);
}
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Percorra tentativas de um exercício, interrompa na primeira solução correta e registre quantas avaliações foram necessárias.

## Erros mais comuns

1. **Erro central:** Criar laços infinitos ou erros de limite por atualizar o contador no lugar errado.
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

Você estudou **Loops com propósito**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Todo laço precisa de uma coleção ou condição, uma operação por passo e uma garantia de término. Escolha a construção que melhor comunica se você percorre valores, índices ou repete até uma condição.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Loops com propósito:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Qual loop é direto para percorrer os valores de um array?
   - A) for...of
   - B) switch
   - C) if...else
   - D) try...catch

2. Qual prática torna "Loops com propósito" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Loops com propósito"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Loops com propósito"?
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

10. Quando a solução de "Loops com propósito" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique loops com propósito para alguém que nunca programou.
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

1. **A.** for...of percorre diretamente os valores de objetos iteráveis, como arrays.
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

Percorra uma lista de três metas e imprima cada uma com sua posição.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 6 — Erros que ensinam

> Módulo: Lógica & Fluxo · Nível: Intermediário · Tempo sugerido: 18 minutos

## Objetivos da aula

- Explicar erros que ensinam usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **Loops com propósito**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Uma mensagem de erro é um mapa do local do acidente, não um inimigo.**

Erros representam operações que não conseguiram cumprir seu contrato. Valide entradas conhecidas e use exceções para interromper fluxos que não podem continuar com segurança. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Erros possuem nome, mensagem e pilha. try/catch deve tratar falhas esperadas em pontos específicos; ele não substitui validação nem deve esconder problemas sem registrar contexto.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Erros que ensinam** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Lance Error com mensagem e contexto úteis.
- Capture a falha apenas onde existe uma resposta possível.
- Nunca esconda um erro com catch vazio.

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
function dividir(a, b) {
  if (b === 0) throw new Error("Divisor não pode ser zero");
  return a / b;
}

try {
  console.log(dividir(10, 0));
} catch (erro) {
  console.error(erro.message);
}
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Crie um parser de nota que diferencie campo vazio, formato inválido e valor fora do intervalo.

## Erros mais comuns

1. **Erro central:** Usar try/catch ao redor de grandes blocos e perder qual operação realmente falhou.
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

Você estudou **Erros que ensinam**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Erros representam operações que não conseguiram cumprir seu contrato. Valide entradas conhecidas e use exceções para interromper fluxos que não podem continuar com segurança.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Erros que ensinam:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Qual bloco recebe um erro lançado dentro do try?
   - A) else
   - B) finally
   - C) catch
   - D) switch

2. Qual prática torna "Erros que ensinam" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Erros que ensinam"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Erros que ensinam"?
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

10. Quando a solução de "Erros que ensinam" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique erros que ensinam para alguém que nunca programou.
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

1. **C.** catch recebe o erro e permite responder de forma controlada.
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

Crie uma função que rejeite idades negativas com uma mensagem clara.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 7 — Funções e retorno

> Módulo: Funções · Nível: Iniciante · Tempo sugerido: 18 minutos

## Objetivos da aula

- Explicar funções e retorno usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Revise as ideias essenciais do módulo anterior: contratos explícitos, nomes claros, validação e testes de casos normais, limites e falhas.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Uma função é uma máquina: recebe matéria-prima, trabalha e entrega um produto.**

Uma função é uma unidade de comportamento com entradas, resultado e efeitos observáveis. Funções pequenas são mais fáceis de nomear, testar e combinar. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Funções recebem entradas, executam uma responsabilidade e podem devolver um resultado com return. Uma boa função é pequena, possui nome descritivo e evita depender de estado externo.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Funções e retorno** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Defina o contrato antes da implementação.
- Prefira devolver valores em vez de alterar estado externo.
- Separe cálculo, entrada de dados e apresentação.

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
function calcularDesconto(preco, percentual) {
  const desconto = preco * (percentual / 100);
  return preco - desconto;
}

console.log(calcularDesconto(200, 15));
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Separe o cálculo de média, a classificação do resultado e a montagem da mensagem em três funções testáveis.

## Erros mais comuns

1. **Erro central:** Criar funções que fazem várias tarefas e dependem de variáveis globais ocultas.
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

Você estudou **Funções e retorno**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Uma função é uma unidade de comportamento com entradas, resultado e efeitos observáveis. Funções pequenas são mais fáceis de nomear, testar e combinar.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Funções e retorno:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. O que return faz?
   - A) Repete a função
   - B) Encerra a função e devolve um valor
   - C) Imprime automaticamente
   - D) Cria uma variável global

2. Qual prática torna "Funções e retorno" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Funções e retorno"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Funções e retorno"?
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

10. Quando a solução de "Funções e retorno" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique funções e retorno para alguém que nunca programou.
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

1. **B.** return encerra a execução daquela função e entrega o resultado ao chamador.
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

Crie uma função calcularMedia que receba três notas e retorne a média.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 8 — Arrow functions

> Módulo: Funções · Nível: Intermediário · Tempo sugerido: 15 minutos

## Objetivos da aula

- Explicar arrow functions usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **Funções e retorno**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **É um atalho de escrita, não um tipo totalmente diferente de cálculo.**

Arrow functions oferecem sintaxe compacta e capturam this do escopo externo. São adequadas para callbacks e transformações pequenas, mas não substituem toda declaração de função. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Arrow functions oferecem sintaxe curta e não criam o próprio this. São excelentes para callbacks, mas funções nomeadas ainda podem comunicar melhor a intenção em regras importantes.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Arrow functions** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Use retorno implícito apenas em expressões curtas.
- Lembre que arrow functions não possuem this nem arguments próprios.
- Escolha a forma que deixa intenção e depuração mais claras.

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
const dobrar = numero => numero * 2;
const numeros = [2, 4, 6];
const dobrados = numeros.map(dobrar);

console.log(dobrados);
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Reescreva callbacks de ordenação e mapeamento com arrows e explique onde uma função tradicional continua melhor.

## Erros mais comuns

1. **Erro central:** Usar arrow function como método quando o comportamento depende do this do objeto.
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

Você estudou **Arrow functions**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Arrow functions oferecem sintaxe compacta e capturam this do escopo externo. São adequadas para callbacks e transformações pequenas, mas não substituem toda declaração de função.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Arrow functions:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Uma arrow function cria seu próprio this?
   - A) Sim, sempre
   - B) Não
   - C) Somente com async
   - D) Somente sem parâmetros

2. Qual prática torna "Arrow functions" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Arrow functions"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Arrow functions"?
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

10. Quando a solução de "Arrow functions" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique arrow functions para alguém que nunca programou.
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

1. **B.** Arrow functions capturam o this do contexto em que foram criadas.
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

Crie uma arrow function que transforme um nome em uma saudação.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

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


---

# Aula 10 — Arrays na prática

> Módulo: Dados · Nível: Iniciante · Tempo sugerido: 18 minutos

## Objetivos da aula

- Explicar arrays na prática usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Revise as ideias essenciais do módulo anterior: contratos explícitos, nomes claros, validação e testes de casos normais, limites e falhas.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Um array é uma prateleira numerada, começando na posição zero.**

Arrays modelam coleções ordenadas. A escolha entre alterar a coleção e criar uma nova deve ser deliberada, pois referências compartilhadas tornam mutações observáveis em vários pontos. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Arrays armazenam listas ordenadas. Seus índices começam em zero. push adiciona no fim, includes verifica presença e length informa o tamanho.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Arrays na prática** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Valide índices e trate coleção vazia.
- Diferencie métodos mutáveis de métodos que retornam nova coleção.
- Copiar o array não copia profundamente os objetos internos.

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
const tarefas = ["Estudar", "Praticar"];
tarefas.push("Revisar");

console.log(tarefas[0]);
console.log(tarefas.length);
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Implemente inclusão, remoção e ordenação de aulas mantendo uma versão original para comparação.

## Erros mais comuns

1. **Erro central:** Usar sort diretamente e modificar uma coleção que deveria permanecer intacta.
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

Você estudou **Arrays na prática**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Arrays modelam coleções ordenadas. A escolha entre alterar a coleção e criar uma nova deve ser deliberada, pois referências compartilhadas tornam mutações observáveis em vários pontos.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Arrays na prática:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Qual é o índice do primeiro item?
   - A) 1
   - B) -1
   - C) 0
   - D) first

2. Qual prática torna "Arrays na prática" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Arrays na prática"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Arrays na prática"?
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

10. Quando a solução de "Arrays na prática" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique arrays na prática para alguém que nunca programou.
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

1. **C.** Os índices de arrays em JavaScript começam em zero.
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

Monte uma lista de tecnologias, adicione uma nova e mostre a primeira e a última.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 11 — map, filter e reduce

> Módulo: Dados · Nível: Intermediário · Tempo sugerido: 26 minutos

## Objetivos da aula

- Explicar map, filter e reduce usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **Arrays na prática**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **map é uma linha de montagem; filter é uma peneira; reduce é um resumo.**

map transforma, filter seleciona e reduce acumula. Uma sequência bem construída descreve o fluxo de dados sem efeitos colaterais no meio da operação. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

map transforma cada item, filter mantém itens que passam por uma condição e reduce combina toda a coleção em um único resultado. Esses métodos não precisam alterar o array original.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **map, filter e reduce** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- O callback de map deve devolver um valor para cada entrada.
- filter preserva itens cuja condição resulta em verdadeiro.
- reduce exige acumulador inicial compatível com o resultado.

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
const valores = [20, 35, 10];
const comTaxa = valores.map(valor => valor * 1.1);
const maiores = comTaxa.filter(valor => valor > 25);
const total = maiores.reduce((soma, valor) => soma + valor, 0);

console.log(total);
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Filtre alunos ativos, extraia suas notas e calcule a média com etapas nomeadas e casos para lista vazia.

## Erros mais comuns

1. **Erro central:** Usar map apenas para efeitos colaterais ou criar um reduce impossível de compreender.
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

Você estudou **map, filter e reduce**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: map transforma, filter seleciona e reduce acumula. Uma sequência bem construída descreve o fluxo de dados sem efeitos colaterais no meio da operação.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **map, filter e reduce:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Qual método produz um novo array com cada item transformado?
   - A) filter
   - B) map
   - C) find
   - D) reduce

2. Qual prática torna "map, filter e reduce" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "map, filter e reduce"?
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

7. Qual é o melhor primeiro passo antes de otimizar "map, filter e reduce"?
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

10. Quando a solução de "map, filter e reduce" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique map, filter e reduce para alguém que nunca programou.
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

1. **B.** map aplica uma transformação a cada item e devolve um novo array.
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

Filtre notas aprovadas, some-as e calcule a média usando métodos de array.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 12 — Objetos e desestruturação

> Módulo: Dados · Nível: Intermediário · Tempo sugerido: 22 minutos

## Objetivos da aula

- Explicar objetos e desestruturação usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **map, filter e reduce**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Um objeto é uma ficha organizada: cada campo possui um nome e um valor.**

Objetos agrupam propriedades relacionadas e expressam registros do domínio. Desestruturação reduz repetição, enquanto valores padrão tornam entradas parciais mais previsíveis. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Objetos agrupam valores relacionados por chaves. A desestruturação extrai propriedades de forma declarativa, e o spread cria cópias rasas com alterações pontuais.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Objetos e desestruturação** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Modele propriedades que pertencem à mesma entidade.
- Use optional chaining somente quando a ausência for realmente permitida.
- Evite objetos genéricos que misturam dados de domínios diferentes.

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
const aluno = {
  nome: "Caio",
  nivel: 3,
  ativo: true
};

const { nome, nivel } = aluno;
const atualizado = { ...aluno, nivel: nivel + 1 };
console.log(nome, atualizado);
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Modele uma aula com metadados, progresso e autor; depois crie uma função que produza um resumo sem alterar o objeto.

## Erros mais comuns

1. **Erro central:** Acessar cadeias profundas sem validar a estrutura recebida.
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

Você estudou **Objetos e desestruturação**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Objetos agrupam propriedades relacionadas e expressam registros do domínio. Desestruturação reduz repetição, enquanto valores padrão tornam entradas parciais mais previsíveis.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Objetos e desestruturação:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. O que o spread {...objeto} cria?
   - A) Uma cópia rasa das propriedades
   - B) Uma classe
   - C) Um array vazio
   - D) Uma cópia profunda automática

2. Qual prática torna "Objetos e desestruturação" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Objetos e desestruturação"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Objetos e desestruturação"?
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

10. Quando a solução de "Objetos e desestruturação" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique objetos e desestruturação para alguém que nunca programou.
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

1. **A.** O spread copia as propriedades de primeiro nível para um novo objeto.
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

Modele um produto e crie uma cópia com o preço atualizado sem alterar o original.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 13 — Selecionando elementos

> Módulo: DOM & Interface · Nível: Intermediário · Tempo sugerido: 20 minutos

## Objetivos da aula

- Explicar selecionando elementos usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Revise as ideias essenciais do módulo anterior: contratos explícitos, nomes claros, validação e testes de casos normais, limites e falhas.

## Introdução

Antes do código, pense nesta comparação cotidiana: **O DOM é um mapa vivo da página; seletores apontam para endereços nesse mapa.**

O DOM representa o documento como uma árvore de nós. Selecionar um elemento é apenas o começo: o código precisa considerar ausência, semântica e sincronização entre estado e interface. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

O DOM representa o documento como uma árvore de objetos. querySelector encontra o primeiro elemento compatível com um seletor CSS e permite ler ou alterar seu conteúdo.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Selecionando elementos** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Prefira seletores estáveis e específicos ao comportamento.
- Trate querySelector como resultado possivelmente nulo.
- Atualize propriedades apropriadas em vez de concatenar HTML não confiável.

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
const titulo = document.querySelector("#titulo");

if (titulo) {
  titulo.textContent = "JavaScript em ação";
  titulo.classList.add("destaque");
}
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Selecione uma lista de aulas, crie os itens com createElement e mostre um estado vazio quando não houver resultados.

## Erros mais comuns

1. **Erro central:** Usar innerHTML com conteúdo do usuário e abrir espaço para injeção de código.
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

Você estudou **Selecionando elementos**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: O DOM representa o documento como uma árvore de nós. Selecionar um elemento é apenas o começo: o código precisa considerar ausência, semântica e sincronização entre estado e interface.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Selecionando elementos:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Qual método aceita seletores CSS e retorna o primeiro elemento?
   - A) getElement
   - B) querySelector
   - C) findNode
   - D) selectOne

2. Qual prática torna "Selecionando elementos" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Selecionando elementos"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Selecionando elementos"?
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

10. Quando a solução de "Selecionando elementos" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique selecionando elementos para alguém que nunca programou.
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

1. **B.** querySelector usa a mesma linguagem de seletores do CSS.
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

Selecione um parágrafo por classe e troque seu texto com segurança.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 14 — Eventos e interação

> Módulo: DOM & Interface · Nível: Intermediário · Tempo sugerido: 23 minutos

## Objetivos da aula

- Explicar eventos e interação usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **Selecionando elementos**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Eventos são campainhas: o código escolhe quem escuta e como responder.**

Eventos comunicam que algo ocorreu na interface. O handler deve interpretar o evento, atualizar o estado necessário e produzir uma resposta previsível sem acumular listeners. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

addEventListener registra uma função para responder a um evento. O objeto event contém contexto sobre o que aconteceu e event.target aponta para o elemento que originou a interação.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Eventos e interação** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Use o objeto event para obter alvo e dados da interação.
- Aplique delegação quando muitos elementos compartilham comportamento.
- Remova listeners persistentes quando o componente deixa de existir.

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
const botao = document.querySelector("#salvar");

botao?.addEventListener("click", () => {
  console.log("Dados salvos!");
});
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Implemente uma lista com botões de concluir usando um único listener no elemento pai.

## Erros mais comuns

1. **Erro central:** Registrar o mesmo listener várias vezes e executar uma ação duplicada a cada clique.
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

Você estudou **Eventos e interação**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Eventos comunicam que algo ocorreu na interface. O handler deve interpretar o evento, atualizar o estado necessário e produzir uma resposta previsível sem acumular listeners.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Eventos e interação:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Qual método registra um ouvinte de evento?
   - A) onEvent
   - B) listen
   - C) addEventListener
   - D) watch

2. Qual prática torna "Eventos e interação" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Eventos e interação"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Eventos e interação"?
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

10. Quando a solução de "Eventos e interação" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique eventos e interação para alguém que nunca programou.
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

1. **C.** addEventListener conecta um tipo de evento a uma função de resposta.
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

Crie um botão contador que atualize um número na tela a cada clique.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 15 — Formulários confiáveis

> Módulo: DOM & Interface · Nível: Intermediário · Tempo sugerido: 25 minutos

## Objetivos da aula

- Explicar formulários confiáveis usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **Eventos e interação**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Um formulário é uma conversa: cada pergunta precisa de uma resposta clara e de feedback útil.**

Formulários convertem intenção humana em dados. Validação no cliente melhora a experiência, mas o servidor continua responsável por autorizar e validar toda operação. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

No evento submit, preventDefault evita o envio tradicional. FormData facilita a leitura dos campos. Valide perto da entrada e mostre mensagens específicas, sem culpar o usuário.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Formulários confiáveis** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Associe labels aos campos e mensagens ao erro correspondente.
- Normalize valores antes de validar.
- Preserve os dados válidos quando uma submissão falhar.

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
formulario.addEventListener("submit", evento => {
  evento.preventDefault();
  const dados = new FormData(evento.currentTarget);
  const email = String(dados.get("email") ?? "").trim();

  if (!email.includes("@")) {
    console.log("Informe um e-mail válido");
  }
});
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Crie um cadastro com nome, e-mail e senha, retornando erros por campo e um resumo acessível.

## Erros mais comuns

1. **Erro central:** Confiar apenas no atributo required e enviar dados sem validação no servidor.
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

Você estudou **Formulários confiáveis**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Formulários convertem intenção humana em dados. Validação no cliente melhora a experiência, mas o servidor continua responsável por autorizar e validar toda operação.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Formulários confiáveis:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Por que usar preventDefault no submit durante uma interface dinâmica?
   - A) Para apagar o formulário
   - B) Para impedir o envio/recarregamento padrão
   - C) Para esconder o botão
   - D) Para criar o FormData

2. Qual prática torna "Formulários confiáveis" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Formulários confiáveis"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Formulários confiáveis"?
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

10. Quando a solução de "Formulários confiáveis" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique formulários confiáveis para alguém que nunca programou.
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

1. **B.** preventDefault impede a ação padrão e deixa o código controlar o fluxo.
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

Valide nome e e-mail, exibindo mensagens diferentes para cada problema.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 16 — Entendendo Promises

> Módulo: Assíncrono · Nível: Intermediário · Tempo sugerido: 24 minutos

## Objetivos da aula

- Explicar entendendo promises usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Revise as ideias essenciais do módulo anterior: contratos explícitos, nomes claros, validação e testes de casos normais, limites e falhas.

## Introdução

Antes do código, pense nesta comparação cotidiana: **É como um protocolo de entrega: o pedido está pendente, chega ou falha, e você é avisado.**

Uma Promise representa um resultado que pode estar pendente, realizado ou rejeitado. Encadeamentos devem devolver valores ou novas promises para preservar a ordem e propagar falhas. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Uma Promise representa uma operação pendente que será cumprida ou rejeitada. then trata sucesso, catch trata falha e finally executa ao final em ambos os casos.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Entendendo Promises** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Toda operação assíncrona deve possuir caminho de sucesso e falha.
- Retorne a Promise criada dentro de then.
- Use finally apenas para limpeza que independe do resultado.

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
const espera = new Promise(resolve => {
  setTimeout(() => resolve("Concluído"), 500);
});

espera
  .then(resultado => console.log(resultado))
  .catch(erro => console.error(erro));
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Modele o carregamento de uma aula com estados loading, success e error e garanta a limpeza do indicador.

## Erros mais comuns

1. **Erro central:** Criar uma Promise manual ao redor de uma API que já devolve Promise.
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

Você estudou **Entendendo Promises**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Uma Promise representa um resultado que pode estar pendente, realizado ou rejeitado. Encadeamentos devem devolver valores ou novas promises para preservar a ordem e propagar falhas.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Entendendo Promises:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Quais estados finais uma Promise pode ter?
   - A) Ativa ou parada
   - B) Cumprida ou rejeitada
   - C) Aberta ou fechada
   - D) True ou false

2. Qual prática torna "Entendendo Promises" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Entendendo Promises"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Entendendo Promises"?
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

10. Quando a solução de "Entendendo Promises" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique entendendo promises para alguém que nunca programou.
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

1. **B.** Após pendente, uma Promise termina cumprida ou rejeitada.
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

Crie uma Promise que resolva uma mensagem após um pequeno intervalo.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 17 — async e await

> Módulo: Assíncrono · Nível: Intermediário · Tempo sugerido: 23 minutos

## Objetivos da aula

- Explicar async e await usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **Entendendo Promises**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **await é uma pausa organizada na sua fila, não uma trava em todo o programa.**

async/await descreve dependências assíncronas em sequência. Operações independentes podem iniciar juntas; operações dependentes devem aguardar o resultado anterior. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Uma função async sempre retorna uma Promise. await pausa apenas aquela função até a Promise terminar. Use try/catch para tratar falhas e finally para restaurar estados de carregamento.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **async e await** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Use try/catch no limite em que a falha pode ser tratada.
- Agrupe tarefas independentes com Promise.all.
- Evite await sequencial quando não existe dependência.

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
async function carregarPerfil() {
  try {
    const perfil = await buscarPerfil();
    console.log(perfil);
  } catch (erro) {
    console.error("Não foi possível carregar", erro);
  }
}
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Carregue perfil e progresso em paralelo, combine os resultados e apresente falha parcial de modo compreensível.

## Erros mais comuns

1. **Erro central:** Executar requisições independentes uma após outra e aumentar desnecessariamente a latência.
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

Você estudou **async e await**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: async/await descreve dependências assíncronas em sequência. Operações independentes podem iniciar juntas; operações dependentes devem aguardar o resultado anterior.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **async e await:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. O que uma função async retorna?
   - A) Sempre undefined
   - B) Uma Promise
   - C) Um evento
   - D) Um array

2. Qual prática torna "async e await" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "async e await"?
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

7. Qual é o melhor primeiro passo antes de otimizar "async e await"?
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

10. Quando a solução de "async e await" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique async e await para alguém que nunca programou.
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

1. **B.** Mesmo ao retornar um valor simples, async o envolve em uma Promise.
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

Reescreva uma cadeia .then/.catch usando async, await e try/catch.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 18 — Consumindo APIs

> Módulo: Assíncrono · Nível: Intermediário · Tempo sugerido: 28 minutos

## Objetivos da aula

- Explicar consumindo apis usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **async e await**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Uma API é um balcão de atendimento com pedidos e respostas padronizadas.**

fetch resolve mesmo quando o servidor retorna vários erros HTTP. O cliente deve verificar status, interpretar o corpo com segurança e limitar operações que podem ficar pendentes. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

fetch resolve mesmo em respostas HTTP como 404. Verifique response.ok, converta o corpo com json e diferencie erro de rede de erro da resposta.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Consumindo APIs** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Teste response.ok antes de confiar no corpo.
- Valide a estrutura do JSON recebido.
- Use AbortController para cancelamento e tempo limite.

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
async function buscarUsuario() {
  const resposta = await fetch("https://api.exemplo.dev/usuario");
  if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}`);
  }
  return resposta.json();
}
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Implemente uma função de consulta de curso com timeout, mensagens por status e validação mínima do objeto retornado.

## Erros mais comuns

1. **Erro central:** Tratar qualquer resposta resolvida como sucesso e ignorar status 400 ou 500.
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

Você estudou **Consumindo APIs**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: fetch resolve mesmo quando o servidor retorna vários erros HTTP. O cliente deve verificar status, interpretar o corpo com segurança e limitar operações que podem ficar pendentes.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Consumindo APIs:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. fetch rejeita automaticamente toda resposta 404?
   - A) Sim
   - B) Não
   - C) Somente com POST
   - D) Somente em localhost

2. Qual prática torna "Consumindo APIs" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Consumindo APIs"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Consumindo APIs"?
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

10. Quando a solução de "Consumindo APIs" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique consumindo apis para alguém que nunca programou.
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

1. **B.** fetch rejeita erros de rede; para erros HTTP, você deve verificar response.ok.
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

Crie uma função para buscar uma lista e retornar um array vazio em uma resposta sem conteúdo.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 19 — Módulos

> Módulo: JavaScript Moderno · Nível: Intermediário · Tempo sugerido: 20 minutos

## Objetivos da aula

- Explicar módulos usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Revise as ideias essenciais do módulo anterior: contratos explícitos, nomes claros, validação e testes de casos normais, limites e falhas.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Módulos são peças de LEGO: cada peça resolve algo e se conecta por encaixes definidos.**

Módulos dividem o sistema em unidades com interface pública explícita. Uma boa fronteira reduz acoplamento e impede que detalhes internos se espalhem pela aplicação. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Módulos permitem dividir o sistema em arquivos com responsabilidades claras. Exporte apenas o necessário e prefira dependências explícitas.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Módulos** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Exporte apenas o contrato necessário.
- Evite dependências circulares.
- Agrupe código por responsabilidade de domínio, não apenas por tipo de arquivo.

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
// matematica.js
export const somar = (a, b) => a + b;

// app.js
import { somar } from "./matematica.js";
console.log(somar(2, 3));
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Separe regras de progresso, persistência e interface em módulos e desenhe as dependências permitidas entre eles.

## Erros mais comuns

1. **Erro central:** Criar um módulo utilitário central que conhece todo o sistema e se torna impossível de testar isoladamente.
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

Você estudou **Módulos**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Módulos dividem o sistema em unidades com interface pública explícita. Uma boa fronteira reduz acoplamento e impede que detalhes internos se espalhem pela aplicação.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Módulos:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Qual palavra importa um valor exportado?
   - A) include
   - B) requirement
   - C) import
   - D) using

2. Qual prática torna "Módulos" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Módulos"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Módulos"?
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

10. Quando a solução de "Módulos" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique módulos para alguém que nunca programou.
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

1. **C.** import declara a dependência entre módulos JavaScript.
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

Separe uma função de formatação em um módulo e importe-a no arquivo principal.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 20 — Classes com propósito

> Módulo: JavaScript Moderno · Nível: Avançado · Tempo sugerido: 25 minutos

## Objetivos da aula

- Explicar classes com propósito usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **Módulos**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Uma classe é uma planta de construção; cada instância é uma casa construída a partir dela.**

Classes podem reunir estado e comportamento quando uma entidade possui ciclo de vida e invariantes. Para simples transformação de dados, funções e objetos costumam ser mais diretos. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Classes são uma sintaxe para criar objetos com estrutura e comportamento compartilhados. Prefira composição quando heranças profundas tornarem o sistema difícil de entender.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Classes com propósito** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Valide invariantes no construtor e nos métodos.
- Mantenha a interface pública pequena.
- Prefira composição quando herança não representa uma relação real.

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
class Conta {
  #saldo = 0;

  depositar(valor) {
    if (valor > 0) this.#saldo += valor;
  }

  consultarSaldo() {
    return this.#saldo;
  }
}
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Modele uma matrícula que impeça progresso negativo e não permita emitir certificado antes da conclusão.

## Erros mais comuns

1. **Erro central:** Criar classes apenas para armazenar dados, acrescentando complexidade sem proteger comportamento.
2. Começar a codificar sem definir o resultado esperado.
3. Testar somente o caminho feliz.
4. Misturar cálculo, entrada e apresentação em um único bloco.
5. Ignorar mensagens de erro em vez de investigar sua origem.

## Dicas profissionais

- Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
- Analise custo de tempo e memória, identifique alocações e evite trabalho repetido em loops ou renderizações. Meça antes de otimizar.
- Escreva uma frase explicando o contrato antes da implementação.
- Prefira exemplos pequenos que possam ser executados e conferidos.
- Durante a revisão, procure estados inválidos e dependências ocultas.

## Resumo da aula

Você estudou **Classes com propósito**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Classes podem reunir estado e comportamento quando uma entidade possui ciclo de vida e invariantes. Para simples transformação de dados, funções e objetos costumam ser mais diretos.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Classes com propósito:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. O que o prefixo # representa em um campo de classe?
   - A) Campo global
   - B) Campo privado
   - C) Comentário
   - D) ID do objeto

2. Qual prática torna "Classes com propósito" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Classes com propósito"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Classes com propósito"?
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

10. Quando a solução de "Classes com propósito" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique classes com propósito para alguém que nunca programou.
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

1. **B.** Campos com # são privados à classe e não podem ser acessados diretamente de fora.
2. **B.** Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
3. **C.** Os defeitos mais comuns surgem de coerção implícita, estado compartilhado, valores ausentes e caminhos de erro não tratados. Modele esses casos antes do caminho feliz.
4. **B.** Entendimento, implementação e verificação conectam teoria a comportamento observável.
5. **B.** O exemplo reduz o problema para tornar o mecanismo visível; depois ele deve ser adaptado.
6. **C.** Contratos só são úteis quando entradas inválidas recebem uma resposta previsível.
7. **A.** Analise custo de tempo e memória, identifique alocações e evite trabalho repetido em loops ou renderizações. Meça antes de otimizar.
8. **C.** Os três grupos verificam comportamento comum, fronteiras e respostas a condições inválidas.
9. **B.** Um nome preciso reduz a carga mental e ajuda outras pessoas a revisar o comportamento.
10. **C.** Conclusão exige critérios observáveis, inclusive para limites e falhas.

### Orientação para questões abertas

Respostas adequadas devem definir o conceito com palavras próprias, relacionar teoria e prática, explicitar contratos, apresentar pelo menos um caso inválido e justificar as decisões. Nos estudos de caso, avalie segurança, clareza, possibilidade de teste e comportamento em falhas.

## Desafio prático

Crie uma classe Tarefa que controle título e estado de conclusão.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 21 — Imutabilidade prática

> Módulo: JavaScript Moderno · Nível: Avançado · Tempo sugerido: 22 minutos

## Objetivos da aula

- Explicar imutabilidade prática usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **Classes com propósito**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **É como editar uma cópia do documento em vez de rabiscar o original de todos.**

Imutabilidade significa produzir um novo estado em vez de alterar silenciosamente o anterior. Isso facilita comparação, histórico, depuração e atualização de interfaces. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Imutabilidade significa criar novos valores em vez de alterar estruturas compartilhadas. Isso facilita rastrear mudanças, testar regras e evitar efeitos colaterais.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Imutabilidade prática** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Use spread conscientemente: a cópia é superficial.
- Atualize apenas o ramo necessário da estrutura.
- Não confunda imutabilidade com proibição de todo estado.

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
const usuario = { nome: "Bia", pontos: 10 };
const atualizado = {
  ...usuario,
  pontos: usuario.pontos + 5
};

console.log(usuario.pontos, atualizado.pontos);
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Atualize o progresso de uma aula dentro de uma trilha sem modificar nenhum objeto da versão anterior.

## Erros mais comuns

1. **Erro central:** Copiar o objeto externo e modificar um objeto interno ainda compartilhado.
2. Começar a codificar sem definir o resultado esperado.
3. Testar somente o caminho feliz.
4. Misturar cálculo, entrada e apresentação em um único bloco.
5. Ignorar mensagens de erro em vez de investigar sua origem.

## Dicas profissionais

- Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
- Analise custo de tempo e memória, identifique alocações e evite trabalho repetido em loops ou renderizações. Meça antes de otimizar.
- Escreva uma frase explicando o contrato antes da implementação.
- Prefira exemplos pequenos que possam ser executados e conferidos.
- Durante a revisão, procure estados inválidos e dependências ocultas.

## Resumo da aula

Você estudou **Imutabilidade prática**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Imutabilidade significa produzir um novo estado em vez de alterar silenciosamente o anterior. Isso facilita comparação, histórico, depuração e atualização de interfaces.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Imutabilidade prática:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Qual operação preserva o objeto original?
   - A) objeto.valor++
   - B) delete objeto.valor
   - C) { ...objeto, valor: novoValor }
   - D) objeto.valor = novoValor

2. Qual prática torna "Imutabilidade prática" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Imutabilidade prática"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Imutabilidade prática"?
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

10. Quando a solução de "Imutabilidade prática" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique imutabilidade prática para alguém que nunca programou.
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

1. **C.** O spread cria um novo objeto e a propriedade posterior substitui o valor copiado.
2. **B.** Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
3. **C.** Os defeitos mais comuns surgem de coerção implícita, estado compartilhado, valores ausentes e caminhos de erro não tratados. Modele esses casos antes do caminho feliz.
4. **B.** Entendimento, implementação e verificação conectam teoria a comportamento observável.
5. **B.** O exemplo reduz o problema para tornar o mecanismo visível; depois ele deve ser adaptado.
6. **C.** Contratos só são úteis quando entradas inválidas recebem uma resposta previsível.
7. **A.** Analise custo de tempo e memória, identifique alocações e evite trabalho repetido em loops ou renderizações. Meça antes de otimizar.
8. **C.** Os três grupos verificam comportamento comum, fronteiras e respostas a condições inválidas.
9. **B.** Um nome preciso reduz a carga mental e ajuda outras pessoas a revisar o comportamento.
10. **C.** Conclusão exige critérios observáveis, inclusive para limites e falhas.

### Orientação para questões abertas

Respostas adequadas devem definir o conceito com palavras próprias, relacionar teoria e prática, explicitar contratos, apresentar pelo menos um caso inválido e justificar as decisões. Nos estudos de caso, avalie segurança, clareza, possibilidade de teste e comportamento em falhas.

## Desafio prático

Atualize um item específico de um array de objetos sem alterar o array original.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 22 — Projeto: Task Flow

> Módulo: Projetos Reais · Nível: Intermediário · Tempo sugerido: 45 minutos

## Objetivos da aula

- Explicar projeto: task flow usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Revise as ideias essenciais do módulo anterior: contratos explícitos, nomes claros, validação e testes de casos normais, limites e falhas.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Um projeto forte nasce por camadas: dados, regras e interface.**

Um gerenciador de tarefas combina estado, renderização, eventos, validação e persistência. Separar essas responsabilidades evita que cada clique dependa diretamente do HTML inteiro. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Construa primeiro o modelo de dados, depois as funções puras e só então conecte a interface. Separe criar, atualizar, remover, filtrar e persistir tarefas.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Projeto: Task Flow** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Defina um modelo de tarefa com identificador estável.
- Centralize mudanças de estado em operações nomeadas.
- Renderize estados vazio, carregando e erro.

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
const estado = { tarefas: [] };

function adicionarTarefa(titulo) {
  const tarefa = {
    id: crypto.randomUUID(),
    titulo,
    concluida: false
  };
  estado.tarefas = [...estado.tarefas, tarefa];
}
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Desenhe o fluxo adicionar → validar → persistir → renderizar e escreva um teste para cada transição.

## Erros mais comuns

1. **Erro central:** Usar o texto visível como identificador e quebrar edição, duplicidade ou remoção.
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

Você estudou **Projeto: Task Flow**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Um gerenciador de tarefas combina estado, renderização, eventos, validação e persistência. Separar essas responsabilidades evita que cada clique dependa diretamente do HTML inteiro.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Projeto: Task Flow:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Qual etapa deve vir antes de estilizar a lista?
   - A) Escolher animações
   - B) Definir dados e regras
   - C) Publicar o projeto
   - D) Criar um logotipo

2. Qual prática torna "Projeto: Task Flow" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Projeto: Task Flow"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Projeto: Task Flow"?
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

10. Quando a solução de "Projeto: Task Flow" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique projeto: task flow para alguém que nunca programou.
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

1. **B.** Definir o modelo e as regras primeiro reduz retrabalho na interface.
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

Implemente adicionar, concluir, excluir, filtrar e salvar tarefas no localStorage.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 23 — Projeto: Data Pulse

> Módulo: Projetos Reais · Nível: Avançado · Tempo sugerido: 55 minutos

## Objetivos da aula

- Explicar projeto: data pulse usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **Projeto: Task Flow**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Uma boa tela conta toda a jornada do dado, inclusive quando ele demora ou falha.**

Aplicações orientadas a API precisam representar latência, falhas e dados incompletos. A interface deve continuar compreensível durante cada estado da requisição. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Modele os estados de uma busca: ocioso, carregando, sucesso, vazio e erro. Uma interface robusta não considera apenas o caminho feliz.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Projeto: Data Pulse** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Modele carregamento, sucesso vazio, sucesso com dados e falha.
- Cancele requisições obsoletas.
- Não misture o formato externo da API com o modelo interno sem adaptação.

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
const estado = {
  status: "idle",
  dados: [],
  erro: null
};

async function carregar() {
  estado.status = "loading";
  // buscar, validar, transformar e renderizar
}
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Implemente uma pesquisa que cancele a consulta anterior e converta a resposta externa para um modelo local validado.

## Erros mais comuns

1. **Erro central:** Exibir dados da última consulta depois que uma resposta mais lenta chega fora de ordem.
2. Começar a codificar sem definir o resultado esperado.
3. Testar somente o caminho feliz.
4. Misturar cálculo, entrada e apresentação em um único bloco.
5. Ignorar mensagens de erro em vez de investigar sua origem.

## Dicas profissionais

- Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
- Analise custo de tempo e memória, identifique alocações e evite trabalho repetido em loops ou renderizações. Meça antes de otimizar.
- Escreva uma frase explicando o contrato antes da implementação.
- Prefira exemplos pequenos que possam ser executados e conferidos.
- Durante a revisão, procure estados inválidos e dependências ocultas.

## Resumo da aula

Você estudou **Projeto: Data Pulse**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: Aplicações orientadas a API precisam representar latência, falhas e dados incompletos. A interface deve continuar compreensível durante cada estado da requisição.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Projeto: Data Pulse:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. Qual estado evita uma tela vazia enquanto os dados chegam?
   - A) loading
   - B) success
   - C) deleted
   - D) cached

2. Qual prática torna "Projeto: Data Pulse" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Projeto: Data Pulse"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Projeto: Data Pulse"?
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

10. Quando a solução de "Projeto: Data Pulse" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique projeto: data pulse para alguém que nunca programou.
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

1. **A.** O estado loading comunica que a operação está em andamento.
2. **B.** Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
3. **C.** Os defeitos mais comuns surgem de coerção implícita, estado compartilhado, valores ausentes e caminhos de erro não tratados. Modele esses casos antes do caminho feliz.
4. **B.** Entendimento, implementação e verificação conectam teoria a comportamento observável.
5. **B.** O exemplo reduz o problema para tornar o mecanismo visível; depois ele deve ser adaptado.
6. **C.** Contratos só são úteis quando entradas inválidas recebem uma resposta previsível.
7. **A.** Analise custo de tempo e memória, identifique alocações e evite trabalho repetido em loops ou renderizações. Meça antes de otimizar.
8. **C.** Os três grupos verificam comportamento comum, fronteiras e respostas a condições inválidas.
9. **B.** Um nome preciso reduz a carga mental e ajuda outras pessoas a revisar o comportamento.
10. **C.** Conclusão exige critérios observáveis, inclusive para limites e falhas.

### Orientação para questões abertas

Respostas adequadas devem definir o conceito com palavras próprias, relacionar teoria e prática, explicitar contratos, apresentar pelo menos um caso inválido e justificar as decisões. Nos estudos de caso, avalie segurança, clareza, possibilidade de teste e comportamento em falhas.

## Desafio prático

Crie um dashboard que busque dados, mostre carregamento, trate falha e permita tentar novamente.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.


---

# Aula 24 — Projeto final: Dev Portfolio

> Módulo: Projetos Reais · Nível: Avançado · Tempo sugerido: 70 minutos

## Objetivos da aula

- Explicar projeto final: dev portfolio usando o modelo de execução do JavaScript.
- Implementar uma solução pequena com nomes, contratos e fluxo de controle explícitos.
- Validar comportamento normal, caso de limite e entrada inválida antes de considerar a solução pronta.

## Revisão antes de começar

Na aula anterior você estudou **Projeto: Data Pulse**. Recorde o contrato, o exemplo e o principal erro antes de avançar.

## Introdução

Antes do código, pense nesta comparação cotidiana: **Seu projeto final é uma narrativa: problema, processo, solução e aprendizado.**

O projeto final integra conteúdo, interface, dados e qualidade operacional. A entrega só está pronta quando funciona em diferentes telas, possui estados de falha e pode ser reproduzida por outra pessoa. Esta aula parte do significado do conceito, explica por que ele existe e mostra quando sua aplicação melhora o programa.

## Explicação completa

### O que é

Planeje conteúdo, componentes, estados, acessibilidade, responsividade e publicação. Um portfólio deve explicar decisões e resultados, não apenas exibir screenshots.

### Por que existe

Programas precisam transformar uma intenção humana em instruções precisas. **Projeto final: Dev Portfolio** oferece uma forma organizada de representar essa intenção, reduzir repetição e tornar o comportamento verificável.

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

- Defina critérios de aceite antes de programar.
- Teste fluxos completos e casos de fronteira.
- Documente decisões, execução local e limitações conhecidas.

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
const projeto = {
  problema: "O que precisa ser resolvido?",
  decisao: "Por que esta abordagem?",
  resultado: "O que passou a funcionar?",
  aprendizado: "O que eu faria melhor?"
};
```

### Como analisar o exemplo

Leia cada linha perguntando: qual valor entra, qual transformação ocorre e qual resultado pode ser observado? Depois altere um valor por vez para entender a relação entre causa e efeito.

### Novo cenário

Crie uma matriz de aceite do portfólio cobrindo conteúdo, responsividade, acessibilidade, desempenho e publicação.

## Erros mais comuns

1. **Erro central:** Investir apenas na aparência e deixar navegação, acessibilidade ou tratamento de erro sem validação.
2. Começar a codificar sem definir o resultado esperado.
3. Testar somente o caminho feliz.
4. Misturar cálculo, entrada e apresentação em um único bloco.
5. Ignorar mensagens de erro em vez de investigar sua origem.

## Dicas profissionais

- Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
- Analise custo de tempo e memória, identifique alocações e evite trabalho repetido em loops ou renderizações. Meça antes de otimizar.
- Escreva uma frase explicando o contrato antes da implementação.
- Prefira exemplos pequenos que possam ser executados e conferidos.
- Durante a revisão, procure estados inválidos e dependências ocultas.

## Resumo da aula

Você estudou **Projeto final: Dev Portfolio**, entendeu sua finalidade, observou um exemplo e definiu verificações. A ideia principal é: O projeto final integra conteúdo, interface, dados e qualidade operacional. A entrega só está pronta quando funciona em diferentes telas, possui estados de falha e pode ser reproduzida por outra pessoa.

## Glossário

- **Entrada:** dado recebido por uma operação.
- **Saída:** resultado produzido e observável.
- **Contrato:** regras que definem entradas aceitas, resultado e possíveis falhas.
- **Estado:** conjunto de valores que descreve a situação atual do programa.
- **Validação:** verificação de que um dado respeita formato e limites.
- **Projeto final: Dev Portfolio:** conceito central desta aula, aplicado conforme a explicação e o exemplo anteriores.

## Exercícios

### 10 questões objetivas

1. O que mais diferencia um bom estudo de caso?
   - A) Muitas cores
   - B) Explicar problema, decisões e resultado
   - C) Usar apenas imagens
   - D) Esconder dificuldades

2. Qual prática torna "Projeto final: Dev Portfolio" mais segura em um projeto real?
   - A) Ignorar entradas inválidas
   - B) Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
   - C) Ocultar todas as falhas
   - D) Otimizar antes de medir

3. Qual risco merece atenção ao aplicar "Projeto final: Dev Portfolio"?
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

7. Qual é o melhor primeiro passo antes de otimizar "Projeto final: Dev Portfolio"?
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

10. Quando a solução de "Projeto final: Dev Portfolio" pode ser considerada concluída?
   - A) Quando compila uma única vez
   - B) Quando parece bonita
   - C) Quando atende ao contrato e passa pelas verificações definidas
   - D) Quando não existem mensagens de erro visíveis

### 5 questões dissertativas

1. Explique projeto final: dev portfolio para alguém que nunca programou.
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

1. **B.** Decisões bem explicadas demonstram raciocínio, não apenas acabamento visual.
2. **B.** Crie pelo menos três verificações: exemplo nominal, valor de fronteira e falha esperada. Registre a saída real e compare-a com um resultado definido antes da execução.
3. **C.** Os defeitos mais comuns surgem de coerção implícita, estado compartilhado, valores ausentes e caminhos de erro não tratados. Modele esses casos antes do caminho feliz.
4. **B.** Entendimento, implementação e verificação conectam teoria a comportamento observável.
5. **B.** O exemplo reduz o problema para tornar o mecanismo visível; depois ele deve ser adaptado.
6. **C.** Contratos só são úteis quando entradas inválidas recebem uma resposta previsível.
7. **A.** Analise custo de tempo e memória, identifique alocações e evite trabalho repetido em loops ou renderizações. Meça antes de otimizar.
8. **C.** Os três grupos verificam comportamento comum, fronteiras e respostas a condições inválidas.
9. **B.** Um nome preciso reduz a carga mental e ajuda outras pessoas a revisar o comportamento.
10. **C.** Conclusão exige critérios observáveis, inclusive para limites e falhas.

### Orientação para questões abertas

Respostas adequadas devem definir o conceito com palavras próprias, relacionar teoria e prática, explicitar contratos, apresentar pelo menos um caso inválido e justificar as decisões. Nos estudos de caso, avalie segurança, clareza, possibilidade de teste e comportamento em falhas.

## Desafio prático

Construa um portfólio responsivo com projetos, estudo de caso, contato e documentação das decisões.

**Critérios de aceite:** solução executável, nomes claros, caso normal, caso de limite, entrada inválida e uma explicação curta das decisões.
