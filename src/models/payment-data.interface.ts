export interface IPaymentData {
  dayId: string // YYYY-MM-DD
  monthId: string // YYYY-MM
  createdAt: number
  amount: number
  category: string
  description?: string
  recurrent: boolean
}
