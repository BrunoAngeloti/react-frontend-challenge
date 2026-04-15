import { useDiscoverMoviesQuery } from "@/entities/movie/api/movie-queries";
import { useDiscoveryFiltersStore } from "@/features/movie-discovery/model/discovery-filters-store";

export function DashboardPage() {
  const filters = useDiscoveryFiltersStore((state) => ({
    page: state.page,
    query: state.query,
    genreId: state.genreId,
    primaryReleaseYear: state.primaryReleaseYear,
    minVoteAverage: state.minVoteAverage,
  }));

  const { data, isLoading, isError } = useDiscoverMoviesQuery(filters);

  if (isLoading) {
    return <p className="text-zinc-400">Carregando filmes...</p>;
  }

  if (isError) {
    return <p className="text-red-400">Erro ao carregar filmes.</p>;
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-zinc-400">
          Camada de dados conectada com a TMDB.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data?.results.slice(0, 8).map((movie) => (
          <article
            key={movie.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <h3 className="font-medium text-white">{movie.title}</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Nota: {movie.voteAverage.toFixed(1)}
            </p>
            <p className="mt-2 line-clamp-3 text-sm text-zinc-500">
              {movie.overview || "Sem sinopse disponível."}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}