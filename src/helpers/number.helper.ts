export function toCurrency (value: number): string {
  return Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  }).format(value)
}

export function shuffle<T> (input: T[]): T[] {
  const output = [...input]
  for (let i = output.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output
}
