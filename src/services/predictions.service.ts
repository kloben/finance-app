import type { IMonth } from '@/models/month.interface'
import type { IPayment } from '@/models/payment.interface'
import { linearRegression, linearRegressionLine } from 'simple-statistics'
import { toMonthId } from '@/helpers/date.helper'

interface IPredictionInput {
  monthId: string
  payments: IPayment[]
}

export function calculatePredictions (inputData: IPredictionInput[], num: number = 4): IMonth[] {
  const flattenData: Record<string, Record<string, number[]>> = {
    income: {},
    outcome: {}
  }
  inputData.forEach((data, index) => {
    for (const payment of data.payments) {
      if (!flattenData[payment.type][payment.category]) {
        flattenData[payment.type][payment.category] = new Array(inputData.length).fill(0)
      }
      flattenData[payment.type][payment.category][index] += payment.amount
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
  const date = new Date(inputData[inputData.length - 1].monthId)
  return new Array(num).fill(0).map((_, index) => {
    const ix = index + inputData.length
    date.setMonth(date.getMonth() + 1)
    return {
      monthId: toMonthId(date),
      income: Math.round(Object.values(regressions.income).reduce((carry, fn) => carry + Math.max(0, fn(ix)), 0)),
      outcome: Math.round(Object.values(regressions.outcome).reduce((carry, fn) => carry + Math.max(0, fn(ix)), 0))
    }
  })
}
