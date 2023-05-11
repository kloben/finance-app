import type { IMonth } from '@/models/month.interface'
import { type IPayment, PaymentType } from '@/models/payment.interface'
import type { ICategory } from '@/models/category.interface'

export const TestMonths: Record<string, IMonth> = {
  '2023-04': {
    monthId: '2023-04',
    income: 100,
    outcome: 200,
    totals: {
      inCat: 100,
      outCat: 200
    }
  },
  '2023-02': {
    monthId: '2023-02',
    income: 111,
    outcome: 222,
    totals: {
      inCat: 111,
      outCat: 222
    }
  }
}

export const TestPayments: Record<number, IPayment> = {
  1: {
    id: 1,
    type: PaymentType.in,
    category: 'inCat',
    amount: 100,
    monthId: '2023-04',
    dayId: '2023-04-15',
    createdAt: 123456789,
    description: 'Some description 1'
  },
  2: {
    id: 2,
    type: PaymentType.out,
    category: 'outCat',
    amount: 200,
    monthId: '2023-04',
    dayId: '2023-04-20',
    createdAt: 123456789
  },
  3: {
    id: 3,
    type: PaymentType.in,
    category: 'inCat',
    amount: 111,
    monthId: '2023-02',
    dayId: '2023-04-05',
    createdAt: 123456789
  },
  4: {
    id: 4,
    type: PaymentType.out,
    category: 'outCat',
    amount: 222,
    monthId: '2023-02',
    dayId: '2023-04-10',
    createdAt: 123456789
  }
}

export const TestCategories: Record<string, ICategory> = {
  inCat: {
    id: 'inCat',
    type: PaymentType.in,
    label: 'First category',
    icon: 'IC1'
  },
  outCat: {
    id: 'outCat',
    type: PaymentType.out,
    label: 'Second category',
    icon: 'IC2'
  }
}
