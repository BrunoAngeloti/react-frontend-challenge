import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/model/auth-store";

export function ProtectedLayout() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  function handleLogout() {
    logout();
    navigate({ to: "/" });
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 bg-zinc-900/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-semibold tracking-tight">CineDash</h1>
            <p className="text-sm text-zinc-400">
              Olá, {user?.name ?? "curador"}
            </p>
          </div>

          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link to="/dashboard">Dashboard</Link>
            </Button>

            <Button asChild variant="ghost">
              <Link to="/watchlist">Watchlist</Link>
            </Button>

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