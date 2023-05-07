import type { IMonth } from '@/models/month.interface'
import type { IPayment, IPaymentData } from '@/models/payment.interface'
import { PaymentType } from '@/models/payment.interface'
import type { NewPayment } from '@/services/db.service'
import { toDayId, toMonthId } from '@/helpers/date.helper'
import type { ICategory } from '@/models/category.interface'

const monthsCache: Record<string, IMonth> = {
  '2023-04': {
    monthId: '2023-04',
    income: 100,
    outcome: 200,
    totals: {
      inCat: 100,
      outCat: 200
    }
  },
  '2023-02': {
    monthId: '2023-02',
    income: 111,
    outcome: 222,
    totals: {
      inCat: 111,
      outCat: 222
    }
  }
}
const paymentsCache: Record<number, IPayment> = {
  1: {
    id: 1,
    type: PaymentType.in,
    category: 'inCat',
    amount: 100,
    monthId: '2023-04',
    dayId: '2023-04-15',
    createdAt: 123456789
  },
  2: {
    id: 2,
    type: PaymentType.out,
    category: 'outCat',
    amount: 200,
    monthId: '2023-04',
    dayId: '2023-04-20',
    createdAt: 123456789
  },
  3: {
    id: 3,
    type: PaymentType.in,
    category: 'inCat',
    amount: 111,
    monthId: '2023-02',
    dayId: '2023-04-05',
    createdAt: 123456789
  },
  4: {
    id: 4,
    type: PaymentType.out,
    category: 'outCat',
    amount: 222,
    monthId: '2023-02',
    dayId: '2023-04-10',
    createdAt: 123456789
  }
}

const categoriesCache: Record<string, ICategory> = {
  inCat: {
    id: 'inCat',
    type: PaymentType.in,
    label: 'First category'
  },
  outCat: {
    id: 'outCat',
    type: PaymentType.out,
    label: 'Second category'
  }
}

export async function fetchMonth (monthId: string): Promise<IMonth> {
  return monthsCache[monthId] ?? { monthId, income: 0, outcome: 0, totals: {} }
}

export async function fetchCategories (): Promise<ICategory[]> {
  return Object.values(categoriesCache)
}

export async function fetchPayments (monthId: string): Promise<IPayment[]> {
  return Object.values(paymentsCache).filter(payment => payment.monthId === monthId)
}

export async function storePayment (date: Date, data: IPaymentData): Promise<NewPayment> {
  const monthId = toMonthId(date)
  const month: IMonth = JSON.parse(JSON.stringify(monthsCache[monthId] ?? {
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
