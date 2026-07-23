import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminClient from "@/app/admin-client";
import { ProductHeader } from "@/app/product-header";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Administração" };

export default async function AdminPage() {
  const user = await getSessionUser();
  if (!user) redirect("/entrar");
  if (user.role !== "admin") redirect("/app");
  return <main className="product-page"><ProductHeader user={user} /><AdminClient /></main>;
}
