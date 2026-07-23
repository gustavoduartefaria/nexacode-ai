# Deploy: Supabase + Railway + Vercel

## Ordem recomendada

1. Crie o PostgreSQL no Supabase e aplique `npm run db:migrate`.
2. Publique o repositório no Railway como serviço Node.js.
3. Cadastre no Railway `SUPABASE_DATABASE_URL`, Cakto, Resend e administração.
4. Gere um domínio público Railway e confirme `/api/health`.
5. Importe o mesmo repositório na Vercel.
6. Cadastre `BACKEND_URL=https://SEU-BACKEND.up.railway.app` somente na Vercel.
7. Cadastre as demais variáveis na Vercel para renderização autenticada.
8. Defina `APP_URL` nos dois serviços como o domínio público da Vercel.
9. Configure o webhook Cakto diretamente para o domínio Railway.

## Variáveis por ambiente

### Railway

- `SUPABASE_DATABASE_URL`;
- `APP_ENV=production`;
- `APP_URL=https://SEU-SITE.vercel.app`;
- `BILLING_PROVIDER=cakto` e todas as variáveis `CAKTO_*`;
- `ADMIN_EMAILS`, Resend e integrações opcionais;
- não configure `BACKEND_URL`, evitando um proxy para o próprio serviço.

### Vercel

- as mesmas variáveis de runtime;
- `BACKEND_URL` apontando para o Railway;
- não é necessário disponibilizar `SUPABASE_DIRECT_URL`.

## Validação

Confirme `/`, `/entrar`, `/cadastro`, `/precos`, `/api/health`, cadastro real,
login, persistência de progresso e um evento Cakto de teste. O health check do
Railway só fica verde quando o PostgreSQL estiver acessível.
