# Configuração do NexaCode AI SaaS

> Nunca coloque valores reais de chaves, senhas ou URLs privadas no Git. Use
> `.env.local` no computador e os cofres de variáveis da Vercel e do Railway em produção.

## Supabase

Use PostgreSQL 15 ou superior. A aplicação recebe a URL do pooler em
`SUPABASE_DATABASE_URL`; as migrações usam `SUPABASE_DIRECT_URL`.

```powershell
Copy-Item .env.example .env.local
npm install
npm run db:migrate
```

A migração inicial cria 27 tabelas, índices, relações, planos e trilhas. O RLS
fica ativo e sem políticas públicas: o navegador nunca acessa as tabelas
diretamente. O backend Node usa a conexão privada do banco.

Antes de alterações estruturais em produção, crie um backup no painel do
Supabase e teste a migração em um projeto de staging.

## Railway e Vercel

Cadastre no Railway e na Vercel:

- `SUPABASE_DATABASE_URL`;
- `APP_ENV=production`;
- `APP_URL`;
- `ADMIN_EMAILS`;
- variáveis Cakto, Resend e, opcionalmente, OpenAI.

Cadastre `BACKEND_URL` somente na Vercel, apontando para o domínio Railway.

`SUPABASE_DIRECT_URL` é necessária somente no ambiente administrativo que
executa migrações. Evite expô-la ao runtime quando não for necessária.

## Cakto

Cadastre as ofertas mensal e anual de Pro e Equipes. Configure o webhook em
`https://SEU-BACKEND-RAILWAY/api/billing/cakto/webhook` para compras,
assinaturas, renovações, recusas, cancelamentos, reembolsos e chargebacks.
O segredo, os IDs de oferta e a idempotência são verificados no servidor.

## Resend

Valide seu domínio, configure `RESEND_API_KEY` e use um remetente autorizado em
`EMAIL_FROM`. Sem essas variáveis, o cadastro continua disponível, porém
confirmação, recuperação e convites informam que o envio está pendente.

## Mentor remoto opcional

O mentor didático local funciona sem serviços externos. Para habilitar respostas
remotas, configure somente no Railway:

- `AI_PROVIDER=openai`;
- `OPENAI_API_KEY`;
- `OPENAI_MODEL=gpt-5.6-luna` ou outro modelo compatível com Responses API.

A chave nunca deve ser cadastrada como `NEXT_PUBLIC_*`. Se a API remota falhar, o
produto usa o motor local e identifica a contingência na própria resposta.

## Administração

Defina `ADMIN_EMAILS` antes de cadastrar a conta administrativa. A autorização
é validada novamente nas páginas e APIs protegidas.

## Validação de release

```powershell
npm test
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
```

Depois do deploy, confirme `/`, `/entrar`, `/precos`, uma rota privada e
`/api/health`.
