export type PaymentType = 'income' | 'outcome'

export interface IPaymentData {
  type: PaymentType
  amount: number
  category: string
  description?: string
  recurrent?: boolean
}

export interface IPayment extends IPaymentData {
  id: number
  dayId: string // YYYY-MM-DD
  monthId: string // YYYY-MM
  createdAt: number
}
