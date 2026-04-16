export type Movie = {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  genreIds: number[];
  popularity: number;
  adult: boolean;
  originalLanguage: string;
};

export type MovieDetails = {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
  runtime: number | null;
  genres: Array<{ id: number; name: string }>;
  homepage: string | null;
  status: string;
  tagline: string | null;
};

export type MovieCreditsPerson = {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
};

export type MovieVideo = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
};

export type PaginatedMovies = {
  page: number;
  totalPages: number;
  totalResults: number;
  results: Movie[];
};

export type Genre = {
  id: number;
  name: string;
};

export type DiscoveryFilters = {
  page: number;
  query: string;
  genreId?: number;
  primaryReleaseYear?: number;
  minVoteAverage?: number;
};