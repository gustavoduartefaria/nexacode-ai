# Integração Cakto

O NexaCode implementa diretamente no backend o fluxo demonstrado no tutorial
"Como receber pagamentos no teu SaaS": checkout, webhook, validação do segredo,
identificação do cliente e liberação do plano.

## Eventos aceitos

- `purchase_approved`, `subscription_created` e `subscription_renewed`: ativam o plano;
- `subscription_renewal_refused`: marca a assinatura como pendente;
- `subscription_canceled`, `refund` e `chargeback`: removem o acesso pago;
- eventos repetidos são ignorados por uma chave idempotente no banco.

O endpoint é `POST /api/billing/cakto/webhook`. Em produção, use diretamente o
domínio do Railway para que o pagamento não dependa do proxy da Vercel.

## Configuração

1. Crie na Cakto as ofertas mensais e anuais de Pro e Equipes.
2. Copie as quatro URLs de checkout e IDs de oferta para as variáveis `CAKTO_*`.
3. Em **Integrações > Webhooks**, crie um webhook para a URL do Railway.
4. Selecione os eventos listados acima e os produtos NexaCode.
5. Copie o segredo gerado para `CAKTO_WEBHOOK_SECRET` no Railway e na Vercel.
6. Envie um evento de teste e confira `billing_events` no Supabase.

O checkout recebe `sck=<id-do-usuario>`, parâmetro de rastreamento preservado no
pedido. O backend usa esse identificador para associar a compra com segurança e
usa o e-mail apenas como fallback. O segredo nunca é persistido no histórico.

## Segurança operacional

- não exponha chaves Cakto em variáveis `NEXT_PUBLIC_*`;
- mantenha uma oferta associada a apenas um plano e periodicidade;
- altere o segredo se ele aparecer em logs, capturas ou repositórios;
- valide compra, renovação, recusa, cancelamento, reembolso e chargeback antes da venda;
- o endpoint responde rapidamente e executa a atualização em transação PostgreSQL.
