export function formatRating(rating: number): string {
  return `${Math.round(rating * 100) / 10} / 10`;
}
