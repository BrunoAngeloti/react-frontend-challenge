import { useParams } from "@tanstack/react-router";
import { CalendarDays, Clock3, Film, Star, Users } from "lucide-react";

import {
  useMovieCreditsQuery,
  useMovieDetailsQuery,
  useMovieVideosQuery,
} from "@/entities/movie/api/movie-queries";
import { getImageUrl } from "@/entities/movie/lib/movie-mappers";
import type { Movie } from "@/entities/movie/model/movie-types";
import { WatchlistToggleButton } from "@/features/watchlist/ui/watchlist-toggle-button";
import { formatRating, formatYear } from "@/shared/lib/format";

export function MovieDetailsPage() {
  const { id } = useParams({ from: "/protected/movie/$id" });
  const movieId = Number(id);

  const { data: movie, isLoading: isMovieLoading } = useMovieDetailsQuery(movieId);
  const { data: cast } = useMovieCreditsQuery(movieId);
  const { data: videos } = useMovieVideosQuery(movieId);

  if (isMovieLoading) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Carregando detalhes...
        </p>
      </section>
    );
  }

  if (!movie) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-500/20 dark:bg-red-500/10">
        <p className="text-sm text-red-600 dark:text-red-300">
          Filme não encontrado.
        </p>
      </section>
    );
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
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="relative aspect-[2/3] bg-zinc-100 dark:bg-zinc-800">
            {movie.posterPath ? (
              <img
                src={getImageUrl(movie.posterPath) ?? ""}
                alt={movie.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
                Sem poster
              </div>
            )}

            <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-xs font-medium text-white">
              <Star className="h-3.5 w-3.5 fill-current" />
              {formatRating(movie.voteAverage)}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                {movie.title}
              </h2>

              {movie.tagline ? (
                <p className="text-base text-zinc-500 dark:text-zinc-400">
                  {movie.tagline}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {movie.overview || "Sem sinopse disponível."}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  <Film className="h-4 w-4" />
                </div>
                <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
                  Informações
                </h3>
              </div>

              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span>
                    Nota:{" "}
                    <span className="font-medium text-zinc-950 dark:text-zinc-50">
                      {formatRating(movie.voteAverage)}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-zinc-500" />
                  <span>
                    Lançamento:{" "}
                    <span className="font-medium text-zinc-950 dark:text-zinc-50">
                      {formatYear(movie.releaseDate)}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-zinc-500" />
                  <span>
                    Duração:{" "}
                    <span className="font-medium text-zinc-950 dark:text-zinc-50">
                      {movie.runtime ? `${movie.runtime} min` : "N/A"}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Film className="h-4 w-4 text-zinc-500" />
                  <span>
                    Status:{" "}
                    <span className="font-medium text-zinc-950 dark:text-zinc-50">
                      {movie.status}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <Star className="h-4 w-4" />
                </div>
                <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
                  Curadoria
                </h3>
              </div>

              <div className="space-y-3">
                <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  Salve este título na sua watchlist para acompanhar e revisar
                  depois.
                </p>

                <WatchlistToggleButton movie={movieForWatchlist} fullWidth />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`grid gap-8 ${trailer ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              <Users className="h-4 w-4" />
            </div>
            <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
              Elenco principal
            </h3>
          </div>

          <ul className="space-y-2">
            {cast?.length ? (
              cast.map((person) => (
                <li
                  key={person.id}
                  className="rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
                >
                  <span className="font-medium text-zinc-950 dark:text-zinc-50">
                    {person.name}
                  </span>
                  {person.character ? ` — ${person.character}` : ""}
                </li>
              ))
            ) : (
              <li className="text-sm text-zinc-500 dark:text-zinc-400">
                Elenco não disponível.
              </li>
            )}
          </ul>
        </div>

        {trailer ? (
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                <Film className="h-4 w-4" />
              </div>
              <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
                Trailer
              </h3>
            </div>

            <div className="aspect-video overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
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