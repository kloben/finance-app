import type { IMonth } from '@/models/month.interface'
import type { IPayment, IPaymentData } from '@/models/payment.interface'
import { PaymentType } from '@/models/payment.interface'
import type { NewPayment } from '@/services/db.service'
import { toDayId, toMonthId } from '@/helpers/date.helper'

const monthsCache: Record<string, IMonth> = {
  '2023-04': { monthId: '2023-04', income: 100, outcome: 200 },
  '2023-02': { monthId: '2023-02', income: 111, outcome: 222 }
}
const paymentsCache: Record<number, IPayment> = {
  1: {
    id: 1,
    type: PaymentType.in,
    category: 'test-income',
    amount: 100,
    monthId: '2023-04',
    dayId: '2023-04-15',
    createdAt: 123456789
  },
  2: {
    id: 2,
    type: PaymentType.out,
    category: 'test-outcome',
    amount: 200,
    monthId: '2023-04',
    dayId: '2023-04-20',
    createdAt: 123456789
  },
  3: {
    id: 3,
    type: PaymentType.in,
    category: 'test-income',
    amount: 111,
    monthId: '2023-02',
    dayId: '2023-04-05',
    createdAt: 123456789
  },
  4: {
    id: 4,
    type: PaymentType.out,
    category: 'test-outcome',
    amount: 222,
    monthId: '2023-02',
    dayId: '2023-04-10',
    createdAt: 123456789
  }
}

export async function fetchMonths (monthIds: string[]): Promise<IMonth[]> {
  return Object.values(monthsCache)
}

export async function fetchPayments (monthId: string): Promise<IPayment[]> {
  return Object.values(paymentsCache)
}

export async function storePayment (date: Date, data: IPaymentData): Promise<NewPayment> {
  const monthId = toMonthId(date)
  const month = monthsCache[monthId] ? { ...monthsCache[monthId] } : { monthId, income: 0, outcome: 0 }
  month[data.type] += data.amount

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
