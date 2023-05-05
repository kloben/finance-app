import Dexie from 'dexie'
import type { IMonthSummary } from '@/models/month-summary.interface'

let DB!: Dexie

export async function initDB (): Promise<void> {
  DB = new Dexie('FinanceDB')
  DB.version(1).stores({
    transactions: 'day',
    summaries: 'month',
    categories: '++id',
    subCategories: '++id, category'
  })
  await DB.open()
}

export async function fetchMonths (): Promise<IMonthSummary[]> {
  return await DB.table('summaries').orderBy('month').limit(10).toArray()
}

export async function storeMonth (month: IMonthSummary): Promise<IMonthSummary> {
  return await DB.table('summaries').add(month).then(() => month)
}
