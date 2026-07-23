import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthForm from "@/app/auth-form";
import { AuthShell } from "@/app/auth-shell";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Criar conta",
  description: "Crie gratuitamente seu workspace no NexaCode AI.",
};

export default async function CadastroPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; cycle?: string }>;
}) {
  if (await getSessionUser()) redirect("/app");
  const params = await searchParams;
  const desiredPlan = params.plan === "pro" || params.plan === "teams" ? params.plan : undefined;
  const desiredCycle = params.cycle === "monthly" ? "monthly" : "annual";
  return (
    <AuthShell>
      <AuthForm mode="register" desiredPlan={desiredPlan} desiredCycle={desiredCycle} />
    </AuthShell>
  );
}
