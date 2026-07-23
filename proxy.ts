import { NextRequest, NextResponse } from "next/server";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
const EXTERNAL_WEBHOOKS = new Set([
  "/api/billing/webhook",
  "/api/billing/cakto/webhook",
]);

function normalizedOrigin(value: string | null | undefined) {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  if (SAFE_METHODS.has(request.method) || EXTERNAL_WEBHOOKS.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const requestOrigin = normalizedOrigin(request.headers.get("origin"));
  const configuredOrigin = normalizedOrigin(process.env.APP_URL);
  const allowedOrigins = new Set(
    [request.nextUrl.origin, configuredOrigin].filter((value): value is string => Boolean(value)),
  );
  const fetchSite = request.headers.get("sec-fetch-site");

  if (fetchSite === "cross-site" || (requestOrigin && !allowedOrigins.has(requestOrigin))) {
    return NextResponse.json(
      { error: "Origem da requisição não autorizada." },
      { status: 403 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
