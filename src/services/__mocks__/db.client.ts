import { TestCategories, TestMonths, TestPayments } from '@/services/__mocks__/test-data'

export async function getDBClient (): Promise<any> {
  return new DexieMock()
}

class DexieMock {
  version = () => this
  stores = () => this
  open = async () => this
  months = {
    // bulkGet: async (ids: string[]) => ids.map(id => monthsCache[id]),
    get: async (monthId: string) => TestMonths[monthId],
    bulkGet: async (monthIds: string[]) => monthIds.map(monthId => TestMonths[monthId]).filter(v => Boolean(v))
  }
  payments = {
    where: (query: any) => ({
      toArray: async () => Object.values(TestPayments).filter(p => p.monthId === query.monthId)
    })
  }
  categories = {
    toArray: async () => Object.values(TestCategories)
  }
}
