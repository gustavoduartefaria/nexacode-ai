import type { Metadata } from "next";
import AuthForm from "@/app/auth-form";
import { AuthShell } from "@/app/auth-shell";

export const metadata: Metadata = {
  title: "Recuperar senha",
  description: "Solicite um link seguro para recuperar sua conta NexaCode AI.",
};

export default function RecoverPage() {
  return <AuthShell><AuthForm mode="request-reset" /></AuthShell>;
}
