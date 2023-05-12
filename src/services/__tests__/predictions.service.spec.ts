import { describe, expect, it } from 'vitest'
import { calculatePredictions } from '../predictions.service'
import type { IMonth } from '../../models/month.interface'
import type { ICategory } from '../../models/category.interface'
import { PaymentType } from '../../models/payment.interface'

const testCategories = new Map<string, ICategory>(Object.entries({
  fixedIncome: <ICategory>{
    id: 'fixedIncome',
    type: PaymentType.in,
    recurrent: true,
    fixed: true
  },
  variableIncome: <ICategory>{
    id: 'variableIncome',
    type: PaymentType.in,
    recurrent: true
  },
  punctualIncome: <ICategory>{
    id: 'punctualIncome',
    type: PaymentType.in
  },
  fixedOutcome: <ICategory>{
    id: 'fixedOutcome',
    type: PaymentType.out,
    recurrent: true,
    fixed: true
  },
  variableOutcome: <ICategory>{
    id: 'variableOutcome',
    type: PaymentType.out,
    recurrent: true
  },
  punctualOutcome: <ICategory>{
    id: 'punctualOutcome',
    type: PaymentType.out
  }
}))

describe('PredictionsService', function () {
  it('calculates without payments', () => {
    const input: IMonth[] = [
      <IMonth>{ monthId: '2023-05', income: 0, outcome: 0, totals: {} },
      <IMonth>{ monthId: '2023-05', income: 0, outcome: 0, totals: {} }
    ]
    const output = calculatePredictions(input, testCategories, ['2023-07', '2023-08'])

    expect(output).toEqual([
      { monthId: '2023-07', income: 0, outcome: 0, totals: {} },
      { monthId: '2023-08', income: 0, outcome: 0, totals: {} },
    ])
  })

  it('calculates with same fixed income', () => {
    const input: IMonth[] = [
      { monthId: '2023-05', income: 0, outcome: 0, totals: { fixedIncome: 100 } },
      { monthId: '2023-06', income: 0, outcome: 0, totals: { fixedIncome: 100 } }
    ]
    const output = calculatePredictions(input, testCategories, ['2023-07', '2023-08'])

    expect(output).toEqual([
      { monthId: '2023-07', income: 100, outcome: 0, totals: { fixedIncome: 100 } },
      { monthId: '2023-08', income: 100, outcome: 0, totals: { fixedIncome: 100 } },
    ])
  })

  it('calculates with only last fixed income', () => {
    const input: IMonth[] = [
      { monthId: '2023-05', income: 0, outcome: 0, totals: { fixedIncome: 300 } },
      { monthId: '2023-06', income: 0, outcome: 0, totals: { fixedIncome: 100 } }
    ]
    const output = calculatePredictions(input, testCategories, ['2023-07', '2023-08'])

    expect(output).toEqual([
      { monthId: '2023-07', income: 100, outcome: 0, totals: { fixedIncome: 100 } },
      { monthId: '2023-08', income: 100, outcome: 0, totals: { fixedIncome: 100 } },
    ])
  })

  it('predicts single variable outcome', () => {
    const input: IMonth[] = [
      { monthId: '2023-05', income: 0, outcome: 0, totals: { variableOutcome: 50 } },
      { monthId: '2023-06', income: 0, outcome: 0, totals: { variableOutcome: 100 } }
    ]
    const output = calculatePredictions(input, testCategories, ['2023-07', '2023-08'])

    expect(output).toEqual([
      { monthId: '2023-07', income: 0, outcome: 150, totals: { variableOutcome: 150 } },
      { monthId: '2023-08', income: 0, outcome: 200, totals: { variableOutcome: 200 } },
    ])
  })

  it('mixed predictions and fixed', () => {
    const input: IMonth[] = [
      { monthId: '2023-05', income: 0, outcome: 0, totals: { fixedIncome: 1, variableIncome: 5, fixedOutcome: 50, punctualOutcome: 100 } },
      { monthId: '2023-06', income: 0, outcome: 0, totals: { fixedIncome: 1, variableIncome: 10, fixedOutcome: 50, punctualOutcome: 200 } }
    ]
    const output = calculatePredictions(input, testCategories, ['2023-07', '2023-08'])

    expect(output).toEqual([
      { monthId: '2023-07', income: 16, outcome: 350, totals: { fixedIncome: 1, variableIncome: 15, fixedOutcome: 50, punctualOutcome: 300 } },
      { monthId: '2023-08', income: 21, outcome: 450, totals: { fixedIncome: 1, variableIncome: 20, fixedOutcome: 50, punctualOutcome: 400 } },
    ])
  })

  it('not returns negative values', () => {
    const input: IMonth[] = [
      { monthId: '2023-05', income: 0, outcome: 0, totals: { variableOutcome: 200 } },
      { monthId: '2023-06', income: 0, outcome: 0, totals: { variableOutcome: 50 } }
    ]
    const output = calculatePredictions(input, testCategories, ['2023-07', '2023-08'])

    expect(output).toEqual([
      { monthId: '2023-07', income: 0, outcome: 0, totals: { variableOutcome: 0 } },
      { monthId: '2023-08', income: 0, outcome: 0, totals: { variableOutcome: 0 } },
    ])
  })
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
