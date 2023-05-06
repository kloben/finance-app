import { useFinancesStore } from '@/stores/finances.store'
import { PaymentType } from '@/models/payment.interface'
import { IncomeCategory, OutcomeCategory } from '@/data/categories.enum'

export async function makeRandomPayment (max: number = 1) {
  const store = useFinancesStore()
  const date = new Date()
  for (let i = 0; i < max; i++) {
    const type: PaymentType = rand(0, 10) >= 7 ? PaymentType.in : PaymentType.out
    const category = type === PaymentType.in
      ? Object.values(IncomeCategory)[rand(0, Object.values(IncomeCategory).length - 1)]
      : Object.values(OutcomeCategory)[rand(0, Object.values(OutcomeCategory).length - 1)]
    const amount = rand(10, 250)
    await store.createPayment(
      new Date(date.getFullYear(), rand(date.getMonth() - 4, date.getMonth()), rand(1, 28)),
      {
        type,
        category,
        amount,
        description: crypto.randomUUID()
      }
    )
  }
}

function rand (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
