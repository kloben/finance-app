import Dexie from 'dexie'
import type { IMonthData } from '@/models/month-data.interface'

let DB!: Dexie

export async function initDB (): Promise<void> {
  DB = new Dexie('FinanceDB')
  DB.version(1).stores({
    months: 'monthId',
    payments: 'dayId, monthId',
    categories: '++id',
    subCategories: '++id, category'
  })
  await DB.open()
}

export async function fetchMonths (limit: number = 10): Promise<IMonthData[]> {
  return await DB.table('months').orderBy('month').limit(limit).toArray()
}

export async function storeMonth (month: IMonthData): Promise<IMonthData> {
  return await DB.table('months').add(month).then(() => month)
}
