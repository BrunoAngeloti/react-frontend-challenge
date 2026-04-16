import { useParams } from "@tanstack/react-router";

import {
  useMovieCreditsQuery,
  useMovieDetailsQuery,
  useMovieVideosQuery,
} from "@/entities/movie/api/movie-queries";
import type { Movie } from "@/entities/movie/model/movie-types";
import { getImageUrl } from "@/entities/movie/lib/movie-mappers";
import { formatRating, formatYear } from "@/shared/lib/format";
import { WatchlistToggleButton } from "@/features/watchlist/ui/watchlist-toggle-button";

export function MovieDetailsPage() {
  const { id } = useParams({ from: "/protected/movie/$id" });
  const movieId = Number(id);

  const { data: movie, isLoading: isMovieLoading } = useMovieDetailsQuery(movieId);
  const { data: cast } = useMovieCreditsQuery(movieId);
  const { data: videos } = useMovieVideosQuery(movieId);

  if (isMovieLoading) {
    return <p className="text-zinc-500 dark:text-zinc-400">Carregando detalhes...</p>;
  }

  if (!movie) {
    return <p className="text-red-400">Filme não encontrado.</p>;
  }

  const movieForWatchlist: Movie = {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.originalTitle,
    overview: movie.overview,
    posterPath: movie.posterPath,
    backdropPath: movie.backdropPath,
    releaseDate: movie.releaseDate,
    voteAverage: movie.voteAverage,
    voteCount: 0,
    genreIds: movie.genres.map((genre) => genre.id),
    popularity: 0,
    adult: false,
    originalLanguage: "en",
  };

  const trailer = videos?.find(
    (video) => video.type === "Trailer" || video.type === "Teaser",
  );

  return (
    <section className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <div className="aspect-[2/3] bg-zinc-800">
            {movie.posterPath ? (
              <img
                src={getImageUrl(movie.posterPath) ?? ""}
                alt={movie.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                Sem poster
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight">
              {movie.title}
            </h2>

            {movie.tagline ? (
              <p className="text-zinc-500 dark:text-zinc-400">{movie.tagline}</p>
            ) : null}

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="max-w-3xl text-zinc-300">
              {movie.overview || "Sem sinopse disponível."}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
              <h3 className="mb-3 font-medium text-white">Informações</h3>
              <div className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                <p>Nota: {formatRating(movie.voteAverage)}</p>
                <p>Lançamento: {formatYear(movie.releaseDate)}</p>
                <p>Duração: {movie.runtime ? `${movie.runtime} min` : "N/A"}</p>
                <p>Status: {movie.status}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
              <h3 className="mb-3 font-medium text-white">Curadoria</h3>
              <div className="space-y-3">
                <WatchlistToggleButton movie={movieForWatchlist} fullWidth />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">
          <h3 className="font-medium text-white">Elenco principal</h3>
          <ul className="space-y-2">
            {cast?.length ? (
              cast.map((person) => (
                <li key={person.id} className="text-sm text-zinc-500 dark:text-zinc-400">
                  {person.name} {person.character ? `— ${person.character}` : ""}
                </li>
              ))
            ) : (
              <li className="text-sm text-zinc-500">
                Elenco não disponível.
              </li>
            )}
          </ul>
        </div>

        {trailer ? (
          <div className="space-y-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">
            <h3 className="font-medium text-white">Trailer</h3>
            <div className="aspect-video overflow-hidden rounded-lg">
              <iframe
                title={trailer.name}
                src={`https://www.youtube.com/embed/${trailer.key}`}
                className="h-full w-full"
                allowFullScreen
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}