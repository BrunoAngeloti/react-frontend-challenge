import { beforeEach, describe, expect, it } from "vitest";

import { clearStorage } from "@/test/test-utils";
import { useDiscoveryFiltersStore } from "./discovery-filters-store";

describe("discovery filters store", () => {
  beforeEach(() => {
    clearStorage();
    useDiscoveryFiltersStore.setState({
      query: "",
      genreId: undefined,
      primaryReleaseYear: undefined,
      minVoteAverage: undefined,
      page: 1,
      setQuery: useDiscoveryFiltersStore.getState().setQuery,
      setGenreId: useDiscoveryFiltersStore.getState().setGenreId,
      setPrimaryReleaseYear:
        useDiscoveryFiltersStore.getState().setPrimaryReleaseYear,
      setMinVoteAverage: useDiscoveryFiltersStore.getState().setMinVoteAverage,
      setPage: useDiscoveryFiltersStore.getState().setPage,
      resetFilters: useDiscoveryFiltersStore.getState().resetFilters,
    });
  });

  it("should reset page when query changes", () => {
    useDiscoveryFiltersStore.getState().setPage(4);
    useDiscoveryFiltersStore.getState().setQuery("batman");

    const state = useDiscoveryFiltersStore.getState();

    expect(state.query).toBe("batman");
    expect(state.page).toBe(1);
  });

  it("should update genre filter", () => {
    useDiscoveryFiltersStore.getState().setGenreId(28);

    expect(useDiscoveryFiltersStore.getState().genreId).toBe(28);
    expect(useDiscoveryFiltersStore.getState().page).toBe(1);
  });

  it("should reset all filters", () => {
    const store = useDiscoveryFiltersStore.getState();

    store.setQuery("matrix");
    store.setGenreId(878);
    store.setPrimaryReleaseYear(1999);
    store.setMinVoteAverage(8);
    store.setPage(3);

    store.resetFilters();

    const state = useDiscoveryFiltersStore.getState();

    expect(state.query).toBe("");
    expect(state.genreId).toBeUndefined();
    expect(state.primaryReleaseYear).toBeUndefined();
    expect(state.minVoteAverage).toBeUndefined();
    expect(state.page).toBe(1);
  });
});