<script setup lang="ts">
import VgBarChart from '@/components/ui/charts/VgBarChart.vue'
import {useGlobalStore} from '@/stores/global.store'
import {computed, onMounted} from 'vue'
import type {IMonth} from '@/models/month.interface'
import {toMonthLabel} from '@/helpers/date.helper'
import {toCurrency} from '@/helpers/number.helper'
import {useHomeStore} from '@/stores/home.store'
import type {BarChartData, PieChartData} from '@/components/ui/charts/chart-value.interface'
import VgPieChart from '@/components/ui/charts/VgPieChart.vue'
import {PaymentType} from '@/models/payment.interface'

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

    <div class="footer-container">
      <div class="footer"></div>
    </div>


    <div class="text-title-4">Total savings: {{ savings }}</div>
    <VgBarChart :data="barData"/>
    <VgPieChart :data="pieData"/>
  </div>
</template>

<style lang="scss">
@import "src/styles/colors";

.text-title-4 {
  padding-bottom: 32px;
}

.footer-container {
  width: 100%;
  height: 75px;
  background: grey;

  $cut: 30px;
  $round: 20px;

  --bg-layer-1: radial-gradient(
                  circle at 50% 0,
                  transparent #{$cut},
                  #fff calc(#{$cut} + 1px)
  ) 0 #{$round} / 100% calc(100% - #{$round}) no-repeat no-repeat;
  --bg-layer-2: radial-gradient(
                  circle at calc(100% - #{$cut}) 100%,
                  #fff #{$cut},
                  transparent calc(#{$cut} + 1px)
  ) 0 0 / calc(50% - #{$cut}) #{$cut} no-repeat no-repeat;


  .footer {
    width: 100%;
    height: 100%;
    background: var(--bg-layer-1), var(--bg-layer-2);

    // x-pos y-pos / width height no-repeat
  }
}

</style>
