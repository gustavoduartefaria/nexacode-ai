import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AccountClient from "@/app/account-client";
import { ProductHeader } from "@/app/product-header";
import { getSessionUser } from "@/lib/auth";
import { billingConfigured, billingProvider } from "@/lib/billing";
import { emailDeliveryConfigured } from "@/lib/email";
import { getStudentProfile } from "@/db/profiles";
import { getDb } from "@/db";
import { certificates } from "@/db/schema";
import { eq } from "drizzle-orm";
import { plans } from "@/lib/saas";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Minha conta" };

export default async function AccountPage() {
  const user = await getSessionUser();
  if (!user) redirect("/entrar");
  const profile = await getStudentProfile(user.email);
  if (!profile) redirect("/cadastro");
  const certificateList = await getDb()
    .select({
      language: certificates.language,
      verificationCode: certificates.verificationCode,
      issuedAt: certificates.issuedAt,
    })
    .from(certificates)
    .where(eq(certificates.userId, user.id));
  return (
    <main className="product-page">
      <ProductHeader user={user} />
      <AccountClient
        profile={{
          displayName: profile.displayName,
          username: profile.username,
          learningGoal: profile.learningGoal,
          experienceLevel: profile.experienceLevel,
          weeklyGoal: profile.weeklyGoal,
          avatarPreset: profile.avatarPreset,
          themePreference: profile.themePreference,
          aiEnabled: profile.aiEnabled,
        }}
        planName={plans[user.planId].name}
        email={user.email}
        emailVerified={user.emailVerified}
        billingConfigured={billingConfigured()}
        billingProvider={billingProvider()}
        emailConfigured={emailDeliveryConfigured()}
        certificates={certificateList.map((certificate) => ({
          ...certificate,
          issuedAt: certificate.issuedAt.toISOString(),
        }))}
      />
    </main>
  );
}
