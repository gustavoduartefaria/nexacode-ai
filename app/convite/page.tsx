import type { Metadata } from "next";
import { AuthShell } from "@/app/auth-shell";
import TokenAction from "@/app/token-action";

export const metadata: Metadata = { title: "Convite de equipe" };

export default async function InvitationPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;
  return <AuthShell><TokenAction token={token} action="accept-invitation" /></AuthShell>;
}
