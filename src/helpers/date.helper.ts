export function toDayId (date: Date): string {
  return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`
}

export function toMonthId (date: Date): string {
  return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}`
}

function padZero (num: number): string {
  return num < 10 ? `0${num}` : String(num)
}
