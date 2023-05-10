<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useDetailStore } from '@/stores/detail.store'
import { modifyMonthId, toMonthId, toMonthLabel } from '@/helpers/date.helper'
import PaymentInfo from '@/components/PaymentInfo.vue'
import type { IPayment } from '@/models/payment.interface'
import VgPieChart from '@/components/ui/charts/VgPieChart.vue'
import type { PieChartData } from '@/components/ui/charts/chart-value.interface'
import { useGlobalStore } from '@/stores/global.store'
import VgIconBack from '@/components/ui/icons/old/VgIconBack.vue'
import VgIconNext from '@/components/ui/icons/old/VgIconNext.vue'

const store = useDetailStore()
const globalStore = useGlobalStore()

onMounted(() => {
  store.loadMonth(toMonthId(new Date()))
})

const cleanDate = computed<string>(() => {
  if (!store.monthId) {
    return ''
  }
  return `${toMonthLabel(store.monthId)} ${store.monthId.split('-')[0]}`
})

const sortedPayments = computed<IPayment[]>(() => {
  return [...store.payments].sort((a, b) => `${a.dayId}-${a.createdAt}` > `${b.dayId}-${b.createdAt}` ? -1 : 1)
})

const pieData = computed<PieChartData>(() => {
  const month = store.month
  if (!month) {
    return []
  }
  return Object.keys(month.totals).reduce((carry, categoryId) => {
    const category = globalStore.getCategory(categoryId)
    carry.push({
      label: category.label,
      value: month.totals[categoryId]
    })
    return carry
  }, <PieChartData>[])
})

const canGoNext = computed<boolean>(() => Boolean(store.monthId) && (store.monthId < toMonthId(new Date())))
const canGoBack = computed<boolean>(() => Boolean(store.monthId))

function changeMonth (modifier: 1 | -1) {
  store.loadMonth(modifyMonthId(store.monthId ?? '', modifier))
}
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-4">
      <VgIconBack v-show="canGoBack" @click="changeMonth(-1)" />
      Summary for {{ cleanDate }}
      <VgIconNext v-show="canGoNext" @click="changeMonth(1)" />
    </div>
    <VgPieChart :data="pieData" />
    <div class="payments-container" v-if="sortedPayments.length">
      <PaymentInfo v-for="payment of sortedPayments" :key="payment.id" :payment="payment" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.payments-container {
  padding: 8px 16px;
  background: $white;
  border-radius: 4px;
  max-width: 550px;
  margin: 32px auto 0 auto;
}

.text-title-4 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;

  svg {
    cursor: pointer;
  }
}
</style>
