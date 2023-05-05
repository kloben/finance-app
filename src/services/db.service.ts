import Dexie from 'dexie'
import { toDayId, toMonthId } from '@/helpers/date.helper'
import type { IMonth } from '@/models/month-data.interface'
import type { IPayment, IPaymentData } from '@/models/payment.interface'

enum DB_TABLE {
  months = 'months',
  payments = 'payments'
}

enum STORAGE_KEY {
  savings = 'finance-db-savings'
}

let DB!: Dexie

export async function initDB (): Promise<void> {
  DB = new Dexie('FinanceDB')
  DB.version(1).stores({
    months: '++id, &monthId',
    payments: '++id, monthId, dayId'
  })
  await DB.open()
}

export async function fetchMonths (monthIds: string[]): Promise<IMonth[]> {
  return await DB.table(DB_TABLE.months).bulkGet(monthIds)
    .then(months => months.filter(v => v))
}

export async function storeMonth (date: Date, data: IMonth): Promise<IMonth> {
  // const monthId = await DB.table(DB_TABLE.months).add(data)
  // return {
  //   id: monthId,
  //   ...data
  // }
  return data
}

export async function storePayment (date: Date, data: IPaymentData): Promise<IPayment> {
  const payment: Omit<IPayment, 'id'> = {
    ...data,
    createdAt: Date.now(),
    dayId: toDayId(date),
    monthId: toMonthId(date)
  }
  const paymentId = await DB.transaction('rw', DB_TABLE.months, DB_TABLE.payments, async () => {
    const month = await DB.table(DB_TABLE.months).get({ monthId: payment.monthId }) as IMonth
    await DB.table(DB_TABLE.months)
      .where({ monthId: payment.monthId })
      .modify(payment.type === 'income'
        ? { income: payment.amount + month.income }
        : { outcome: payment.amount + month.outcome })
    return await DB.table(DB_TABLE.payments).add(payment)
  })
  console.log(paymentId)
  return { id: 123, ...payment }
}

export function fetchSavings (): number | null {
  const stored = localStorage.getItem(STORAGE_KEY.savings)
  return (stored != null) ? Number(stored) : null
}

export function storeSavings (value: number): void {
  localStorage.setItem(STORAGE_KEY.savings, String(value))
}
