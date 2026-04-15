export function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <span className="mb-3 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          CineDash
        </span>

        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Frontend challenge bootstrap
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Base inicial do projeto configurada com React, TypeScript strict,
          Vite, Tailwind e TanStack Query.
        </p>
      </div>
    </main>
  );
}