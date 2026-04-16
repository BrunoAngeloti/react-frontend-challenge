import { Button } from "@/components/ui/button";
import type { Movie } from "@/entities/movie/model/movie-types";
import { toWatchlistMovie } from "../lib/watchlist-helpers";
import { useWatchlistStore } from "../model/watchlist-store";

type WatchlistToggleButtonProps = {
  movie: Movie;
  fullWidth?: boolean;
};

export function WatchlistToggleButton({
  movie,
  fullWidth = false,
}: WatchlistToggleButtonProps) {
  const items = useWatchlistStore((state) => state.items);
  const toggleMovie = useWatchlistStore((state) => state.toggleMovie);

  const isInWatchlist = items.some((item) => item.id === movie.id);

  function handleToggle() {
    toggleMovie(toWatchlistMovie(movie));
  }

  return (
    <Button
      variant={isInWatchlist ? "outline" : "default"}
      onClick={handleToggle}
      className={fullWidth ? "w-full rounded-xl cursor-pointer" : undefined}
    >
      {isInWatchlist ? "Remover da watchlist" : "Adicionar à watchlist"}
    </Button>
  );
}