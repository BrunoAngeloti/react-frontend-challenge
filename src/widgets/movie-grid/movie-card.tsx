import { Link } from "@tanstack/react-router";
import { Bookmark, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/entities/movie/lib/movie-mappers";
import type { Genre, Movie } from "@/entities/movie/model/movie-types";
import { WatchlistToggleButton } from "@/features/watchlist/ui/watchlist-toggle-button";
import { formatRating, formatYear } from "@/shared/lib/format";

type MovieCardProps = {
  movie: Movie;
  genres: Genre[];
};

export function MovieCard({ movie, genres }: MovieCardProps) {
  const movieGenres = genres.filter((genre) => movie.genreIds.includes(genre.id));

  return (
    <article className="group overflow-hidden rounded-3xl border border-zinc-200/80 bg-white  transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {movie.posterPath ? (
          <>
            <img
              src={getImageUrl(movie.posterPath) ?? ""}
              alt={movie.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />

            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
            Sem poster
          </div>
        )}

        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-current" />
          {formatRating(movie.voteAverage)}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-1 text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              {movie.title}
            </h3>

            <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-1 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              {formatYear(movie.releaseDate)}
            </span>
          </div>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {movie.originalTitle !== movie.title
              ? movie.originalTitle
              : "Título original disponível"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {movieGenres.slice(0, 2).map((genre) => (
            <span
              key={genre.id}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {movie.overview || "Sem sinopse disponível."}
        </p>

        <div className="flex flex-col gap-2">
            <WatchlistToggleButton movie={movie} fullWidth />

            <Button asChild variant="outline" className="w-full rounded-xl">
              <Link to="/movie/$id" params={{ id: String(movie.id) }}>
                Ver detalhes
              </Link>
            </Button>
          </div>
      </div>
    </article>
  );
}