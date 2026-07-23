"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const logout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.href = "/";
    }
  };
  return (
    <button className="product-logout" type="button" onClick={logout} disabled={loading}>
      <LogOut size={16} /> <span>{loading ? "Saindo..." : "Sair"}</span>
    </button>
  );
}
