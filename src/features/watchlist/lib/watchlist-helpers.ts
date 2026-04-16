import type { Movie } from "@/entities/movie/model/movie-types";
import type { WatchlistMovie } from "../model/watchlist-store";

export function toWatchlistMovie(movie: Movie): WatchlistMovie {
  return {
    id: movie.id,
    title: movie.title,
    genreIds: movie.genreIds,
    releaseDate: movie.releaseDate,
    voteAverage: movie.voteAverage,
    posterPath: movie.posterPath,
    overview: movie.overview,
    originalTitle: movie.originalTitle,
  };
}