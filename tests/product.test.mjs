import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("o produto contém três trilhas, laboratório, mentor e progresso local", async () => {
  const [app, data, multi, mentor] = await Promise.all([
    read("app/nexacode-app.tsx"),
    read("lib/course-data.ts"),
    read("lib/multilanguage-data.ts"),
    read("lib/mentor.ts"),
  ]);

  assert.match(app, /new Worker/);
  assert.match(app, /localStorage/);
  assert.match(app, /serviceWorker/);
  assert.match(app, /Code Lab/);
  assert.match(app, /Mentor IA/);
  assert.match(app, /completedChallenges/);
  assert.match(app, /LanguageSwitcher/);
  assert.match(app, /activeLanguage/);
  assert.match(app, /Python e C\+\+ usam missões/);
  assert.equal((data.match(/\n      lesson\(/g) ?? []).length, 24);
  assert.equal((data.match(/\n    id: "/g) ?? []).length >= 14, true);
  const [pythonBlock, cppBlock] = multi.split("export const cppModules");
  assert.equal((pythonBlock.match(/\n      lesson\(/g) ?? []).length, 10);
  assert.equal((cppBlock.match(/\n      lesson\(/g) ?? []).length, 10);
  assert.equal((multi.match(/language: "python"/g) ?? []).length, 5);
  assert.equal((multi.match(/language: "cpp"/g) ?? []).length, 5);
  assert.match(mentor, /inspectCode/);
  assert.match(mentor, /buildMentorAnswer/);
  assert.match(mentor, /languageName/);
  assert.match(mentor, /calculateLearningScore/);
});

test("PWA, nova marca, launcher e metadados estão configurados", async () => {
  const [manifest, worker, launcher, layout, brand, loop] = await Promise.all([
    read("public/manifest.webmanifest"),
    read("public/sw.js"),
    read("ABRIR NEXACODE AI.bat"),
    read("app/layout.tsx"),
    read("app/nexa-brand.tsx"),
    read("PROMPT-LOOP-NEXACODE.md"),
  ]);
  const parsedManifest = JSON.parse(manifest);

  assert.equal(parsedManifest.display, "standalone");
  assert.equal(parsedManifest.lang, "pt-BR");
  assert.equal(parsedManifest.icons.length, 2);
  assert.match(parsedManifest.name, /JavaScript, Python e C\+\+/);
  assert.match(worker, /CACHE_NAME/);
  assert.match(worker, /nexacode-ai-v2/);
  assert.match(worker, /caches\.match/);
  assert.match(launcher, /localhost:3147/);
  assert.match(launcher, /npm\.cmd run dev/);
  assert.match(layout, /NexaCode AI/);
  assert.match(layout, /og\.png/);
  assert.match(layout, /JavaScript, Python e C\+\+/);
  assert.match(brand, /nexa-mark-rail/);
  assert.match(loop, /CRITÉRIO DE PARADA/);
});

test("o laboratório usa execução isolada e limite de tempo", async () => {
  const app = await read("app/nexacode-app.tsx");
  assert.match(app, /new Blob/);
  assert.match(app, /worker\.terminate/);
  assert.match(app, /3000/);
  assert.match(app, /Execução interrompida/);
});

test("cadastro tem três etapas, persistência segura e páginas legais", async () => {
  const [page, client, api, schema, hosting, terms, privacy] = await Promise.all([
    read("app/cadastro/page.tsx"),
    read("app/cadastro/cadastro-client.tsx"),
    read("app/api/profile/route.ts"),
    read("db/schema.ts"),
    read(".openai/hosting.json"),
    read("app/termos/page.tsx"),
    read("app/privacidade/page.tsx"),
  ]);
  const hostingConfig = JSON.parse(hosting);

  assert.match(page, /getChatGPTUser/);
  assert.match(page, /getStudentProfile/);
  assert.match(client, /ETAPA 01 · IDENTIDADE/);
  assert.match(client, /ETAPA 02 · OBJETIVO/);
  assert.match(client, /ETAPA 03 · ROTINA/);
  assert.match(client, /nexacode-device-profile-v1/);
  assert.match(client, /\/api\/profile/);
  assert.doesNotMatch(client, /type="password"/);
  assert.match(api, /acceptedTerms/);
  assert.match(api, /onConflictDoUpdate/);
  assert.match(schema, /student_profiles/);
  assert.equal(hostingConfig.d1, "DB");
  assert.match(terms, /O NexaCode não recebe nem armazena sua senha/);
  assert.match(privacy, /Não vendemos seus dados/);
});
