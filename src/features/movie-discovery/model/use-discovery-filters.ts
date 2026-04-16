import { useMemo } from "react";

import { useDiscoveryFiltersStore } from "./discovery-filters-store";

export function useDiscoveryFilters() {
  const page = useDiscoveryFiltersStore((state) => state.page);
  const query = useDiscoveryFiltersStore((state) => state.query);
  const genreId = useDiscoveryFiltersStore((state) => state.genreId);
  const primaryReleaseYear = useDiscoveryFiltersStore(
    (state) => state.primaryReleaseYear,
  );
  const minVoteAverage = useDiscoveryFiltersStore(
    (state) => state.minVoteAverage,
  );

  return useMemo(
    () => ({
      page,
      query,
      genreId,
      primaryReleaseYear,
      minVoteAverage,
    }),
    [page, query, genreId, primaryReleaseYear, minVoteAverage],
  );
}