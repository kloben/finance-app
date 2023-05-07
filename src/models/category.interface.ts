import type { PaymentType } from '@/models/payment.interface'

export interface ICategory {
  id: string
  label: string
  type: PaymentType
  recurrent?: boolean
  fixed?: boolean
}
