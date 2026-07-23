import { publicAppUrl, runtimeValue } from "@/lib/runtime-env";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function emailDeliveryConfigured() {
  return Boolean(runtimeValue("RESEND_API_KEY") && runtimeValue("EMAIL_FROM"));
}

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = runtimeValue("RESEND_API_KEY");
  const from = runtimeValue("EMAIL_FROM");
  if (!apiKey || !from) return { sent: false, reason: "not_configured" as const };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, html }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Falha no provedor de e-mail (${response.status}): ${detail.slice(0, 180)}`);
  }
  return { sent: true as const };
}

function emailFrame(title: string, message: string, action: string, url: string) {
  return `
    <div style="background:#06080d;padding:32px;font-family:Arial,sans-serif;color:#f5f7fb">
      <div style="max-width:560px;margin:auto;border:1px solid #252d3a;border-radius:20px;padding:32px;background:#0a0e15">
        <div style="font-weight:900;letter-spacing:.04em;color:#57f2cc">NEXACODE AI</div>
        <h1 style="font-size:28px;line-height:1.1;margin:24px 0 12px">${escapeHtml(title)}</h1>
        <p style="color:#a5afbd;line-height:1.7">${escapeHtml(message)}</p>
        <a href="${escapeHtml(url)}" style="display:inline-block;margin-top:18px;padding:13px 20px;border-radius:10px;background:#57f2cc;color:#04110e;text-decoration:none;font-weight:800">${escapeHtml(action)}</a>
        <p style="margin-top:26px;color:#687386;font-size:12px;line-height:1.6">Se você não solicitou esta ação, ignore esta mensagem.</p>
      </div>
    </div>`;
}

export async function sendVerificationEmail(
  request: Request,
  email: string,
  name: string,
  token: string,
) {
  const url = `${publicAppUrl(request)}/verificar-email?token=${encodeURIComponent(token)}`;
  return sendEmail(
    email,
    "Confirme seu e-mail no NexaCode AI",
    emailFrame(
      `Bem-vindo, ${name}`,
      "Confirme seu endereço para proteger sua conta e liberar todas as funções do seu plano.",
      "Confirmar meu e-mail",
      url,
    ),
  );
}

export async function sendPasswordResetEmail(
  request: Request,
  email: string,
  token: string,
) {
  const url = `${publicAppUrl(request)}/redefinir-senha?token=${encodeURIComponent(token)}`;
  return sendEmail(
    email,
    "Redefina sua senha do NexaCode AI",
    emailFrame(
      "Redefinição de senha",
      "Recebemos um pedido para criar uma nova senha. Este link expira em 30 minutos.",
      "Criar nova senha",
      url,
    ),
  );
}

export async function sendOrganizationInvitationEmail(
  request: Request,
  email: string,
  organizationName: string,
  token: string,
) {
  const url = `${publicAppUrl(request)}/convite?token=${encodeURIComponent(token)}`;
  return sendEmail(
    email,
    `Convite para ${organizationName} no NexaCode AI`,
    emailFrame(
      `Você foi convidado para ${organizationName}`,
      "Aceite o convite para acessar as trilhas e acompanhar o progresso junto da sua equipe.",
      "Aceitar convite",
      url,
    ),
  );
}
