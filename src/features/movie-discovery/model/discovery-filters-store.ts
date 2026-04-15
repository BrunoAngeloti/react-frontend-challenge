import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type DiscoveryFiltersState = {
  query: string;
  genreId?: number;
  primaryReleaseYear?: number;
  minVoteAverage?: number;
  page: number;
  setQuery: (value: string) => void;
  setGenreId: (value?: number) => void;
  setPrimaryReleaseYear: (value?: number) => void;
  setMinVoteAverage: (value?: number) => void;
  setPage: (value: number) => void;
  resetFilters: () => void;
};

const initialState = {
  query: "",
  genreId: undefined,
  primaryReleaseYear: undefined,
  minVoteAverage: undefined,
  page: 1,
};

export const useDiscoveryFiltersStore = create<DiscoveryFiltersState>()(
  persist(
    (set) => ({
      ...initialState,
      setQuery: (value) => set({ query: value, page: 1 }),
      setGenreId: (value) => set({ genreId: value, page: 1 }),
      setPrimaryReleaseYear: (value) =>
        set({ primaryReleaseYear: value, page: 1 }),
      setMinVoteAverage: (value) => set({ minVoteAverage: value, page: 1 }),
      setPage: (value) => set({ page: value }),
      resetFilters: () => set(initialState),
    }),
    {
      name: "cinedash-discovery-filters",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        query: state.query,
        genreId: state.genreId,
        primaryReleaseYear: state.primaryReleaseYear,
        minVoteAverage: state.minVoteAverage,
        page: state.page,
      }),
    },
  ),
);