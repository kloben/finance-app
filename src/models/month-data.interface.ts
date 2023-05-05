export interface IMonthData {
  income: number
  outcome: number
  balance: number
}

export interface IMonth extends IMonthData {
  monthId: string // YYYY-MM
}
