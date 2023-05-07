export function calculatePastMonthIds (amount: number = 5): string[] {
  return new Array(amount).fill('').reduce(({ date, monthIds }) => {
    date.setDate(15) // Causes problems if day too high
    monthIds.unshift(toMonthId(date))
    date.setMonth(date.getMonth() - 1)
    return { date, monthIds }
  }, { date: new Date(), monthIds: [] }).monthIds
}

export function calculateNextMonthIds (amount: number = 5): string[] {
  return new Array(amount).fill('').reduce(({ date, monthIds }) => {
    date.setDate(15) // Causes problems if day too high
    monthIds.unshift(toMonthId(date))
    date.setMonth(date.getMonth() + 1)
    return { date, monthIds }
  }, { date: new Date(), monthIds: [] }).monthIds
}

export function toDayId (date: Date): string {
  return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`
}

export function toMonthId (date: Date): string {
  return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}`
}

export function toMonthLabel (date: Date | string): string {
  return new Date(date).toLocaleString('default', { month: 'short' })
}

export function modifyMonthId (monthId: string, modifier: 1 | -1): string {
  const date = new Date(monthId)
  date.setDate(15)
  date.setMonth(date.getMonth() + modifier)
  return toMonthId(date)
}

function padZero (num: number): string {
  return num < 10 ? `0${num}` : String(num)
}
