"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle({
  preferredTheme = "system",
}: {
  preferredTheme?: Theme | "system";
}) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("nexacode-theme");
    const selected: Theme =
      stored === "light" || stored === "dark"
        ? stored
        : preferredTheme === "light" || preferredTheme === "dark"
          ? preferredTheme
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    document.documentElement.dataset.theme = selected;
    const timer = window.setTimeout(() => setTheme(selected), 0);
    return () => window.clearTimeout(timer);
  }, [preferredTheme]);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("nexacode-theme", next);
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      title={theme === "dark" ? "Tema claro" : "Tema escuro"}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
