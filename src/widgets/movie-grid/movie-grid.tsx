import type { Genre, Movie } from "@/entities/movie/model/movie-types";

import { MovieCard } from "./movie-card";

type MovieGridProps = {
  movies: Movie[];
  genres: Genre[];
};

export function MovieGrid({ movies, genres }: MovieGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genres={genres} />
      ))}
    </div>
  );
}