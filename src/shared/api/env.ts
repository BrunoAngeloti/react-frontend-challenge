const envSchema = {
  tmdbBaseUrl: import.meta.env.VITE_TMDB_BASE_URL,
  tmdbImageBaseUrl: import.meta.env.VITE_TMDB_IMAGE_BASE_URL,
  tmdbBearerToken: import.meta.env.VITE_TMDB_BEARER_TOKEN,
};

function getRequiredEnv(value: string | undefined, key: string) {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const env = {
  tmdbBaseUrl: getRequiredEnv(envSchema.tmdbBaseUrl, "VITE_TMDB_BASE_URL"),
  tmdbImageBaseUrl: getRequiredEnv(
    envSchema.tmdbImageBaseUrl,
    "VITE_TMDB_IMAGE_BASE_URL",
  ),
  tmdbBearerToken: getRequiredEnv(
    envSchema.tmdbBearerToken,
    "VITE_TMDB_BEARER_TOKEN",
  ),
};