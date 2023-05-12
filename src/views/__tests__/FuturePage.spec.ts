import { describe, it, afterAll, beforeAll, beforeEach, vi, expect } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { useGlobalStore } from '../../stores/global.store';
import FuturePage from "../FuturePage.vue";

function generateWrapper (): VueWrapper<FuturePage> {
  return mount(FuturePage, {
    global: {
      stubs: ['VgChartBar', 'VgChartPie']
    }
  })
}

describe('FuturePage', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2023, 3, 30))
    vi.mock('../../services/db.service.ts')
  })
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  afterAll(() => {
    vi.useRealTimers()
  })

  it('Mounts with current data', async () => {
    await useGlobalStore().init()
    const wrapper = generateWrapper()
    await flushPromises()

    expect(wrapper.vm.chartData.length).toBe(5)
    expect(wrapper.vm.chartData[0].predicted).toBe(false)
    expect(wrapper.vm.chartData[1].predicted).toBe(true)
  })
})