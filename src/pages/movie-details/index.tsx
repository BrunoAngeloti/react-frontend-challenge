import { useParams } from "@tanstack/react-router";

import {
  useMovieCreditsQuery,
  useMovieDetailsQuery,
  useMovieVideosQuery,
} from "@/entities/movie/api/movie-queries";

export function MovieDetailsPage() {
  const { id } = useParams({ from: "/protected/movie/$id" });
  const movieId = Number(id);

  const { data: movie, isLoading: isMovieLoading } = useMovieDetailsQuery(movieId);
  const { data: cast } = useMovieCreditsQuery(movieId);
  const { data: videos } = useMovieVideosQuery(movieId);

  if (isMovieLoading) {
    return <p className="text-zinc-400">Carregando detalhes...</p>;
  }

  if (!movie) {
    return <p className="text-red-400">Filme não encontrado.</p>;
  }

  const trailer = videos?.find(
    (video) => video.type === "Trailer" || video.type === "Teaser",
  );

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight">{movie.title}</h2>
        {movie.tagline && (
          <p className="text-zinc-400">{movie.tagline}</p>
        )}
        <p className="max-w-3xl text-zinc-300">
          {movie.overview || "Sem sinopse disponível."}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="font-medium">Informações</h3>
          <p className="text-sm text-zinc-400">
            Nota: {movie.voteAverage.toFixed(1)}
          </p>
          <p className="text-sm text-zinc-400">
            Lançamento: {movie.releaseDate || "N/A"}
          </p>
          <p className="text-sm text-zinc-400">
            Duração: {movie.runtime ? `${movie.runtime} min` : "N/A"}
          </p>
          <p className="text-sm text-zinc-400">
            Gêneros: {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>

        <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="font-medium">Elenco principal</h3>
          <ul className="space-y-2">
            {cast?.length ? (
              cast.map((person) => (
                <li key={person.id} className="text-sm text-zinc-400">
                  {person.name} {person.character ? `— ${person.character}` : ""}
                </li>
              ))
            ) : (
              <li className="text-sm text-zinc-500">
                Elenco não disponível.
              </li>
            )}
          </ul>
        </div>
      </div>

      {trailer && (
        <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="font-medium">Trailer</h3>
          <div className="aspect-video overflow-hidden rounded-lg">
            <iframe
              title={trailer.name}
              src={`https://www.youtube.com/embed/${trailer.key}`}
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}