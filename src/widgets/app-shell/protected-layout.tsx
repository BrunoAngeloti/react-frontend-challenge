import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export function ProtectedLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: "/" });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 p-4 flex justify-between">
        <h1 className="font-semibold">CineDash</h1>

        <nav className="flex gap-4 text-sm">
          <a href="/dashboard">Dashboard</a>
          <a href="/watchlist">Watchlist</a>
        </nav>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}