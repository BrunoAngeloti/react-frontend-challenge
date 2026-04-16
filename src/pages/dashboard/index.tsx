import { Button } from "@/components/ui/button";
import {
  useDiscoverMoviesQuery,
  useGenresQuery,
} from "@/entities/movie/api/movie-queries";
import { useDiscoveryFilters } from "@/features/movie-discovery/model/use-discovery-filters";
import { useDiscoveryFiltersStore } from "@/features/movie-discovery/model/discovery-filters-store";
import { SectionHeader } from "@/widgets/app-shell/section-header";
import { MovieFilters } from "@/widgets/movie-filters/movie-filters";
import { MovieGrid } from "@/widgets/movie-grid/movie-grid";
import { MovieGridSkeleton } from "@/widgets/movie-grid/movie-grid-skeleton";

export function DashboardPage() {
  const filters = useDiscoveryFilters();
  const setPage = useDiscoveryFiltersStore((state) => state.setPage);

  const { data, isLoading, isError, isFetching } = useDiscoverMoviesQuery(filters);
  const { data: genres = [] } = useGenresQuery();

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Descoberta de filmes"
        description="Explore filmes populares, refine a busca com filtros e navegue pelos detalhes."
        actions={
          isFetching && !isLoading ? (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Atualizando resultados...</span>
          ) : null
        }
      />

      <MovieFilters />

      {isLoading ? <MovieGridSkeleton /> : null}

      {!isLoading && isError ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
          Não foi possível carregar os filmes agora.
        </div>
      ) : null}

      {!isLoading && !isError && data?.results.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white p-8 text-center dark:border-zinc-200 dark:border-zinc-700 dark:bg-white dark:bg-zinc-900">
          <h3 className="text-lg font-semibold text-white">
            Nenhum filme encontrado
          </h3>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Tente ajustar sua busca ou limpar os filtros.
          </p>
        </div>
      ) : null}

      {!isLoading && !isError && data?.results.length ? (
        <>
          <MovieGrid movies={data.results} genres={genres} />

          <div className="flex flex-col gap-4 rounded-3xl border border-zinc-200/80 bg-white/80 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/80 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Página{" "}
                <span className="font-semibold text-zinc-950 dark:text-zinc-50">
                  {data.page}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-zinc-950 dark:text-zinc-50">
                  {data.totalPages}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.max(1, filters.page - 1))}
                disabled={filters.page === 1}
                className="rounded-xl"
              >
                ← Anterior
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage(Math.min(data.totalPages, filters.page + 1))
                }
                disabled={filters.page >= data.totalPages}
                className="rounded-xl"
              >
                Próxima →
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}