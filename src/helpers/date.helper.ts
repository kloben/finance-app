export function toDayId (date: Date): string {
  return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`
}

export function toMonthId (date: Date): string {
  return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}`
}

export function toMonthLabel (date: Date | string): string {
  return new Date(date).toLocaleString('default', { month: 'short' })
}

function padZero (num: number): string {
  return num < 10 ? `0${num}` : String(num)
}
