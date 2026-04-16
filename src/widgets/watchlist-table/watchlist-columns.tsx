import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Genre } from "@/entities/movie/model/movie-types";
import type { WatchlistMovie } from "@/features/watchlist/model/watchlist-store";
import { formatRating, formatYear } from "@/shared/lib/format";

type CreateWatchlistColumnsParams = {
  genres: Genre[];
  onRemove: (movieId: number) => void;
};

function SortIcon({ direction }: { direction: false | "asc" | "desc" }) {
  if (!direction) return <ArrowUpDown className="h-3.5 w-3.5 opacity-50" />;
  if (direction === "asc") return <ArrowUp className="h-3.5 w-3.5" />;
  return <ArrowDown className="h-3.5 w-3.5" />;
}

export function createWatchlistColumns({
  genres,
  onRemove,
}: CreateWatchlistColumnsParams): ColumnDef<WatchlistMovie>[] {
  return [
    {
      accessorKey: "title",
      header: ({ column }) => {
        const direction = column.getIsSorted();

        return (
          <button
            type="button"
            onClick={() => column.toggleSorting(direction === "asc")}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400"
          >
            Título
            <SortIcon direction={direction} />
          </button>
        );
      },
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="font-medium text-zinc-950 dark:text-zinc-50">
            {row.original.title}
          </p>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {row.original.originalTitle !== row.original.title
              ? row.original.originalTitle
              : "Título original igual"}
          </p>
        </div>
      ),
    },

    {
      id: "genres",
      header: ({ column }) => {
        const direction = column.getIsSorted();

        return (
          <button
            type="button"
            onClick={() => column.toggleSorting(direction === "asc")}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400"
          >
            Gênero
            <SortIcon direction={direction} />
          </button>
        );
      },
      sortingFn: (rowA, rowB) => {
        const getGenreLabel = (genreIds: number[]) =>
          genres
            .filter((genre) => genreIds.includes(genre.id))
            .map((genre) => genre.name)
            .join(", ");

        const a = getGenreLabel(rowA.original.genreIds);
        const b = getGenreLabel(rowB.original.genreIds);

        return a.localeCompare(b);
      },
      cell: ({ row }) => {
        const genreNames = genres
          .filter((genre) => row.original.genreIds.includes(genre.id))
          .map((genre) => genre.name)
          .slice(0, 2);

        if (genreNames.length === 0) {
          return (
            <span className="text-sm text-zinc-400 dark:text-zinc-500">
              Não informado
            </span>
          );
        }

        return (
          <div className="flex flex-wrap gap-1.5">
            {genreNames.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {genre}
              </span>
            ))}
          </div>
        );
      },
    },

    {
      accessorKey: "releaseDate",
      header: "Lançamento",
      cell: ({ row }) => (
        <span className="text-sm text-zinc-700 dark:text-zinc-300">
          {formatYear(row.original.releaseDate)}
        </span>
      ),
    },

    {
      accessorKey: "voteAverage",
      header: ({ column }) => {
        const direction = column.getIsSorted();

        return (
          <button
            type="button"
            onClick={() => column.toggleSorting(direction === "asc")}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400"
          >
            Rating
            <SortIcon direction={direction} />
          </button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          <span className="font-medium">
            {formatRating(row.original.voteAverage)}
          </span>
        </div>
      ),
    },

    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRemove(row.original.id)}
          className="flex items-center gap-1.5 rounded-lg"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Remover
        </Button>
      ),
    },
  ];
}