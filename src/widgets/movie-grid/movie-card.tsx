import { Link } from "@tanstack/react-router";

import type { Genre, Movie } from "@/entities/movie/model/movie-types";
import { getImageUrl } from "@/entities/movie/lib/movie-mappers";
import { Button } from "@/components/ui/button";
import { formatRating, formatYear } from "@/shared/lib/format";

type MovieCardProps = {
  movie: Movie;
  genres: Genre[];
};

export function MovieCard({ movie, genres }: MovieCardProps) {
  const movieGenres = genres.filter((genre) => movie.genreIds.includes(genre.id));

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
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

      <div className="space-y-3 p-4">
        <div>
          <h3 className="line-clamp-1 text-base font-semibold text-white">
            {movie.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            {formatYear(movie.releaseDate)} • Nota {formatRating(movie.voteAverage)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {movieGenres.slice(0, 2).map((genre) => (
            <span
              key={genre.id}
              className="rounded-full border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <p className="line-clamp-3 text-sm text-zinc-400">
          {movie.overview || "Sem sinopse disponível."}
        </p>

        <Button asChild className="w-full">
          <Link to="/movie/$id" params={{ id: String(movie.id) }}>
            Ver detalhes
          </Link>
        </Button>
      </div>
    </article>
  );
}