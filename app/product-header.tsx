import { Building2, Gauge, Settings, ShieldCheck } from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/app/logout-button";
import { NexaMark } from "@/app/nexa-brand";
import ThemeToggle from "@/app/theme-toggle";

type User = {
  displayName: string;
  email: string;
  role: "student" | "admin";
  planId: "free" | "pro" | "teams";
  avatarPreset: "orbit" | "terminal" | "pixel" | "nebula";
  themePreference: "system" | "dark" | "light";
};

export function ProductHeader({ user }: { user: User }) {
  return (
    <header className="product-header">
      <Link className="marketing-brand" href="/">
        <NexaMark compact />
        <span><strong>NexaCode</strong><i>AI</i></span>
      </Link>
      <nav aria-label="Área da conta">
        <Link href="/app"><Gauge size={16} /> Plataforma</Link>
        <Link href="/conta"><Settings size={16} /> Conta</Link>
        {user.planId === "teams" && <Link href="/equipe"><Building2 size={16} /> Equipe</Link>}
        {user.role === "admin" && <Link href="/admin"><ShieldCheck size={16} /> Administração</Link>}
      </nav>
      <div className="product-user">
        <ThemeToggle preferredTheme={user.themePreference} />
        <span className={`avatar-preset-${user.avatarPreset}`}>{user.displayName.slice(0, 1).toUpperCase()}</span>
        <div><strong>{user.displayName}</strong><small>{user.planId === "free" ? "Starter" : user.planId === "pro" ? "Pro" : "Equipes"}</small></div>
        <LogoutButton />
      </div>
    </header>
  );
}
