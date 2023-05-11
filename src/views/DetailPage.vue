<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useDetailStore } from '@/stores/detail.store'
import { modifyMonthId, toMonthId, toMonthLabel } from '@/helpers/date.helper'
import PaymentInfo from '@/components/PaymentInfo.vue'
import type { IPayment } from '@/models/payment.interface'
import VgPieChart from '@/components/ui/VgPieChart.vue'
import { useGlobalStore } from '@/stores/global.store'
import VgIconBack from '@/components/ui/icons/VgIconBack.vue'
import VgIconNext from '@/components/ui/icons/VgIconNext.vue'
import type { PieChartData } from '@/helpers/chart.helper'

const store = useDetailStore()
const globalStore = useGlobalStore()

const cleanDate = computed<string>(() => store.monthId ? toMonthLabel(store.monthId) : '')

const sortedPayments = computed<IPayment[]>(() => {
  return [...store.payments].sort((a, b) => `${a.dayId}-${a.createdAt}` > `${b.dayId}-${b.createdAt}` ? -1 : 1)
})

const pieData = computed<PieChartData>(() => {
  const month = store.month
  if (!month) {
    return []
  }
  return Object.keys(month.totals).reduce((carry, categoryId) => {
    carry.push({
      label: globalStore.getCategory(categoryId)?.label ?? 'Other',
      value: month.totals[categoryId]
    })
    return carry
  }, <PieChartData>[])
})

const canGoNext = computed<boolean>(() => !!store.monthId && (store.monthId < toMonthId(new Date())))
const canGoBack = computed<boolean>(() => !!store.monthId)

function changeMonth (modifier: 1 | -1) {
  store.loadMonth(modifyMonthId(store.monthId ?? '', modifier))
}

onMounted(() => {
  store.loadMonth(toMonthId(new Date()))
})
</script>

<template>
  <div class="page-header">
    <div class="selector">
      <VgIconBack v-show="canGoBack" @click="changeMonth(-1)" />
      {{ cleanDate }}
      <VgIconNext v-show="canGoNext" @click="changeMonth(1)" />
    </div>
    <VgPieChart :data="pieData" position="bottom"/>
  </div>

  <div class="payments" v-if="sortedPayments.length">
    <PaymentInfo v-for="payment of sortedPayments" :key="payment.id" :payment="payment" />
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.page-header {
  background: $white;
  padding: 24px 28px;
  .selector {
    display: grid;
    align-items: center;
    text-align: center;
    grid-template-columns: 32px 1fr 32px;
    max-width: 350px;
    margin: 0 auto;
    padding-bottom: 16px;

    svg {
      cursor: pointer;
    }
  }
}

.payments {
  padding-top: 12px;
}
</style>
