import type { ICategory } from '@/models/category.interface'
import { PaymentType } from '@/models/payment.interface'

export const categoriesV1: Omit<ICategory, 'id'>[] = [
  { label: 'Salary', type: PaymentType.in, recurrent: true, fixed: true },

  { label: 'Electricity', type: PaymentType.out, recurrent: true },
  { label: 'Gas', type: PaymentType.out, recurrent: true },
  { label: 'Fuel', type: PaymentType.out },
  { label: 'Shopping', type: PaymentType.out },
  { label: 'Restaurants', type: PaymentType.out },
  { label: 'Groceries', type: PaymentType.out }
]

export const IncomeCategory: Record<string, string> = {
  salary: 'Salary'
}

export const OutcomeCategory: Record<string, string> = {
  electricity: 'Electricity',
  gas: 'Gas',
  fuel: 'Fuel',
  shopping: 'Shopping',
  restaurants: 'Restaurants',
  groceries: 'Groceries'
}
