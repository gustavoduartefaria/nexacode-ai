import type { Metadata } from "next";
import { AuthShell } from "@/app/auth-shell";
import TokenAction from "@/app/token-action";

export const metadata: Metadata = { title: "Confirmar e-mail" };

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;
  return <AuthShell><TokenAction token={token} action="verify-email" /></AuthShell>;
}
