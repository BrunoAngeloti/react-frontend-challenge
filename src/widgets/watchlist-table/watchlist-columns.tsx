import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import type { Genre } from "@/entities/movie/model/movie-types";
import type { WatchlistMovie } from "@/features/watchlist/model/watchlist-store";
import { formatRating, formatYear } from "@/shared/lib/format";

type CreateWatchlistColumnsParams = {
  genres: Genre[];
  onRemove: (movieId: number) => void;
};

export function createWatchlistColumns({
  genres,
  onRemove,
}: CreateWatchlistColumnsParams): ColumnDef<WatchlistMovie>[] {
  return [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <button
          type="button"
          className="font-medium text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
        </button>
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-white">{row.original.title}</p>
          <p className="text-xs text-zinc-500">
            {row.original.originalTitle !== row.original.title
              ? row.original.originalTitle
              : "Título original igual"}
          </p>
        </div>
      ),
    },
    {
      id: "genres",
      header: ({ column }) => (
        <button
          type="button"
          className="font-medium text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gênero
        </button>
      ),
      accessorFn: (row) => {
        const genreNames = genres
          .filter((genre) => row.genreIds.includes(genre.id))
          .map((genre) => genre.name);

        return genreNames.join(", ");
      },
      cell: ({ getValue }) => (
        <span className="text-sm text-zinc-300">
          {(getValue<string>() || "Não informado").split(", ").slice(0, 2).join(", ")}
        </span>
      ),
    },
    {
      accessorKey: "releaseDate",
      header: "Lançamento",
      cell: ({ row }) => (
        <span className="text-sm text-zinc-300">
          {formatYear(row.original.releaseDate)}
        </span>
      ),
    },
    {
      accessorKey: "voteAverage",
      header: ({ column }) => (
        <button
          type="button"
          className="font-medium text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
        </button>
      ),
      cell: ({ row }) => (
        <span className="text-sm text-zinc-300">
          {formatRating(row.original.voteAverage)}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <Button
          variant="outline"
          onClick={() => onRemove(row.original.id)}
        >
          Remover
        </Button>
      ),
    },
  ];
}