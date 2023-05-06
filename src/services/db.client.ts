import Dexie, { type Table } from 'dexie'
import type { IMonth } from '@/models/month.interface'
import type { IPayment } from '@/models/payment.interface'

export enum DB_TABLE {
  months = 'months',
  payments = 'payments'
}

let DB!: AppDexie

class AppDexie extends Dexie {
  months!: Table<IMonth>
  payments!: Table<IPayment>

  constructor() {
    super('FinanceDB');
    this.version(1).stores({
      [DB_TABLE.months]: '&monthId',
      [DB_TABLE.payments]: '++id, monthId'
    })
  }
}

export async function getDBClient(): Promise<AppDexie> {
  if(!DB) {
    DB = new AppDexie()
    await DB.open()
  }
  return DB
}
