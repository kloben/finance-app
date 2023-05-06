import Dexie, { type Table, type Transaction } from 'dexie'
import type { IMonth } from '@/models/month.interface'
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
