import { Navigate } from "@tanstack/react-router";

import { LoginForm } from "@/features/auth/ui/login-form";
import { useAuthStore } from "@/features/auth/model/auth-store";

export function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
        Carregando sessão...
      </main>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 px-6 py-10 dark:bg-zinc-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-80px] top-[-80px] h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/15" />
        <div className="absolute bottom-[-120px] right-[-80px] h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_40%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_35%)]" />
      </div>

      <div className="relative z-10 grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_480px]">
        <section className="hidden lg:block">
          <div className="max-w-xl space-y-6">
            <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              CineDash
            </span>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Curadoria de filmes com uma interface limpa, rápida e escalável.
              </h1>

              <p className="max-w-lg text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Descubra títulos, filtre resultados, acompanhe detalhes e monte
                sua watchlist com persistência local e navegação fluida.
              </p>
            </div>

            <div className="grid max-w-lg grid-cols-2 gap-4">
              <div className="rounded-2xl border border-zinc-200 bg-white/70 p-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
                <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                  Busca inteligente
                </p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Debounce, filtros e paginação para exploração eficiente.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white/70 p-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
                <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                  Watchlist persistida
                </p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Salve filmes e mantenha tudo após o refresh.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full max-w-md justify-self-center lg:max-w-none">
          <div className="mb-5 text-center lg:hidden">
            <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              CineDash
            </span>
          </div>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}