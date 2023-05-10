<script setup lang="ts">
import VgBarChart from '@/components/ui/charts/VgBarChart.vue'
import { useGlobalStore } from '@/stores/global.store'
import { computed, onMounted } from 'vue'
import type { IMonth } from '@/models/month.interface'
import { toMonthLabel } from '@/helpers/date.helper'
import { toCurrency } from '@/helpers/number.helper'
import { useHomeStore } from '@/stores/home.store'
import VgPieChart from '@/components/ui/charts/VgPieChart.vue'
import { PaymentType } from '@/models/payment.interface'
import VgCard from '@/components/ui/VgCard.vue'
import type { BarChartData, PieChartData } from '@/helpers/chart.helper'

const globalStore = useGlobalStore()
const store = useHomeStore()

const barData = computed<BarChartData>(() => store.lastMonths.map((data: IMonth) => ({
  up: data.income,
  down: data.outcome,
  label: toMonthLabel(data.monthId)
})))

const pieData = computed<PieChartData>(() => {
  return Object.keys(store.currentMonth.totals).reduce((carry, categoryId) => {
    const category = globalStore.getCategory(categoryId)
    if (category.type === PaymentType.out) {
      carry.push({
        label: category.label,
        value: store.currentMonth.totals[categoryId]
      })
    }
    return carry
  }, <PieChartData>[])
})

const savings = computed(() => {
  return toCurrency(globalStore.savings ?? 0)
})

onMounted(() => {
  store.init()
})
</script>

<template>
  <div class="page-wrapper">
    <VgCard>
      <div class="home-summary">
        <div class="label">My Savings ✌️</div>
        <div class="value">{{ savings }}</div>
      </div>
      <VgBarChart :data="barData" />
    </VgCard>
    <VgCard>
      <div class="home-summary">
        <div class="label">This month</div>
        <div class="value">{{ savings }}</div>
      </div>
      <VgPieChart :data="pieData" />
    </VgCard>
  </div>
</template>

<style lang="scss">
@import "src/styles/colors";

.home-summary {
  .label {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    padding-bottom: 6px;
  }

  .value {
    font-weight: 500;
    font-size: 36px;
    line-height: 43px;
  }

  padding-bottom: 16px;
}

.vg-card + .vg-card {
  margin-top: 19px;
}

</style>
