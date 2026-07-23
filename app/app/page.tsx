import type { Metadata } from "next";
import { redirect } from "next/navigation";
import NexaCodeApp from "@/app/nexacode-app";
import { getSessionUser } from "@/lib/auth";
import { getCloudProgress } from "@/lib/progress";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Workspace",
  description: "Seu espaço de aprendizagem no NexaCode AI.",
};

export default async function WorkspacePage() {
  const user = await getSessionUser();
  if (!user) redirect("/entrar?returnTo=%2Fapp");
  const initialProgress = await getCloudProgress(user.id);
  return <NexaCodeApp user={user} cloudProgress={initialProgress} />;
}
