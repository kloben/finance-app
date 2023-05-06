import { useGlobalStore } from '@/stores/global.store'
import { categoriesV1 } from '@/data/categories'

export async function makeRandomPayment (max: number = 1) {
  const store = useGlobalStore()
  const date = new Date()
  for (let i = 0; i < max; i++) {
    const { id, type } = categoriesV1[rand(0, categoriesV1.length - 1)]
    const amount = rand(10, 250)
    await store.createPayment(
      new Date(date.getFullYear(), rand(date.getMonth() - 4, date.getMonth()), rand(1, 28)),
      {
        type,
        category: id,
        amount,
        description: crypto.randomUUID()
      }
    )
  }
}

function rand (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
