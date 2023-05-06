import type { IMonth } from '@/models/month.interface'
import type { IPayment } from '@/models/payment.interface'
import { linearRegression, linearRegressionLine } from 'simple-statistics'

export interface IPredictionInput {
  monthId: string
  payments: IPayment[]
}

export function calculatePredictions (inputData: IPredictionInput[], outputs: string[]): IMonth[] {
  const flattenData: Record<string, Record<string, number[]>> = {
    income: {},
    outcome: {}
  }
  inputData.forEach((data, index) => {
    for (const payment of data.payments) {
      if (!flattenData[payment.type][payment.category ?? 'others']) {
        flattenData[payment.type][payment.category ?? 'others'] = new Array(inputData.length).fill(0)
      }
      flattenData[payment.type][payment.category ?? 'others'][index] += payment.amount
    }
  })
  const regressions: Record<string, Record<string, (x: number) => number>> = {
    income: {},
    outcome: {}
  }
  for (const type in flattenData) {
    for (const categoryId in flattenData[type]) {
      regressions[type][categoryId] = linearRegressionLine(linearRegression(flattenData[type][categoryId].map((v, i) => ([i, v]))))
    }
  }
  return outputs.map((monthId, index) => {
    const ix = index + inputData.length
    return {
      monthId,
      income: Math.round(Object.values(regressions.income).reduce((carry, fn) => carry + Math.max(0, fn(ix)), 0)),
      outcome: Math.round(Object.values(regressions.outcome).reduce((carry, fn) => carry + Math.max(0, fn(ix)), 0))
    }
  })
}
