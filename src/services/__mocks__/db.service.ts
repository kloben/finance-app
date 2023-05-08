import type { IMonth } from '@/models/month.interface'
import type { IPayment, IPaymentData } from '@/models/payment.interface'
import { PaymentType } from '@/models/payment.interface'
import type { NewPayment } from '@/services/db.service'
import { toDayId, toMonthId } from '@/helpers/date.helper'
import type { ICategory } from '@/models/category.interface'
import { TestMonths, TestPayments, TestCategories } from '@/services/__mocks__/data'
import { getEmptyMonth } from '@/helpers/data.helper'
import { vi } from 'vitest'

export async function fetchMonth (monthId: string): Promise<IMonth> {
  return TestMonths[monthId] ?? getEmptyMonth(monthId)
}

export const fetchMonths = vi.fn((monthIds: string[]) => {
  return monthIds.map(monthId => TestMonths[monthId] ?? getEmptyMonth(monthId))
})

export async function fetchCategories (): Promise<ICategory[]> {
  return Object.values(TestCategories)
}

export async function fetchPayments (monthId: string): Promise<IPayment[]> {
  return Object.values(TestPayments).filter(payment => payment.monthId === monthId)
}

export async function storePayment (date: Date, data: IPaymentData): Promise<NewPayment> {
  const monthId = toMonthId(date)
  const month: IMonth = JSON.parse(JSON.stringify(TestMonths[monthId] ?? {
    monthId, income: 0, outcome: 0, totals: {}
  }))
  month[data.type] += data.amount
  const category = data.category ?? ''
  month.totals[category] = (month.totals[category] ?? 0) + data.amount

  const savings = fetchSavings() + (data.amount * (data.type === PaymentType.in ? 1 : -1))

  const payment: IPayment = {
    id: 10,
    monthId,
    dayId: toDayId(date),
    createdAt: 123456789,
    ...data
  }

  return { month, savings, payment }
}

export function fetchSavings (): number {
  return 15000
}

export function storeSavings (value: number): void {
}
