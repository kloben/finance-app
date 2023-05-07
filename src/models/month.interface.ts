export interface IMonthTotals {
  [category: string]: number
}

export interface IMonth {
  monthId: string // YYYY-MM
  income: number
  outcome: number
  totals: IMonthTotals
}
