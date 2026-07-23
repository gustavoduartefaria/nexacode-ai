export function runtimeValue(key: string): string {
  return process.env[key] ?? "";
}

export function publicAppUrl(request?: Request): string {
  const configured = runtimeValue("APP_URL").replace(/\/$/, "");
  if (configured) return configured;
  if (request) return new URL(request.url).origin;
  if (runtimeValue("VERCEL_URL")) return `https://${runtimeValue("VERCEL_URL")}`;
  return "http://localhost:3147";
}
