"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ProductError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="status-page">
      <section>
        <span><AlertTriangle size={25} /></span>
        <small>FALHA CONTROLADA</small>
        <h1>Não foi possível concluir esta ação.</h1>
        <p>Seus dados permanecem protegidos. Tente novamente; se o problema persistir, consulte o estado do serviço.</p>
        <div>
          <button className="marketing-primary" type="button" onClick={reset}><RotateCcw size={16} /> Tentar novamente</button>
          <a className="marketing-secondary" href="/api/health">Verificar serviço</a>
        </div>
      </section>
    </main>
  );
}
