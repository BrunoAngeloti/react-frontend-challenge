import { env } from "./env";

type RequestOptions = {
  query?: Record<string, string | number | boolean | undefined | null>;
  signal?: AbortSignal;
};

function buildUrl(
  path: string,
  query?: Record<string, string | number | boolean | undefined | null>,
) {
  const url = new URL(`${env.tmdbBaseUrl}${path}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

export async function httpGet<T>(
  path: string,
  options?: RequestOptions,
): Promise<T> {
  const response = await fetch(buildUrl(path, options?.query), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${env.tmdbBearerToken}`,
      "Content-Type": "application/json",
    },
    signal: options?.signal,
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}