import { Bookmark, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGenresQuery } from "@/entities/movie/api/movie-queries";
import { useWatchlistStore } from "@/features/watchlist/model/watchlist-store";
import { SectionHeader } from "@/widgets/app-shell/section-header";
import { WatchlistTable } from "@/widgets/watchlist-table/watchlist-table";

export function WatchlistPage() {
  const items = useWatchlistStore((state) => state.items);
  const removeMovie = useWatchlistStore((state) => state.removeMovie);
  const clearWatchlist = useWatchlistStore((state) => state.clearWatchlist);
  const { data: genres = [] } = useGenresQuery();

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Minha watchlist"
        description="Gerencie os filmes selecionados para revisão, comparação e curadoria."
        actions={
          items.length > 0 ? (
            <Button
              variant="outline"
              onClick={clearWatchlist}
              className="rounded-xl"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Limpar lista
            </Button>
          ) : null
        }
      />

      {items.length === 0 ? (
        <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/80  dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
              <Bookmark className="h-7 w-7" />
            </div>

            <h3 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Sua watchlist está vazia
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Adicione filmes a partir do dashboard ou da página de detalhes
              para montar sua seleção de curadoria e acompanhar os títulos mais
              relevantes.
            </p>

            <div className="mt-6 inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              Seus filmes salvos permanecem disponíveis após o refresh
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-white/80 px-5 py-4  dark:border-zinc-800 dark:bg-zinc-900/80 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                <Bookmark className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                  {items.length} {items.length === 1 ? "filme salvo" : "filmes salvos"}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Ordene e revise sua seleção para tomada de decisão.
                </p>
              </div>
            </div>
          </div>

          <WatchlistTable
            data={items}
            genres={genres}
            onRemove={removeMovie}
          />
        </div>
      )}
    </section>
  );
}