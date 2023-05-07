import type { IMonth } from '@/models/month.interface'
import { linearRegression, linearRegressionLine } from 'simple-statistics'
import type { ICategory } from '@/models/category.interface'
import { getEmptyMonth } from '@/helpers/data.helper'

type CompositeData = Record<string, number[]>
type FixedData = Record<string, number>
type RegressionData = Record<string, (x: number) => number>
type CategoriesData = Map<string, ICategory>

export function calculatePredictions (inputs: IMonth[], categories: CategoriesData, next: string[]): IMonth[] {
  const { fixed, composite } = groupByVariability(inputs, categories)
  const regressions = generateRegressions(composite)
  return generateEstimates(regressions, fixed, categories, inputs.length, next)
}

function groupByVariability (inputs: IMonth[], categories: CategoriesData): {
  composite: CompositeData,
  fixed: FixedData
} {
  const composite: CompositeData = {}
  const fixed: FixedData = {}
  for (const [index, month] of inputs.entries()) {
    for (const categoryId in month.totals) {
      const category = getCategory(categories, categoryId)
      if (category.recurrent && category.fixed) {
        if (index === inputs.length - 1) {
          fixed[categoryId] = month.totals[categoryId]
        }
        continue
      }
      if (!composite[categoryId]) {
        composite[categoryId] = new Array(inputs.length).fill(0)
      }
      composite[categoryId][index] = month.totals[categoryId]
    }
  }

  return { composite, fixed }
}

function generateRegressions (inputs: Record<string, number[]>): RegressionData {
  const regressions: RegressionData = {}
  for (const categoryId in inputs) {
    regressions[categoryId] = linearRegressionLine(linearRegression(inputs[categoryId].map((v, i) => ([i, v]))))
  }
  return regressions
}

function generateEstimates (regressions: RegressionData, fixed: FixedData, categories: CategoriesData, offset: number, outputs: string[]): IMonth[] {
  return outputs.map((monthId, index) => {
    const month = getEmptyMonth(monthId)
    for (const categoryId in fixed) {
      updatePrediction(month, fixed[categoryId], getCategory(categories, categoryId))
    }
    for (const categoryId in regressions) {
      updatePrediction(month, regressions[categoryId](offset + index), getCategory(categories, categoryId))
    }
    return month
  })
}

function updatePrediction (month: IMonth, amount: number, category: ICategory): void {
  month[category.type] += Math.max(amount, 0)
  month.totals[category.id] = Math.max(amount, 0)
}

function getCategory (categories: CategoriesData, categoryId?: string): ICategory {
  return categoryId ? (categories.get(categoryId) ?? <ICategory>{}) : <ICategory>{}
}
