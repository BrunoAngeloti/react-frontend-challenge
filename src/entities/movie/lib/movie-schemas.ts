import { z } from "zod";

export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  original_title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string().catch(""),
  vote_average: z.number(),
  vote_count: z.number(),
  genre_ids: z.array(z.number()).catch([]),
  popularity: z.number(),
  adult: z.boolean(),
  original_language: z.string(),
});

export const paginatedMoviesSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(movieSchema),
});

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const genresResponseSchema = z.object({
  genres: z.array(genreSchema),
});

export const movieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  original_title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string().catch(""),
  vote_average: z.number(),
  runtime: z.number().nullable().catch(null),
  genres: z.array(genreSchema),
  homepage: z.string().nullable().catch(null),
  status: z.string(),
  tagline: z.string().nullable().catch(null),
});

export const movieCreditsResponseSchema = z.object({
  cast: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      character: z.string().catch(""),
      profile_path: z.string().nullable(),
    }),
  ),
});

export const movieVideosResponseSchema = z.object({
  results: z.array(
    z.object({
      id: z.string(),
      key: z.string(),
      name: z.string(),
      site: z.string(),
      type: z.string(),
      official: z.boolean().catch(false),
    }),
  ),
});