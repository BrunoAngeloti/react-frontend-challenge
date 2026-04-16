import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type WatchlistMovie = {
  id: number;
  title: string;
  genreIds: number[];
  releaseDate: string;
  voteAverage: number;
  posterPath: string | null;
  overview: string;
  originalTitle: string;
};

type WatchlistState = {
  items: WatchlistMovie[];
  addMovie: (movie: WatchlistMovie) => void;
  removeMovie: (movieId: number) => void;
  toggleMovie: (movie: WatchlistMovie) => void;
  hasMovie: (movieId: number) => boolean;
  clearWatchlist: () => void;
};

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addMovie: (movie) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === movie.id);

          if (exists) {
            return state;
          }

          return {
            items: [movie, ...state.items],
          };
        }),

      removeMovie: (movieId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== movieId),
        })),

      toggleMovie: (movie) => {
        const exists = get().items.some((item) => item.id === movie.id);

        if (exists) {
          get().removeMovie(movie.id);
          return;
        }

        get().addMovie(movie);
      },

      hasMovie: (movieId) => get().items.some((item) => item.id === movieId),

      clearWatchlist: () => set({ items: [] }),
    }),
    {
      name: "cinedash-watchlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
);