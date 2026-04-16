import { Link, Navigate, Outlet, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { ThemeToggleButton } from "@/features/theme-toggle/ui/theme-toggle-button";
import { useWatchlistStore } from "@/features/watchlist/model/watchlist-store";

export function ProtectedLayout() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const watchlistCount = useWatchlistStore((state) => state.items.length);

  function handleLogout() {
    logout();
    navigate({ to: "/" });
  }

  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-500 dark:text-zinc-400">
        Carregando sessão...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white transition-colors duration-200 dark:bg-zinc-950 dark:text-white light:bg-zinc-100 light:text-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/70 backdrop-blur transition-colors duration-200 dark:border-zinc-200 dark:border-zinc-700 dark:bg-white dark:bg-zinc-900/70 light:border-zinc-200 dark:border-zinc-700 light:bg-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-semibold tracking-tight">CineDash</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 light:text-zinc-500">
              Olá, {user?.name ?? "curador"}
            </p>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-800 dark:text-white dark:hover:bg-zinc-800 light:text-zinc-900 light:hover:bg-zinc-200"
            >
              Dashboard
            </Link>

            <Link
              to="/watchlist"
              className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-800 dark:text-white dark:hover:bg-zinc-800 light:text-zinc-900 light:hover:bg-zinc-200"
            >
              Watchlist ({watchlistCount})
            </Link>

            <ThemeToggleButton />

            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}