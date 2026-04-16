import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-950 px-6 text-white">
      <h1 className="text-3xl font-semibold">Página não encontrada</h1>
      <Button asChild>
        <Link to="/">Voltar para o início</Link>
      </Button>
    </main>
  );
}