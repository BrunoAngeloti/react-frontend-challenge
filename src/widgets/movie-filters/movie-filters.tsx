import { CalendarDays, Search, SlidersHorizontal, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGenresQuery } from "@/entities/movie/api/movie-queries";
import { useDiscoveryFiltersStore } from "@/features/movie-discovery/model/discovery-filters-store";
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

  const selectClassName =
    "flex h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition-colors focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50";

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/80  dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="border-b border-zinc-200/80 px-5 py-4 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
            <SlidersHorizontal className="h-4 w-4" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              Filtros de descoberta
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Refine os resultados por termo, gênero, ano e avaliação.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2.5">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Buscar filme
            </label>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Ex: Inception"
                className="h-11 rounded-xl border-zinc-200 bg-white pl-10 text-zinc-950 placeholder:text-zinc-400 focus-visible:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Gênero
            </label>

            <select
              value={genreId ?? ""}
              onChange={(event) =>
                setGenreId(
                  event.target.value ? Number(event.target.value) : undefined,
                )
              }
              className={selectClassName}
            >
              <option value="">Todos</option>
              {genres?.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2.5">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Ano de lançamento
            </label>

            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <select
                value={primaryReleaseYear ?? ""}
                onChange={(event) =>
                  setPrimaryReleaseYear(
                    event.target.value ? Number(event.target.value) : undefined,
                  )
                }
                className={`${selectClassName} pl-10`}
              >
                <option value="">Todos</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Nota mínima
            </label>

            <div className="relative">
              <Star className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <select
                value={minVoteAverage ?? ""}
                onChange={(event) =>
                  setMinVoteAverage(
                    event.target.value ? Number(event.target.value) : undefined,
                  )
                }
                className={`${selectClassName} pl-10`}
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
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-zinc-200/80 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Os resultados são atualizados automaticamente com debounce na busca.
          </p>

          <Button variant="outline" onClick={resetFilters}>
            Limpar filtros
          </Button>
        </div>
      </div>
    </section>
  );
}