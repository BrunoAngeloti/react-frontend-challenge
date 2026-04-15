import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { httpGet } from "@/shared/api/http-client";

import {
  mapCredits,
  mapGenre,
  mapMovieDetails,
  mapPaginatedMovies,
  mapVideos,
} from "../lib/movie-mappers";
import {
  genresResponseSchema,
  movieCreditsResponseSchema,
  movieDetailsSchema,
  movieVideosResponseSchema,
  paginatedMoviesSchema,
} from "../lib/movie-schemas";
import type { DiscoveryFilters, Genre, MovieCreditsPerson, MovieDetails, MovieVideo, PaginatedMovies } from "../model/movie-types";

export const movieQueryKeys = {
  all: ["movies"] as const,
  genres: () => [...movieQueryKeys.all, "genres"] as const,
  discover: (filters: DiscoveryFilters) =>
    [...movieQueryKeys.all, "discover", filters] as const,
  details: (id: number) => [...movieQueryKeys.all, "details", id] as const,
  credits: (id: number) => [...movieQueryKeys.all, "credits", id] as const,
  videos: (id: number) => [...movieQueryKeys.all, "videos", id] as const,
};

async function fetchGenres(): Promise<Genre[]> {
  const data = await httpGet("/genre/movie/list");
  const parsed = genresResponseSchema.parse(data);

  return parsed.genres.map(mapGenre);
}

async function fetchDiscoverMovies(
  filters: DiscoveryFilters,
): Promise<PaginatedMovies> {
  const isSearching = filters.query.trim().length > 0;

  const path = isSearching ? "/search/movie" : "/discover/movie";

  const query = isSearching
    ? {
        query: filters.query,
        page: filters.page,
        include_adult: false,
      }
    : {
        sort_by: "popularity.desc",
        include_adult: false,
        include_video: false,
        page: filters.page,
        with_genres: filters.genreId,
        primary_release_year: filters.primaryReleaseYear,
        "vote_average.gte": filters.minVoteAverage,
      };

  const data = await httpGet(path, { query });
  const parsed = paginatedMoviesSchema.parse(data);

  return mapPaginatedMovies(parsed);
}

async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  const data = await httpGet(`/movie/${id}`);
  const parsed = movieDetailsSchema.parse(data);

  return mapMovieDetails(parsed);
}

async function fetchMovieCredits(id: number): Promise<MovieCreditsPerson[]> {
  const data = await httpGet(`/movie/${id}/credits`);
  const parsed = movieCreditsResponseSchema.parse(data);

  return mapCredits(parsed.cast.slice(0, 10));
}

async function fetchMovieVideos(id: number): Promise<MovieVideo[]> {
  const data = await httpGet(`/movie/${id}/videos`);
  const parsed = movieVideosResponseSchema.parse(data);

  return mapVideos(parsed).filter((video) => video.site === "YouTube");
}

export function useGenresQuery() {
  return useQuery({
    queryKey: movieQueryKeys.genres(),
    queryFn: fetchGenres,
    staleTime: 1000 * 60 * 60 * 24,
  });
}

export function useDiscoverMoviesQuery(filters: DiscoveryFilters) {
  return useQuery({
    queryKey: movieQueryKeys.discover(filters),
    queryFn: () => fetchDiscoverMovies(filters),
    placeholderData: keepPreviousData,
  });
}

export function useMovieDetailsQuery(id: number) {
  return useQuery({
    queryKey: movieQueryKeys.details(id),
    queryFn: () => fetchMovieDetails(id),
    enabled: Number.isFinite(id),
  });
}

export function useMovieCreditsQuery(id: number) {
  return useQuery({
    queryKey: movieQueryKeys.credits(id),
    queryFn: () => fetchMovieCredits(id),
    enabled: Number.isFinite(id),
  });
}

export function useMovieVideosQuery(id: number) {
  return useQuery({
    queryKey: movieQueryKeys.videos(id),
    queryFn: () => fetchMovieVideos(id),
    enabled: Number.isFinite(id),
  });
}