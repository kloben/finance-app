import Dexie from 'dexie'
import { toDayId, toMonthId } from '@/helpers/date.helper'
import type { IMonth } from '@/models/month.interface'
import type { IPayment, IPaymentData } from '@/models/payment.interface'

export interface NewPayment {
  payment: IPayment
  month: IMonth
  savings: number | null
}

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
    months: '&monthId',
    payments: '++id, monthId'
  })
  await DB.open()
}

export async function fetchMonths (monthIds: string[]): Promise<IMonth[]> {
  return await DB.table(DB_TABLE.months).bulkGet(monthIds)
    .then(months => months.filter(v => v))
}

export async function fetchPayments (monthId: string): Promise<IPayment[]> {
  return await DB.table(DB_TABLE.payments)
    .where({ monthId })
    .toArray()
}

export async function storePayment (date: Date, data: IPaymentData): Promise<NewPayment> {
  const paymentData: Omit<IPayment, 'id'> = {
    ...data,
    createdAt: Date.now(),
    dayId: toDayId(date),
    monthId: toMonthId(date)
  }
  return await DB.transaction('rw', DB_TABLE.months, DB_TABLE.payments, async () => {
    const month = await upsertMonth(paymentData)
    const payment = await createPayment(paymentData)
    const savings = updateSavings(payment)
    return { payment, month, savings }
  })
}

function updateSavings (payment: IPayment): number | null {
  if (new Date(payment.monthId).getMonth() === new Date().getMonth()) {
    let current = fetchSavings() ?? 0
    current += (payment.amount * (payment.type === 'income' ? 1 : -1))
    storeSavings(current)
    return current
  }
  return null
}

async function createPayment (paymentData: Omit<IPayment, 'id'>): Promise<IPayment> {
  const id = await DB.table(DB_TABLE.payments).add(paymentData) as number
  return { id, ...paymentData }
}

async function upsertMonth (payment: Omit<IPayment, 'id'>): Promise<IMonth> {
  let month: IMonth | undefined = await DB.table(DB_TABLE.months).get({ monthId: payment.monthId })
  let newMonth = false
  if (month === undefined) {
    newMonth = true
    month = { monthId: payment.monthId, outcome: 0, income: 0 }
  }
  month[payment.type] += payment.amount
  newMonth
    ? await DB.table(DB_TABLE.months).add(month)
    : await DB.table(DB_TABLE.months).update({ monthId: payment.monthId }, month)
  return month
}

export function fetchSavings (): number | null {
  const stored = localStorage.getItem(STORAGE_KEY.savings)
  return (stored != null) ? Number(stored) : null
}

export function storeSavings (value: number): void {
  localStorage.setItem(STORAGE_KEY.savings, String(value))
}
