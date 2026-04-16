import { Navigate } from "@tanstack/react-router";

import { LoginForm } from "@/features/auth/ui/login-form";
import { useAuthStore } from "@/features/auth/model/auth-store";

export function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-500 dark:text-zinc-400">
        Carregando sessão...
      </main>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            CineDash
          </span>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}