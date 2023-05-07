import Dexie, { type Table, type Transaction } from 'dexie'
import type { IMonth, IMonthTotals } from '@/models/month.interface'
import type { IPayment } from '@/models/payment.interface'
import type { ICategory } from '@/models/category.interface'
import { categoriesV1 } from '@/data/categories'

export enum DB_TABLE {
  months = 'months',
  payments = 'payments',
  categories = 'categories'
}

let DB!: AppDexie

class AppDexie extends Dexie {
  months!: Table<IMonth>
  payments!: Table<IPayment>
  categories!: Table<ICategory>

  constructor () {
    super('FinanceDB')
    this.version(1).stores({
      [DB_TABLE.months]: '&monthId',
      [DB_TABLE.payments]: '++id, monthId',
      [DB_TABLE.categories]: 'id'
    })

    this.version(2).stores({
      [DB_TABLE.months]: '&monthId',
      [DB_TABLE.payments]: '++id, monthId',
      [DB_TABLE.categories]: '&id'
    }).upgrade(async (tx: Transaction) => {
      const months: IMonth[] = await tx.table(DB_TABLE.months).toArray()
      for (const { monthId } of months) {
        const totals: IMonthTotals = {}
        const payments: IPayment[] = await tx.table(DB_TABLE.payments).where({ monthId }).toArray()
        for (const payment of payments) {
          totals[payment.category ?? ''] = (totals[payment.category ?? ''] ?? 0) + payment.amount
        }
        await tx.table(DB_TABLE.months).update(monthId, { totals })
      }
    })

    this.on('populate', (tx: Transaction) => {
      return tx.table(DB_TABLE.categories).bulkAdd(categoriesV1)
    })
  }
}

export async function getDBClient (): Promise<AppDexie> {
  if (!DB) {
    DB = new AppDexie()
    await DB.open()
  }
  return DB
}
