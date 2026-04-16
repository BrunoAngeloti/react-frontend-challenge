import { beforeEach, describe, expect, it } from "vitest";

import { clearStorage } from "@/test/test-utils";
import { useWatchlistStore } from "./watchlist-store";

const movie = {
  id: 1,
  title: "Inception",
  genreIds: [28, 878],
  releaseDate: "2010-07-16",
  voteAverage: 8.8,
  posterPath: "/poster.jpg",
  overview: "Dreams within dreams",
  originalTitle: "Inception",
};

describe("watchlist store", () => {
  beforeEach(() => {
    clearStorage();
    useWatchlistStore.setState({
      items: [],
      addMovie: useWatchlistStore.getState().addMovie,
      removeMovie: useWatchlistStore.getState().removeMovie,
      toggleMovie: useWatchlistStore.getState().toggleMovie,
      hasMovie: useWatchlistStore.getState().hasMovie,
      clearWatchlist: useWatchlistStore.getState().clearWatchlist,
    });
  });

  it("should add a movie to watchlist", () => {
    useWatchlistStore.getState().addMovie(movie);

    expect(useWatchlistStore.getState().items).toHaveLength(1);
    expect(useWatchlistStore.getState().items[0].title).toBe("Inception");
  });

  it("should not duplicate movies", () => {
    useWatchlistStore.getState().addMovie(movie);
    useWatchlistStore.getState().addMovie(movie);

    expect(useWatchlistStore.getState().items).toHaveLength(1);
  });

  it("should remove a movie from watchlist", () => {
    useWatchlistStore.getState().addMovie(movie);
    useWatchlistStore.getState().removeMovie(movie.id);

    expect(useWatchlistStore.getState().items).toHaveLength(0);
  });

  it("should toggle a movie in watchlist", () => {
    useWatchlistStore.getState().toggleMovie(movie);
    expect(useWatchlistStore.getState().items).toHaveLength(1);

    useWatchlistStore.getState().toggleMovie(movie);
    expect(useWatchlistStore.getState().items).toHaveLength(0);
  });
});