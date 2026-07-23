import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProductHeader } from "@/app/product-header";
import TeamClient from "@/app/team-client";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Equipe" };

export default async function TeamPage() {
  const user = await getSessionUser();
  if (!user) redirect("/entrar");
  if (user.planId !== "teams") redirect("/precos");
  return <main className="product-page"><ProductHeader user={user} /><TeamClient /></main>;
}
