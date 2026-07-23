# NexaCode AI

SaaS educacional para aprender JavaScript, Python e C++ com prática orientada,
mentor contextual e progresso sincronizado. A versão 4.1 usa Next.js oficial em
Node.js, PostgreSQL no Supabase, frontend na Vercel e backend no Railway.

## Conteúdo

- 44 aulas: 24 de JavaScript, 10 de Python e 10 de C++.
- Objetivos verificáveis e pré-requisitos em cada aula.
- Explicação conceitual, modelo mental e exemplo executável.
- Revisão de engenharia: produção, falhas, testes e desempenho.
- Micromissão prática e checkpoint com feedback.
- Code Lab JavaScript isolado em Web Worker.
- Python e C++ com instruções honestas para execução externa segura.
- Mentor contextual local, com limite por plano e histórico controlado.

## Plataforma SaaS

- Cadastro, login, logout, confirmação de e-mail e recuperação de senha.
- PBKDF2-SHA-256, cookies HTTP-only e revogação de sessões.
- Planos Starter, Pro e Equipes com autorização no servidor.
- Cakto integrada com checkout, webhook autenticado, idempotência e controle de acesso.
- Stripe preservada como provedor alternativo.
- Resend preparado para confirmação, recuperação e convites.
- Organizações, membros, papéis, convites e turmas.
- Certificados verificáveis, painel administrativo, auditoria e LGPD.
- Tema claro/escuro, PWA, acessibilidade e layout responsivo.

## Arquitetura

- Next.js 16 com App Router e runtime Node.js.
- React 19 e TypeScript.
- PostgreSQL do Supabase com Drizzle ORM e `postgres.js`.
- Pool de conexões compatível com Railway e funções serverless da Vercel.
- Migrações SQL versionadas em `supabase/migrations`.
- Row Level Security ativada para bloquear acesso anônimo pelo Data API.
- Cakto/Stripe e Resend executados somente no backend.
- Proxy `/api` da Vercel para o backend Railway por `BACKEND_URL`.

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
`DEPLOY-VERCEL-RAILWAY.md`, `CAKTO-INTEGRATION.md` e `SAAS-SETUP.md`.

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
- `BACKEND_URL`: backend Railway usado pelo frontend Vercel.
- `BILLING_PROVIDER=cakto`, segredo, URLs de checkout e IDs de oferta da Cakto.
- Variáveis Stripe somente se esse provedor alternativo for escolhido.

Sem Cakto/Stripe ou Resend, o produto não simula sucesso: a interface informa que a
integração aguarda configuração.

## Rotas principais

- `/` — landing page;
- `/cadastro` e `/entrar` — autenticação;
- `/app` — plataforma de aprendizagem;
- `/precos` — planos;
- `/conta` — perfil e privacidade;
- `/equipe` — organizações e turmas;
- `/admin` — operações protegidas;
- `/certificado/CODIGO` — verificação pública;
- `/api/health` — saúde do serviço e do Supabase.
- `/api/billing/cakto/webhook` — recebimento autenticado de eventos da Cakto.

## Segurança

- conexão do banco somente no servidor;
- prepared statements desativados para o pooler transacional do Supabase;
- chaves estrangeiras e exclusões em cascata controladas;
- RLS sem políticas públicas nas tabelas do produto;
- rate limiting, validação de entrada e trilha de auditoria;
- CSP, HSTS na Vercel, proteção contra framing e cache privado excluído da PWA;
- exportação e exclusão de conta conforme LGPD.
