import { useParams } from "@tanstack/react-router";

export function MovieDetailsPage() {
  const { id } = useParams({ from: "/movie/$id" });

  return <h1>Movie ID: {id}</h1>;
}