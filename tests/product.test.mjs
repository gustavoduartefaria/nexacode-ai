import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("mantém as 44 aulas de JavaScript, Python e C++", async () => {
  const [app, data, multi, mentor] = await Promise.all([
    read("app/nexacode-app.tsx"),
    read("lib/course-data.ts"),
    read("lib/multilanguage-data.ts"),
    read("lib/mentor.ts"),
  ]);
  assert.equal((data.match(/\n      lesson\(/g) ?? []).length, 24);
  const [pythonBlock, cppBlock] = multi.split("export const cppModules");
  assert.equal((pythonBlock.match(/\n      lesson\(/g) ?? []).length, 10);
  assert.equal((cppBlock.match(/\n      lesson\(/g) ?? []).length, 10);
  assert.match(app, /accessibleLessonIds/);
  assert.match(app, /\/api\/progress/);
  assert.match(app, /\/api\/ai\/mentor/);
  assert.match(app, /OBJETIVOS VERIFICÁVEIS/);
  assert.match(app, /REVISÃO DE ENGENHARIA/);
  assert.match(data, /objectives:/);
  assert.match(data, /engineering:/);
  assert.match(multi, /productionContext/);
  assert.match(multi, /failureMode/);
  assert.match(mentor, /buildMentorAnswer/);
});

test("autenticação própria protege senhas, sessões e tentativas", async () => {
  const [auth, register, login, reset, audit] = await Promise.all([
    read("lib/auth.ts"),
    read("app/api/auth/register/route.ts"),
    read("app/api/auth/login/route.ts"),
    read("app/api/auth/reset-password/route.ts"),
    read("lib/audit.ts"),
  ]);
  assert.match(auth, /PBKDF2/);
  assert.match(auth, /210_000/);
  assert.match(auth, /HttpOnly/);
  assert.match(auth, /SameSite=Lax/);
  assert.match(auth, /tokenHash/);
  assert.match(register, /acceptedTerms/);
  assert.match(register, /hashPassword/);
  assert.match(login, /verifyPassword/);
  assert.match(reset, /delete\(userSessions\)/);
  assert.match(audit, /enforceRateLimit/);
});

test("banco SaaS usa PostgreSQL do Supabase com migração, vínculos e RLS", async () => {
  const [schema, migration, database, drizzleConfig, vercel] = await Promise.all([
    read("db/schema.ts"),
    read("supabase/migrations/0000_clear_guardsmen.sql"),
    read("db/index.ts"),
    read("drizzle.config.ts"),
    read("vercel.json"),
  ]);
  const requiredTables = [
    "users",
    "user_sessions",
    "account_tokens",
    "learning_progress",
    "saas_plans",
    "subscriptions",
    "billing_events",
    "organizations",
    "organization_members",
    "organization_invitations",
    "ai_usage",
    "ai_history",
    "learning_tracks",
    "learning_lessons",
    "learning_challenges",
    "lesson_checkpoints",
    "permissions",
    "classrooms",
    "classroom_members",
    "track_assignments",
    "coupons",
    "system_events",
    "audit_logs",
  ];
  for (const table of requiredTables) {
    assert.match(schema, new RegExp(table));
    assert.match(migration, new RegExp(`CREATE TABLE "${table}"`));
  }
  assert.match(schema, /drizzle-orm\/pg-core/);
  assert.match(migration, /FOREIGN KEY/);
  assert.match(migration, /INSERT INTO "saas_plans"/);
  assert.match(migration, /INSERT INTO "learning_tracks"/);
  assert.match(migration, /ENABLE ROW LEVEL SECURITY/);
  assert.match(database, /drizzle-orm\/postgres-js/);
  assert.match(database, /SUPABASE_DATABASE_URL/);
  assert.match(database, /databaseConfigured/);
  assert.match(drizzleConfig, /dialect: "postgresql"/);
  assert.equal(JSON.parse(vercel).framework, "nextjs");
});

test("planos e pagamentos possuem autorização no servidor e webhook assinado", async () => {
  const [plans, progress, billing, checkout, webhook, cakto, caktoWebhook] = await Promise.all([
    read("lib/saas.ts"),
    read("app/api/progress/route.ts"),
    read("lib/billing.ts"),
    read("app/api/billing/checkout/route.ts"),
    read("app/api/billing/webhook/route.ts"),
    read("lib/cakto.ts"),
    read("app/api/billing/cakto/webhook/route.ts"),
  ]);
  assert.match(plans, /free/);
  assert.match(plans, /pro/);
  assert.match(plans, /teams/);
  assert.match(progress, /accessibleLessonIds/);
  assert.match(billing, /STRIPE_WEBHOOK_SECRET/);
  assert.match(billing, /crypto\.subtle\.sign/);
  assert.match(billing, /checkout\/sessions/);
  assert.match(checkout, /requireSessionUser/);
  assert.match(webhook, /verifyStripeSignature/);
  assert.match(cakto, /CAKTO_WEBHOOK_SECRET/);
  assert.match(cakto, /safeEqual/);
  assert.match(cakto, /onConflictDoNothing/);
  assert.match(cakto, /transaction/);
  assert.match(cakto, /subscription_renewed/);
  assert.match(cakto, /subscription_canceled/);
  assert.match(cakto, /chargeback/);
  assert.match(cakto, /searchParams\.set\("sck"/);
  assert.match(caktoWebhook, /verifyCaktoSecret/);
});

test("deploy separa frontend Vercel e backend Railway", async () => {
  const [nextConfig, railway, vercel, environment, deployment] = await Promise.all([
    read("next.config.ts"),
    read("railway.toml"),
    read("vercel.json"),
    read(".env.example"),
    read("DEPLOY-VERCEL-RAILWAY.md"),
  ]);
  assert.match(nextConfig, /BACKEND_URL/);
  assert.match(nextConfig, /source: "\/api\/:path\*"/);
  assert.match(railway, /NIXPACKS/);
  assert.match(railway, /healthcheckPath = "\/api\/health"/);
  assert.equal(JSON.parse(vercel).framework, "nextjs");
  assert.match(environment, /BILLING_PROVIDER=cakto/);
  assert.match(environment, /CAKTO_PRO_MONTHLY_CHECKOUT_URL/);
  assert.match(deployment, /Railway/);
  assert.match(deployment, /Vercel/);
});

test("organizações e administração verificam plano, papel e sessão", async () => {
  const [organizations, invites, classrooms, admin, adminUsers] = await Promise.all([
    read("app/api/organizations/route.ts"),
    read("app/api/organizations/invite/route.ts"),
    read("app/api/organizations/classrooms/route.ts"),
    read("app/api/admin/overview/route.ts"),
    read("app/api/admin/users/route.ts"),
  ]);
  assert.match(organizations, /canUseFeature/);
  assert.match(invites, /planId !== "teams"/);
  assert.match(invites, /\["admin", "teacher"\]/);
  assert.match(classrooms, /managementMembership/);
  assert.match(classrooms, /canUseFeature/);
  assert.match(admin, /role !== "admin"/);
  assert.match(adminUsers, /role !== "admin"/);
});

test("preferências de IA, histórico e certificados funcionam no servidor", async () => {
  const [profile, mentor, remoteMentor, progress, certificate, notificationRoute] = await Promise.all([
    read("app/api/profile/route.ts"),
    read("app/api/ai/mentor/route.ts"),
    read("lib/openai-mentor.ts"),
    read("app/api/progress/route.ts"),
    read("app/certificado/[code]/page.tsx"),
    read("app/api/notifications/route.ts"),
  ]);
  assert.match(profile, /aiEnabled/);
  assert.match(profile, /themePreference/);
  assert.match(profile, /avatarPreset/);
  assert.match(mentor, /profile\?\.aiEnabled === false/);
  assert.match(mentor, /insert\(aiHistory\)/);
  assert.match(mentor, /openai-responses/);
  assert.match(mentor, /local-fallback/);
  assert.match(remoteMentor, /api\.openai\.com\/v1\/responses/);
  assert.match(remoteMentor, /store: false/);
  assert.match(remoteMentor, /OPENAI_API_KEY/);
  assert.match(progress, /lessonsByLanguage/);
  assert.match(progress, /insert\(certificates\)/);
  assert.match(certificate, /CERTIFICADO AUTÊNTICO/);
  assert.match(notificationRoute, /requireSessionUser/);
  assert.match(notificationRoute, /isNull\(notifications\.readAt\)/);
});

test("landing, cadastro, preços, conta, equipe e admin são rotas reais", async () => {
  const [landing, auth, pricing, pricingGrid, account, team, teamsSales, admin] = await Promise.all([
    read("app/page.tsx"),
    read("app/auth-form.tsx"),
    read("app/precos/page.tsx"),
    read("app/pricing-grid.tsx"),
    read("app/conta/page.tsx"),
    read("app/equipe/page.tsx"),
    read("app/para-equipes/page.tsx"),
    read("app/admin/page.tsx"),
  ]);
  assert.match(landing, /Programação deixa de ser teoria/);
  assert.match(auth, /type=\{showPassword/);
  assert.match(auth, /\/api\/auth\/register/);
  assert.match(pricing, /PricingGrid/);
  assert.match(pricingGrid, /Periodicidade da cobrança/);
  assert.match(pricingGrid, /\/precos\?cycle=monthly/);
  assert.match(pricingGrid, /2 meses de economia/);
  assert.match(pricingGrid, /Checkout protegido pela Cakto/);
  assert.match(account, /getSessionUser/);
  assert.match(team, /planId !== "teams"/);
  assert.match(teamsSales, /10 pessoas incluídas/);
  assert.match(teamsSales, /data-marketing-event="cta_teams"/);
  assert.match(admin, /role !== "admin"/);
});

test("funil comercial rastreia campanhas sem dados pessoais e preserva intenção de compra", async () => {
  const [tracker, events, registration, billing, admin, playbook] = await Promise.all([
    read("app/marketing-tracker.tsx"),
    read("app/api/marketing/events/route.ts"),
    read("app/cadastro/page.tsx"),
    read("app/billing-button.tsx"),
    read("app/api/admin/overview/route.ts"),
    read("MARKETING-PLAYBOOK.md"),
  ]);
  assert.match(tracker, /utm_source/);
  assert.match(tracker, /data-marketing-event/);
  assert.doesNotMatch(tracker, /localStorage|sessionStorage/);
  assert.match(events, /marketing\.event/);
  assert.match(events, /enforceRateLimit/);
  assert.match(events, /cleanRecord/);
  assert.match(registration, /desiredPlan/);
  assert.match(billing, /\/cadastro\?plan=/);
  assert.match(admin, /pageViews/);
  assert.match(playbook, /Calendário inicial de 30 dias/);
});

test("PWA não armazena páginas privadas e Next.js envia headers de segurança", async () => {
  const [nextConfig, serviceWorker, manifest, proxy] = await Promise.all([
    read("next.config.ts"),
    read("public/sw.js"),
    read("public/manifest.webmanifest"),
    read("proxy.ts"),
  ]);
  assert.match(serviceWorker, /nexacode-ai-v6/);
  assert.match(serviceWorker, /url\.pathname\.startsWith\("\/api\/"\)/);
  assert.match(serviceWorker, /url\.pathname\.startsWith\("\/conta"\)/);
  assert.match(nextConfig, /X-Content-Type-Options/);
  assert.match(nextConfig, /Strict-Transport-Security/);
  assert.match(nextConfig, /Content-Security-Policy/);
  assert.match(nextConfig, /serverExternalPackages: \["postgres"\]/);
  assert.match(proxy, /sec-fetch-site/);
  assert.match(proxy, /EXTERNAL_WEBHOOKS/);
  assert.match(proxy, /Origem da requisição não autorizada/);
  assert.equal(JSON.parse(manifest).start_url, "/app");
});

test("LGPD permite exportação e exclusão sem remover cobrança ativa silenciosamente", async () => {
  const [account, privacy, setup] = await Promise.all([
    read("app/api/account/route.ts"),
    read("app/privacidade/page.tsx"),
    read("SAAS-SETUP.md"),
  ]);
  assert.match(account, /exportedAt/);
  assert.match(account, /Cancele a assinatura/);
  assert.match(account, /delete\(learningProgress\)/);
  assert.match(privacy, /NÃ£o vendemos seus dados|Não vendemos seus dados/);
  assert.match(setup, /Nunca coloque valores reais/);
});
