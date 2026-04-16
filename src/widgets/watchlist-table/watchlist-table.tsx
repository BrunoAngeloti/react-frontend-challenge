import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";

import type { Genre } from "@/entities/movie/model/movie-types";
import type { WatchlistMovie } from "@/features/watchlist/model/watchlist-store";
import { createWatchlistColumns } from "./watchlist-columns";

type WatchlistTableProps = {
  data: WatchlistMovie[];
  genres: Genre[];
  onRemove: (movieId: number) => void;
};

export function WatchlistTable({
  data,
  genres,
  onRemove,
}: WatchlistTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => createWatchlistColumns({ genres, onRemove }),
    [genres, onRemove],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-zinc-950/60">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-zinc-200 dark:border-zinc-700">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-medium text-zinc-300"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-zinc-200 dark:border-zinc-700/80 transition-colors hover:bg-zinc-800/40"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-4 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}