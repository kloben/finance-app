export function toCurrency (value: number): string {
  return Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  }).format(value)
}
