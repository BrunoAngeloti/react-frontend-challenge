import { env } from "@/shared/api/env";

import type {
  Genre,
  Movie,
  MovieCreditsPerson,
  MovieDetails,
  MovieVideo,
  PaginatedMovies,
} from "../model/movie-types";
import type {
  genreSchema,
  movieDetailsSchema,
  movieSchema,
  movieVideosResponseSchema,
  paginatedMoviesSchema,
} from "./movie-schemas";
import type { z } from "zod";

type MovieDto = z.infer<typeof movieSchema>;
type PaginatedMoviesDto = z.infer<typeof paginatedMoviesSchema>;
type GenreDto = z.infer<typeof genreSchema>;
type MovieDetailsDto = z.infer<typeof movieDetailsSchema>;
type VideosDto = z.infer<typeof movieVideosResponseSchema>;

export function getImageUrl(path: string | null) {
  return path ? `${env.tmdbImageBaseUrl}${path}` : null;
}

export function mapMovie(dto: MovieDto): Movie {
  return {
    id: dto.id,
    title: dto.title,
    originalTitle: dto.original_title,
    overview: dto.overview,
    posterPath: dto.poster_path,
    backdropPath: dto.backdrop_path,
    releaseDate: dto.release_date,
    voteAverage: dto.vote_average,
    voteCount: dto.vote_count,
    genreIds: dto.genre_ids,
    popularity: dto.popularity,
    adult: dto.adult,
    originalLanguage: dto.original_language,
  };
}

export function mapPaginatedMovies(dto: PaginatedMoviesDto): PaginatedMovies {
  return {
    page: dto.page,
    totalPages: dto.total_pages,
    totalResults: dto.total_results,
    results: dto.results.map(mapMovie),
  };
}

export function mapGenre(dto: GenreDto): Genre {
  return {
    id: dto.id,
    name: dto.name,
  };
}

export function mapMovieDetails(dto: MovieDetailsDto): MovieDetails {
  return {
    id: dto.id,
    title: dto.title,
    originalTitle: dto.original_title,
    overview: dto.overview,
    posterPath: dto.poster_path,
    backdropPath: dto.backdrop_path,
    releaseDate: dto.release_date,
    voteAverage: dto.vote_average,
    runtime: dto.runtime,
    genres: dto.genres.map(mapGenre),
    homepage: dto.homepage,
    status: dto.status,
    tagline: dto.tagline,
  };
}

export function mapCredits(
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }>,
): MovieCreditsPerson[] {
  return cast.map((person) => ({
    id: person.id,
    name: person.name,
    character: person.character,
    profilePath: person.profile_path,
  }));
}

export function mapVideos(dto: VideosDto): MovieVideo[] {
  return dto.results.map((video) => ({
    id: video.id,
    key: video.key,
    name: video.name,
    site: video.site,
    type: video.type,
    official: video.official,
  }));
}