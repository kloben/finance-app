import DexieMock from '../../../__mocks__/dexie'

export async function getDBClient(): Promise<any> {
  return new DexieMock()
}
