export interface ITransaction {
  day: string // YYYY-MM-DD
  createdAt: number
  amount: number
  category: string
  subCategory: string
  description?: string
  recurrent: boolean
}
