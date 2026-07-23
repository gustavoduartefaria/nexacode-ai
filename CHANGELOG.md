# Changelog

## 4.3.1 — Movimento amigável e acessível

- Entrada suave de conteúdo ao rolar nas páginas inicial, Planos e Equipes.
- Sequência visual nos cards de método, linguagens, benefícios, preços e perguntas.
- Prévia da plataforma com progresso, código e flutuação discretamente animados.
- Microinterações aprimoradas em botões, indicadores e perguntas frequentes.
- Fallback seguro sem conteúdo oculto quando JavaScript não estiver disponível.
- Respeito integral à preferência de movimento reduzido do sistema.
- Cache da PWA renovado para distribuir a experiência visual atualizada.

## 4.3.0 — Funil comercial e aquisição

- Rastreamento próprio de UTMs, visualizações e cliques sem coletar dados pessoais.
- Continuidade do plano escolhido entre preços, cadastro e checkout.
- Página comercial dedicada a escolas e empresas.
- Métricas de aquisição dos últimos 30 dias no painel administrativo.
- Seções de público, resultados esperados e dúvidas frequentes na landing page.
- Playbook com calendário de conteúdo, roteiro de vídeos, prospecção B2B e métricas.

## 4.2.0 — Mentor híbrido, segurança e notificações

- Mentor híbrido com OpenAI Responses API opcional e fallback local identificado.
- Contabilização atômica de uso do mentor e registro da origem de cada resposta.
- Central de notificações persistentes para cadastro, certificados e cobrança.
- Proteção central de origem para chamadas mutáveis da API.
- Remoção do adaptador legado e não utilizado de autenticação do ChatGPT.

## 4.1.0 — Cakto + Railway

- Backend preparado para Railway e proxy de APIs configurável na Vercel.
- Checkout Cakto para Pro e Equipes nos ciclos mensal e anual.
- Webhook Cakto autenticado, transacional e idempotente.
- Ativação, renovação, inadimplência, cancelamento, reembolso e chargeback sincronizados.
- Associação segura do checkout ao usuário pelo parâmetro de rastreamento `sck`.
- Página de planos redesenhada com comparação mensal/anual e estados de confiança.
- Documentação de produção para Supabase, Railway, Vercel e Cakto.

## 4.0.0 — Supabase + Vercel

- Migração do runtime Cloudflare/Vinext para Next.js padrão executado em Node.js.
- Persistência substituída por PostgreSQL no Supabase com Drizzle ORM e conexões preparadas para o pooler.
- Migração inicial com 27 tabelas, chaves estrangeiras, dados-base e Row Level Security habilitado.
- Configuração de produção para Vercel, região de São Paulo e build standalone.
- Variáveis de ambiente documentadas para banco, aplicação, Stripe e Resend.
- As 44 aulas agora possuem objetivos verificáveis, pré-requisitos e revisão de engenharia.
- Conteúdo técnico ampliado com contexto de produção, modos de falha, testes e desempenho.
- Headers HTTP de segurança centralizados no Next.js e cache PWA atualizado para a versão 4.
- Dependências de produção atualizadas e runtime legado removido.

## 3.0.0 — SaaS Foundation

- Nova landing page pública, página de preços e experiência visual SaaS.
- Autenticação própria com cadastro, login, logout, confirmação de e-mail e recuperação de senha.
- Senhas protegidas com PBKDF2-SHA-256, sessões HTTP-only e limitação de tentativas.
- Progresso sincronizado no banco, com migração automática do progresso local existente.
- Planos Starter, Pro e Equipes com permissões verificadas no servidor.
- Integração Stripe preparada para checkout, portal de assinatura e webhooks assinados.
- Integração Resend preparada para confirmação, recuperação e convites.
- Organizações, papéis e convites para o plano Equipes.
- Turmas persistentes, contagem real de membros e base para trilhas atribuídas.
- Painel administrativo protegido, auditoria e indicadores de produto.
- Preferências sincronizadas de avatar, tema e ativação do mentor.
- Histórico limitado do mentor e emissão automática de certificados verificáveis.
- Catálogo persistente preparado para trilhas, aulas, desafios e checkpoints.
- Páginas dedicadas para erro controlado e rota não encontrada.
- Exportação e exclusão de dados em conformidade com a LGPD.
- Service worker corrigido para nunca armazenar páginas ou APIs privadas em cache.
- Headers adicionais de segurança, health check, sitemap e robots.txt.
