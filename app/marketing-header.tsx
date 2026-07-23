import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";
import { NexaMark } from "@/app/nexa-brand";
import ThemeToggle from "@/app/theme-toggle";

type Props = {
  authenticated?: boolean;
  compact?: boolean;
};

export function MarketingHeader({ authenticated = false, compact = false }: Props) {
  return (
    <header className={`marketing-header${compact ? " marketing-header-compact" : ""}`}>
      <Link className="marketing-brand" href="/">
        <NexaMark compact />
        <span>
          <strong>NexaCode</strong>
          <i>AI</i>
        </span>
      </Link>
      <nav aria-label="Navegação pública">
        <Link href="/#metodo">Método</Link>
        <Link href="/#trilhas">Trilhas</Link>
        <Link href="/precos">Planos</Link>
      </nav>
      <div className="marketing-actions">
        <ThemeToggle />
        {authenticated ? (
          <Link className="marketing-primary" href="/app">
            Abrir plataforma <ArrowRight size={16} />
          </Link>
        ) : (
          <>
            <Link className="marketing-login" href="/entrar">
              <LogIn size={16} /> Entrar
            </Link>
            <Link className="marketing-primary" href="/cadastro">
              Começar grátis <ArrowRight size={16} />
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
