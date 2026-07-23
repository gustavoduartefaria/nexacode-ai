import { SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="status-page">
      <section>
        <span><SearchX size={25} /></span>
        <small>ERRO 404</small>
        <h1>Esta rota não existe.</h1>
        <p>O endereço pode ter mudado ou sido digitado incorretamente.</p>
        <div>
          <Link className="marketing-primary" href="/">Voltar ao início</Link>
          <Link className="marketing-secondary" href="/app">Abrir plataforma</Link>
        </div>
      </section>
    </main>
  );
}
