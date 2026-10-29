/**
 * Rupees the way buyers in India read them: crore above a crore, lakh above a lakh.
 * 39_000_000 → "₹3.9 crore", 231_500 → "₹2.32 lakh".
 */
export function formatInr(value: number, digits = 2): string {
  const trim = (n: number) => Number(n.toFixed(digits)).toString();
  if (value >= 1e7) return `₹${trim(value / 1e7)} crore`;
  if (value >= 1e5) return `₹${trim(value / 1e5)} lakh`;
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}
