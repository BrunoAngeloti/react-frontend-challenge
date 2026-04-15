import { useParams } from "@tanstack/react-router";

export function MovieDetailsPage() {
  const { id } = useParams({ from: "/protected/movie/$id" });

  return (
    <section className="space-y-2">
      <h2 className="text-2xl font-semibold tracking-tight">
        Detalhes do filme
      </h2>
      <p className="text-zinc-400">Filme selecionado: {id}</p>
    </section>
  );
}