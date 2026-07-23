import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthForm from "@/app/auth-form";
import { AuthShell } from "@/app/auth-shell";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse seu workspace NexaCode AI.",
};

export default async function LoginPage() {
  if (await getSessionUser()) redirect("/app");
  return <AuthShell><AuthForm mode="login" /></AuthShell>;
}
