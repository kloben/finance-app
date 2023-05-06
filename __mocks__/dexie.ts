import type { IMonth } from '../src/models/month.interface'

const monthsCache: Record<string, IMonth> = {
  '2023-05': { monthId: '2023-05', income: 123, outcome: 321 },
  '2023-04': { monthId: '2023-04', income: 456, outcome: 654 }
}

export default class DexieMock {
  version = () => this
  stores = () => this
  open = async () => this
  months = {
    bulkGet: async (ids: string[]) => ids.map(id => monthsCache[id])
  }
}
