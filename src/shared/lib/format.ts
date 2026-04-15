export function formatYear(date: string) {
  if (!date) return "N/A";

  const year = new Date(date).getFullYear();

  return Number.isNaN(year) ? "N/A" : String(year);
}

export function formatRating(value: number) {
  return value.toFixed(1);
}