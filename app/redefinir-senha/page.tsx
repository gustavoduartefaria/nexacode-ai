import type { Metadata } from "next";
import AuthForm from "@/app/auth-form";
import { AuthShell } from "@/app/auth-shell";

export const metadata: Metadata = {
  title: "Redefinir senha",
  description: "Crie uma nova senha para sua conta NexaCode AI.",
};

export default async function ResetPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;
  return <AuthShell><AuthForm mode="reset-password" token={token} /></AuthShell>;
}
