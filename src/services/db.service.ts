import Dexie from 'dexie'
import { toDayId, toMonthId } from '@/helpers/date.helper'
import type { IMonth, IMonthData } from '@/models/month-data.interface'
import type { IPayment, IPaymentData } from '@/models/payment.interface'

enum TABLE {
  months = 'months',
  payments = 'payments'
}

let DB!: Dexie

export async function initDB (): Promise<void> {
  DB = new Dexie('FinanceDB')
  DB.version(1).stores({
    months: 'monthId',
    payments: '++id, monthId, dayId'
  })
  await DB.open()
}

export async function fetchMonths (limit: number = 5): Promise<IMonth[]> {
  return await DB.table(TABLE.months).orderBy('monthId').limit(limit).toArray()
}

export async function storeMonth (date: Date, data: IMonthData): Promise<IMonth> {
  const month: IMonth = {
    monthId: toMonthId(date),
    ...data
  }
  await DB.table(TABLE.months).add(month)
  return month
}

export async function storePayment (date: Date, data: IPaymentData): Promise<IPayment> {
  const payment: Omit<IPayment, 'id'> = {
    ...data,
    createdAt: Date.now(),
    dayId: toDayId(date),
    monthId: toMonthId(date)
  }
  const paymentId = await DB.transaction('rw', TABLE.months, TABLE.payments, async () => {
    const month = await DB.table(TABLE.months).get({ monthId: payment.monthId }) as IMonth
    await DB.table(TABLE.months)
      .where({ monthId: payment.monthId })
      .modify(payment.type === 'income'
        ? { income: payment.amount + month.income }
        : { outcome: payment.amount + month.outcome })
    return await DB.table(TABLE.payments).add(payment)
  })
  console.log(paymentId)
  return { id: 123, ...payment }
}
