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
            <span className="text-sm text-zinc-400">Atualizando resultados...</span>
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
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <h3 className="text-lg font-semibold text-white">
            Nenhum filme encontrado
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            Tente ajustar sua busca ou limpar os filtros.
          </p>
        </div>
      ) : null}

      {!isLoading && !isError && data?.results.length ? (
        <>
          <MovieGrid movies={data.results} genres={genres} />

          <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
            <div className="text-sm text-zinc-400">
              Página <span className="font-medium text-white">{data.page}</span> de{" "}
              <span className="font-medium text-white">{data.totalPages}</span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setPage(Math.max(1, filters.page - 1))}
                disabled={filters.page === 1}
              >
                Anterior
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  setPage(Math.min(data.totalPages, filters.page + 1))
                }
                disabled={filters.page >= data.totalPages}
              >
                Próxima
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}