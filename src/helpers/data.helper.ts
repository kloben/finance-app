import type { IMonth } from '@/models/month.interface'

export function getEmptyMonth (monthId: string): IMonth {
  return {
    monthId,
    income: 0,
    outcome: 0,
    totals: {}
  }
}
