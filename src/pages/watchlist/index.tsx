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
        description="Gerencie os filmes selecionados para revisão e curadoria."
        actions={
          items.length > 0 ? (
            <Button variant="outline" onClick={clearWatchlist}>
              Limpar lista
            </Button>
          ) : null
        }
      />

      {items.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
          <h3 className="text-lg font-semibold text-white">
            Sua watchlist está vazia
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            Adicione filmes a partir do dashboard ou da página de detalhes.
          </p>
        </div>
      ) : (
        <WatchlistTable
          data={items}
          genres={genres}
          onRemove={removeMovie}
        />
      )}
    </section>
  );
}