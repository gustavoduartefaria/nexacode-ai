"use client";

import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type MascotGuide = {
  title: string;
  message: string;
  action?: string;
  href?: string;
};

const guides: Array<{ matches: (path: string) => boolean; guide: MascotGuide }> = [
  {
    matches: (path) => path === "/",
    guide: {
      title: "Oi, eu sou o Nex!",
      message: "Vou te acompanhar enquanto você transforma curiosidade em código que funciona.",
      action: "Começar grátis",
      href: "/cadastro",
    },
  },
  {
    matches: (path) => path === "/cadastro",
    guide: {
      title: "Vamos começar?",
      message: "Crie sua conta e eu te mostro o melhor caminho entre JavaScript, Python e C++.",
      action: "Comparar planos",
      href: "/precos",
    },
  },
  {
    matches: (path) => path === "/entrar",
    guide: {
      title: "Que bom ter você de volta!",
      message: "Entre para continuar exatamente de onde parou, com progresso salvo na nuvem.",
    },
  },
  {
    matches: (path) => path === "/precos",
    guide: {
      title: "Comece sem pressão",
      message: "O plano Starter é gratuito e não pede cartão. Você pode evoluir quando fizer sentido.",
      action: "Criar conta",
      href: "/cadastro",
    },
  },
  {
    matches: (path) => path === "/para-equipes" || path === "/equipe",
    guide: {
      title: "Aprender junto é melhor",
      message: "Organize sua turma, acompanhe a evolução e mantenha todo mundo na mesma jornada.",
      action: "Ver plano Equipes",
      href: "/precos?cycle=annual&intent=teams",
    },
  },
  {
    matches: (path) => path === "/app",
    guide: {
      title: "Qual será o próximo passo?",
      message: "Escolha uma trilha, pratique no laboratório e use o mentor da aula quando precisar de uma pista.",
    },
  },
  {
    matches: (path) => path === "/conta",
    guide: {
      title: "Esta jornada é sua",
      message: "Ajuste sua meta semanal e suas preferências para estudar no ritmo que funciona para você.",
    },
  },
];

const autoOpenPaths = new Set(["/", "/cadastro", "/app"]);

export default function NexaMascot() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const entry = guides.find(({ matches }) => matches(pathname));
  const open = openPath === pathname;

  useEffect(() => {
    if (!entry || !autoOpenPaths.has(pathname)) return;
    if (window.matchMedia("(max-width: 760px)").matches) return;
    const timer = window.setTimeout(() => setOpenPath(pathname), 1100);
    return () => window.clearTimeout(timer);
  }, [entry, pathname]);

  if (!entry) return null;

  return (
    <aside className={`nexa-guide${open ? " is-open" : ""}`} data-mascot-guide>
      {open && (
        <div className="nexa-guide-card" id="nexa-guide-message">
          <button
            type="button"
            className="nexa-guide-close"
            aria-label="Fechar mensagem do Nex"
            onClick={() => setOpenPath(null)}
          >
            <X size={15} />
          </button>
          <span className="nexa-guide-kicker">NEX · GUIA DE CÓDIGO</span>
          <strong>{entry.guide.title}</strong>
          <p>{entry.guide.message}</p>
          {entry.guide.href && entry.guide.action && (
            <Link href={entry.guide.href} onClick={() => setOpenPath(null)}>
              {entry.guide.action} <ArrowRight size={14} />
            </Link>
          )}
        </div>
      )}
      <button
        type="button"
        className="nexa-guide-avatar"
        aria-label={open ? "Ocultar mensagem do mascote Nex" : "Abrir mensagem do mascote Nex"}
        aria-expanded={open}
        aria-controls="nexa-guide-message"
        onClick={() => setOpenPath((current) => current === pathname ? null : pathname)}
      >
        <Image
          src="/mascot/nexa-mascot.webp"
          alt=""
          width={112}
          height={112}
          sizes="112px"
        />
        {!open && <i aria-hidden="true" />}
      </button>
    </aside>
  );
}
