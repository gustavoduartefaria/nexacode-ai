# Publicação no Supabase, Railway e Vercel

> O guia operacional completo está em `DEPLOY-VERCEL-RAILWAY.md`.

## 1. Criar o banco

1. Crie um projeto no Supabase.
2. Guarde a senha do banco em um gerenciador de senhas.
3. Copie a conexão direta e a conexão do pooler de transações.
4. Configure as URLs em `.env.local`.
5. Execute `npm run db:migrate`.
6. Abra o SQL Editor e confirme a existência das tabelas `users`,
   `student_profiles`, `learning_progress` e `saas_plans`.

## 2. Testar localmente

```powershell
npm run dev
```

Crie uma conta de teste, conclua uma aula, saia e entre novamente. O progresso
deve permanecer salvo.

## 3. Publicar o backend no Railway

1. Crie um projeto a partir do repositório GitHub.
2. O Railway usará `railway.toml` para build e inicialização.
3. Cadastre `SUPABASE_DATABASE_URL`, `APP_URL`, Cakto e Resend.
4. Gere o domínio público e valide `/api/health`.

## 4. Publicar o frontend na Vercel

1. Importe o repositório GitHub na Vercel.
2. Mantenha o framework **Next.js**.
3. Cadastre `SUPABASE_DATABASE_URL` para Production e Preview.
4. Cadastre `BACKEND_URL` com o domínio público do Railway.
5. Cadastre as demais variáveis de `.env.example` conforme o ambiente.
6. Publique.
7. Altere `APP_URL` nos dois serviços para o domínio definitivo e faça novo deploy.

## 5. Configurar serviços externos

- Cakto: webhook no Railway em `/api/billing/cakto/webhook` e quatro ofertas.
- Resend: domínio verificado, chave e remetente.
- Domínio: adicione na Vercel e atualize `APP_URL`.

## 6. Rollback

Use **Deployments > Promote to Production** para promover uma versão anterior
na Vercel. Migrações destrutivas exigem restauração do backup do Supabase; esta
versão contém somente a criação inicial do esquema.
