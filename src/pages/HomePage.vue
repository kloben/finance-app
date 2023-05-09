<script setup lang="ts">
import VgBarChart from '@/components/ui/charts/VgBarChart.vue'
import { useGlobalStore } from '@/stores/global.store'
import { computed, onMounted } from 'vue'
import type { IMonth } from '@/models/month.interface'
import { toMonthLabel } from '@/helpers/date.helper'
import { toCurrency } from '@/helpers/number.helper'
import { useHomeStore } from '@/stores/home.store'
import type { BarChartData, PieChartData } from '@/components/ui/charts/chart-value.interface'
import VgPieChart from '@/components/ui/charts/VgPieChart.vue'
import { PaymentType } from '@/models/payment.interface'

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
      <div class="guide big"></div>
      <div class="guide small a"></div>
      <div class="guide small b"></div>
      <div class="footer"></div>
    </div>


    <div class="text-title-4">Total savings: {{ savings }}</div>
    <VgBarChart :data="barData" />
    <VgPieChart :data="pieData" />
  </div>
</template>

<style lang="scss">
@import "src/styles/colors";

.text-title-4 {
  padding-bottom: 32px;
}

.footer-container {
  width: 100%;
  height: 82px;
  background: grey;
  position: relative;

  $big: 41px;
  $small: 33px;
  $smallOffset: 25px;

  --bg-layer-1: radial-gradient(
                  circle at 50% 0,
                  transparent #{$big},
                  #fff calc(#{$big} + 1px)
  ) 0 #{$small} / 100% calc(100% - #{$small}) no-repeat no-repeat;
  --bg-layer-2: radial-gradient(
                  circle at calc(100% - #{$big}) 100%,
                  #fff #{$big},
                  transparent calc(#{$big} + 1px)
  ) 0 0 / calc(50% - #{$big}) #{$big} no-repeat no-repeat;
  --bg-layer-3: radial-gradient(
                  circle at #{$big} 100%,
                  #fff #{$big},
                  transparent calc(#{$big} + 1px)
  ) 100% 0 / calc(50% - #{$big}) #{$big} no-repeat no-repeat;
  --bg-layer-4: linear-gradient(
                  90deg,
                  #fff calc(50% - #{$big} - #{$small}),
                  transparent calc(50% - #{$big} - #{$small} + 1px),
                  transparent calc(50% + #{$big} + #{$small} - 1px),
                  #fff calc(50% + #{$big} + #{$small})
  ) 0 0 / 100% #{$small} no-repeat no-repeat;
  --bg-layer-test: linear-gradient(
                  90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%
  ) 100% 0 / calc(50% - #{$big}) #{$big} no-repeat no-repeat;
  //
  // x-pos y-pos / width height no-repeat

  .footer {
    width: 100%;
    height: 100%;
    background: var(--bg-layer-1), var(--bg-layer-2), var(--bg-layer-3), var(--bg-layer-4)
  }

  .guide {
    border-radius: 50%;
    aspect-ratio: 1;
    opacity: 0.5;
    position: absolute;

    &.big {
      background: #02c902;
      height: calc($big * 2);
      top: -50%;
      left: calc(50% - $big);
    }

    &.small {
      background: #c9023e;
      height: calc($small * 2);
      top: 0;

      &.a {
        left: calc(50% - $big - $small - $smallOffset);
      }

      &.b {
        left: calc(50% + $big - $small + $smallOffset);
      }
    }
  }
}

</style>
