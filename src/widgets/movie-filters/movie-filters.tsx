import { useEffect, useMemo, useState } from "react";

import { useGenresQuery } from "@/entities/movie/api/movie-queries";
import { useDiscoveryFiltersStore } from "@/features/movie-discovery/model/discovery-filters-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/shared/lib/use-debounce";

export function MovieFilters() {
  const query = useDiscoveryFiltersStore((state) => state.query);
  const genreId = useDiscoveryFiltersStore((state) => state.genreId);
  const primaryReleaseYear = useDiscoveryFiltersStore(
    (state) => state.primaryReleaseYear,
  );
  const minVoteAverage = useDiscoveryFiltersStore(
    (state) => state.minVoteAverage,
  );
  const setQuery = useDiscoveryFiltersStore((state) => state.setQuery);
  const setGenreId = useDiscoveryFiltersStore((state) => state.setGenreId);
  const setPrimaryReleaseYear = useDiscoveryFiltersStore(
    (state) => state.setPrimaryReleaseYear,
  );
  const setMinVoteAverage = useDiscoveryFiltersStore(
    (state) => state.setMinVoteAverage,
  );
  const resetFilters = useDiscoveryFiltersStore((state) => state.resetFilters);

  const [searchValue, setSearchValue] = useState(query);
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: genres } = useGenresQuery();

  useEffect(() => {
    setQuery(debouncedSearch.trim());
  }, [debouncedSearch, setQuery]);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 50 }, (_, index) => currentYear - index);
  }, []);

  return (
    <section className="rounded-2xl border border-zinc-200 dark:border-zinc-700 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-200">Buscar filme</label>
          <Input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Ex: Inception"
            className="border-zinc-700 bg-zinc-950"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-200">Gênero</label>
          <select
            value={genreId ?? ""}
            onChange={(event) =>
              setGenreId(
                event.target.value ? Number(event.target.value) : undefined,
              )
            }
            className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none"
          >
            <option value="">Todos</option>
            {genres?.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-200">Ano</label>
          <select
            value={primaryReleaseYear ?? ""}
            onChange={(event) =>
              setPrimaryReleaseYear(
                event.target.value ? Number(event.target.value) : undefined,
              )
            }
            className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none"
          >
            <option value="">Todos</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-200">
            Nota mínima
          </label>
          <select
            value={minVoteAverage ?? ""}
            onChange={(event) =>
              setMinVoteAverage(
                event.target.value ? Number(event.target.value) : undefined,
              )
            }
            className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none"
          >
            <option value="">Qualquer</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            <option value="9">9+</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="outline" onClick={resetFilters}>
          Limpar filtros
        </Button>
      </div>
    </section>
  );
}