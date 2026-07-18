import type { Metadata } from "next";
import { chatGPTSignInPath, getChatGPTUser } from "@/app/chatgpt-auth";
import { getStudentProfile } from "@/db/profiles";
import CadastroClient from "./cadastro-client";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Criar conta",
  description: "Crie seu perfil de aprendizagem e personalize sua trilha de JavaScript.",
};

export default async function CadastroPage() {
  const user = await getChatGPTUser();
  const profile = user ? await getStudentProfile(user.email) : null;

  return (
    <CadastroClient
      mode={user ? "authenticated" : "device"}
      verifiedEmail={user?.email ?? ""}
      signInPath={chatGPTSignInPath("/cadastro")}
      initialProfile={
        profile
          ? {
              displayName: profile.displayName,
              username: profile.username,
              learningGoal: profile.learningGoal,
              experienceLevel: profile.experienceLevel,
              weeklyGoal: profile.weeklyGoal,
            }
          : null
      }
    />
  );
}
