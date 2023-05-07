import { describe, expect, it } from 'vitest'
import { calculatePredictions } from '../predictions.service'
import type { IMonth } from '../../models/month.interface'
import type { ICategory } from '../../models/category.interface'
import { PaymentType } from '../../models/payment.interface'
import { getEmptyMonth } from '../../helpers/data.helper'

const testCategories = new Map<string, ICategory>(Object.entries({
  fixedIncome: <ICategory>{
    type: PaymentType.in,
    recurrent: true,
    fixed: true
  },
  variableIncome: <ICategory>{
    type: PaymentType.in,
    recurrent: true
  },
  punctualIncome: <ICategory>{
    type: PaymentType.in
  },
  fixedOutcome: <ICategory>{
    type: PaymentType.out,
    recurrent: true,
    fixed: true
  },
  variableOutcome: <ICategory>{
    type: PaymentType.out,
    recurrent: true
  },
  punctualOutcome: <ICategory>{
    type: PaymentType.out
  }
}))

describe('PredictionsService', function () {
  it('calculates without payments', () => {
    const input = <IMonth[]>[getEmptyMonth('2023-05'), getEmptyMonth('2023-06')]

    const output = calculatePredictions(input, testCategories, ['2023-07', '2023-08'])

    expect(output).toEqual([
      { monthId: '2023-07', income: 0, outcome: 0, totals: {} },
      { monthId: '2023-08', income: 0, outcome: 0, totals: {} },
    ])
  })

  // it('calculates with single payment type', () => {
  //   const input: IPredictionInput[] = [
  //     {
  //       monthId: '2023-05',
  //       payments: [
  //         <IPayment>{ type: 'income', category: 'test', amount: 10 }
  //       ]
  //     },
  //     {
  //       monthId: '2023-06',
  //       payments: [
  //         <IPayment>{ type: 'income', category: 'test', amount: 20 }
  //       ]
  //     }
  //   ]
  //
  //   const output = calculatePredictions(input, ['2023-07', '2023-08'])
  //
  //   expect(output).toEqual([
  //     { monthId: '2023-07', income: 30, outcome: 0 },
  //     { monthId: '2023-08', income: 40, outcome: 0 },
  //   ])
  // })
  //
  // it('calculates with single income, single outcome', () => {
  //   const input: IPredictionInput[] = [
  //     {
  //       monthId: '2023-05',
  //       payments: [
  //         <IPayment>{ type: 'income', category: 'test-in', amount: 10 },
  //         <IPayment>{ type: 'outcome', category: 'test-out', amount: 50 }
  //       ]
  //     },
  //     {
  //       monthId: '2023-06',
  //       payments: [
  //         <IPayment>{ type: 'income', category: 'test-in', amount: 20 },
  //         <IPayment>{ type: 'outcome', category: 'test-out', amount: 100 }
  //       ]
  //     }
  //   ]
  //
  //   const output = calculatePredictions(input, ['2023-07', '2023-08'])
  //
  //   expect(output).toEqual([
  //     { monthId: '2023-07', income: 30, outcome: 150 },
  //     { monthId: '2023-08', income: 40, outcome: 200 },
  //   ])
  // })
  //
  // it('calculates with multiple incomes and outcomes', () => {
  //   const input: IPredictionInput[] = [
  //     {
  //       monthId: '2023-05',
  //       payments: [
  //         <IPayment>{ type: 'income', category: 'test-in', amount: 10 },
  //         <IPayment>{ type: 'income', category: 'test-in2', amount: 5 },
  //         <IPayment>{ type: 'outcome', category: 'test-out', amount: 50 },
  //         <IPayment>{ type: 'outcome', category: 'test-out2', amount: 11 }
  //       ]
  //     },
  //     {
  //       monthId: '2023-06',
  //       payments: [
  //         <IPayment>{ type: 'income', category: 'test-in', amount: 20 },
  //         <IPayment>{ type: 'income', category: 'test-in2', amount: 10 },
  //         <IPayment>{ type: 'outcome', category: 'test-out', amount: 100 },
  //         <IPayment>{ type: 'outcome', category: 'test-out2', amount: 22 }
  //       ]
  //     }
  //   ]
  //
  //   const output = calculatePredictions(input, ['2023-07', '2023-08'])
  //
  //   expect(output).toEqual([
  //     { monthId: '2023-07', income: 45, outcome: 183 },
  //     { monthId: '2023-08', income: 60, outcome: 244 }
  //   ])
  // })
  //
  // it('not returns negative values', () => {
  //   const input: IPredictionInput[] = [
  //     {
  //       monthId: '2023-05',
  //       payments: [
  //         <IPayment>{ type: 'income', category: 'test', amount: 300 }
  //       ]
  //     },
  //     {
  //       monthId: '2023-06',
  //       payments: [
  //         <IPayment>{ type: 'income', category: 'test', amount: 100 }
  //       ]
  //     }
  //   ]
  //
  //   const output = calculatePredictions(input, ['2023-07', '2023-08'])
  //
  //   expect(output).toEqual([
  //     { monthId: '2023-07', income: 0, outcome: 0 },
  //     { monthId: '2023-08', income: 0, outcome: 0 },
  //   ])
  // })
})
