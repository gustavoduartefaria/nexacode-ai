# NexaCode AI

## Leitura guiada de JavaScript

As 24 aulas de JavaScript possuem material escrito original do NexaCode AI. Cada
leitura apresenta uma visão técnica, três pontos-chave, um erro comum e uma prática
orientada. O conteúdo complementa teoria, exemplos, micromissões, revisão de
engenharia e checkpoints sem depender de vídeos externos.

SaaS educacional para aprender JavaScript, Python e C++ com prática orientada,
mentor contextual e progresso sincronizado. A versão 4.2 usa Next.js oficial em
Node.js, PostgreSQL no Supabase, frontend na Vercel e backend no Railway.

## Produção

- Frontend: https://nexacode-ai.vercel.app
- Backend e healthcheck: https://nexacode-ai-production.up.railway.app/api/health
- Repositório: https://github.com/gustavoduartefaria/nexacode-ai
- Cobrança: quatro checkouts recorrentes na Cakto, com ciclos mensal e anual para
  Pro e Equipes.
- Webhook: eventos de compra, assinatura, renovação, recusa, cancelamento,
  reembolso e chargeback são enviados diretamente ao Railway.

Para receber vendas reais, o proprietário da conta ainda precisa concluir a
verificação financeira/KYC exibida no painel da Cakto. Essa etapa exige dados
pessoais e bancários do titular e não deve ser automatizada ou armazenada no
repositório.

## Conteúdo

- 44 aulas: 24 de JavaScript, 10 de Python e 10 de C++.
- Objetivos verificáveis e pré-requisitos em cada aula.
- Explicação conceitual, modelo mental e exemplo executável.
- Revisão de engenharia: produção, falhas, testes e desempenho.
- Micromissão prática e checkpoint com feedback.
- Code Lab JavaScript isolado em Web Worker.
- Python e C++ com instruções honestas para execução externa segura.
- Mentor contextual híbrido, com OpenAI opcional, fallback local, limite por plano e histórico controlado.

## Plataforma SaaS

- Cadastro, login, logout, confirmação de e-mail e recuperação de senha.
- PBKDF2-SHA-256, cookies HTTP-only e revogação de sessões.
- Planos Starter, Pro e Equipes com autorização no servidor.
- Cakto integrada com checkout, webhook autenticado, idempotência e controle de acesso.
- Stripe preservada como provedor alternativo.
- Resend preparado para confirmação, recuperação e convites.
- Organizações, membros, papéis, convites e turmas.
- Certificados verificáveis, painel administrativo, auditoria e LGPD.
- Central de notificações persistentes para conta, certificados e cobrança.
- Funil comercial com UTMs, eventos de conversão e página dedicada ao plano Equipes.
- Tema claro/escuro, PWA, acessibilidade e layout responsivo.

## Arquitetura

- Next.js 16 com App Router e runtime Node.js.
- React 19 e TypeScript.
- PostgreSQL do Supabase com Drizzle ORM e `postgres.js`.
- Pool de conexões compatível com Railway e funções serverless da Vercel.
- Migrações SQL versionadas em `supabase/migrations`.
- Row Level Security ativada para bloquear acesso anônimo pelo Data API.
- Cakto/Stripe e Resend executados somente no backend.
- OpenAI Responses API opcional, somente no backend e sem armazenar respostas remotamente.
- Proxy `/api` da Vercel para o backend Railway por `BACKEND_URL`.
- Proteção de origem para mutações de navegador, com exceções explícitas para webhooks assinados.

O aplicativo não depende de Cloudflare Workers, D1, Vinext ou Wrangler.

## Executar no Windows

1. Instale o [Node.js 22 LTS](https://nodejs.org/).
2. Extraia o ZIP.
3. Dê dois cliques em `ABRIR NEXACODE AI.bat`.
4. Abra o arquivo `.env.local` criado automaticamente e configure o Supabase.
5. Execute novamente o inicializador.

Sem o banco configurado, a landing page abre, mas cadastro, login e progresso
permanecem indisponíveis de forma transparente.

## Executar pelo PowerShell

```powershell
Copy-Item .env.example .env.local
npm install
npm run db:migrate
npm run dev
```

Abra `http://localhost:3147`.

## Configurar o Supabase

1. Crie um projeto em https://supabase.com/dashboard.
2. Abra **Project Settings > Database > Connection string**.
3. Copie a URL do pooler de transações, porta 6543, para
   `SUPABASE_DATABASE_URL`.
4. Copie a URL direta, porta 5432, para `SUPABASE_DIRECT_URL`.
5. Substitua `[YOUR-PASSWORD]` pela senha do banco e salve `.env.local`.
6. Execute `npm run db:migrate`.

As URLs são segredos. Nunca as envie ao Git ou coloque em variáveis
`NEXT_PUBLIC_*`.

## Publicar na Vercel + Railway

1. Envie o projeto para o GitHub.
2. Em https://vercel.com/new, importe o repositório.
3. Publique primeiro o backend no Railway usando `railway.toml`.
4. No Railway, cadastre o banco, Cakto, Resend, `APP_ENV=production` e a futura URL da Vercel em `APP_URL`.
5. Na Vercel, cadastre as variáveis descritas em `.env.example` e defina `BACKEND_URL` com o domínio do Railway.
6. A Vercel detectará Next.js e usará `vercel.json`.
7. Faça o deploy e confirme `/api/health` pelo domínio da Vercel.

Execute as migrações antes do primeiro deploy. Instruções detalhadas estão em
`DEPLOY-VERCEL-RAILWAY.md`, `CAKTO-INTEGRATION.md`, `SAAS-SETUP.md` e
`MARKETING-PLAYBOOK.md`.

## Verificação

```powershell
npm test
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
```

## Variáveis

- `SUPABASE_DATABASE_URL`: pooler usado pela aplicação.
- `SUPABASE_DIRECT_URL`: conexão direta usada pelas migrações.
- `APP_ENV`, `APP_URL` e `ADMIN_EMAILS`.
- `RESEND_API_KEY` e `EMAIL_FROM`.
- `AI_PROVIDER=local|openai`, `OPENAI_API_KEY` e `OPENAI_MODEL`.
- `BACKEND_URL`: backend Railway usado pelo frontend Vercel.
- `BILLING_PROVIDER=cakto`, segredo, URLs de checkout e IDs de oferta da Cakto.
- Variáveis Stripe somente se esse provedor alternativo for escolhido.

Sem Cakto/Stripe, Resend ou OpenAI, o produto não simula integrações remotas: a interface
informa a condição real e o mentor usa explicitamente o motor didático local.

## Rotas principais

- `/` — landing page;
- `/cadastro` e `/entrar` — autenticação;
- `/app` — plataforma de aprendizagem;
- `/precos` — planos;
- `/para-equipes` — oferta comercial para escolas e empresas;
- `/conta` — perfil e privacidade;
- `/equipe` — organizações e turmas;
- `/admin` — operações protegidas;
- `/certificado/CODIGO` — verificação pública;
- `/api/health` — saúde do serviço e do Supabase.
- `/api/marketing/events` — eventos anônimos de aquisição e conversão.
- `/api/billing/cakto/webhook` — recebimento autenticado de eventos da Cakto.

## Segurança

- conexão do banco somente no servidor;
- prepared statements desativados para o pooler transacional do Supabase;
- chaves estrangeiras e exclusões em cascata controladas;
- RLS sem políticas públicas nas tabelas do produto;
- rate limiting, validação de entrada e trilha de auditoria;
- CSP, HSTS na Vercel, proteção contra framing e cache privado excluído da PWA;
- exportação e exclusão de conta conforme LGPD.
