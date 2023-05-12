<script setup lang="ts">
import VgChartBar from '@/components/ui/VgChartBar.vue'
import { useGlobalStore } from '@/stores/global.store'
import { computed, onMounted } from 'vue'
import type { IMonth } from '@/models/month.interface'
import { toMonthLabel } from '@/helpers/date.helper'
import { toCurrency } from '@/helpers/number.helper'
import { useHomeStore } from '@/stores/home.store'
import VgChartPie from '@/components/ui/VgChartPie.vue'
import { PaymentType } from '@/models/payment.interface'
import VgCard from '@/components/ui/VgCard.vue'
import type { BarChartData, PieChartData } from '@/helpers/chart.helper'
import VgButton from "@/components/ui/VgButton.vue";
import { usePopupStore } from "@/stores/popup.store";
import NewPaymentView from "@/views/NewPaymentView.vue";

const globalStore = useGlobalStore()
const store = useHomeStore()
const popup = usePopupStore()

const barData = computed<BarChartData>(() => store.lastMonths.map((data: IMonth) => ({
  up: data.income,
  down: data.outcome,
  label: toMonthLabel(data.monthId)
})))

const pieData = computed<PieChartData>(() => {
  return Object.keys(store.currentMonth.totals).reduce((carry, categoryId) => {
    const category = globalStore.getCategory(categoryId)
    if (category && category.type === PaymentType.out) {
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

const spent = computed<string>(() => toCurrency(pieData.value.reduce((carry, data) => carry + data.value, 0)))

onMounted(() => {
  store.init()
})
</script>

<template>
  <div class="page-wrapper" :class="{single: !pieData.length}">
    <VgCard>
      <div class="home-summary savings">
        <div class="label">My Savings ✌️</div>
        <div class="value">{{ savings }}</div>
      </div>
      <VgChartBar :data="barData"/>
    </VgCard>
    <VgCard v-if="pieData.length">
      <div class="home-summary outcomes">
        <div class="label">This month</div>
        <div class="value">{{ spent }}</div>
      </div>
      <VgChartPie :data="pieData" position="bottom"/>
    </VgCard>
  </div>
  <div class="cta-container">
    <VgButton @click="popup.openPopup(NewPaymentView)">Add payment</VgButton>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";
@import "src/styles/breakpoints";

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

.cta-container {
  display: none;
  align-items: center;
  justify-content: center;
  max-width: $breakpoint-xs;
  margin: 0 auto;
}

@media screen and (min-width: $breakpoint-s) {
  .page-wrapper {
    display: grid;
    gap: 40px;
    max-width: $breakpoint-l;
    margin: 0 auto;
    justify-content: center;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);

    &.single {
      grid-template-columns: minmax(0, $breakpoint-s);
    }
  }

  .vg-card + .vg-card {
    margin-top: 0;
  }

  .cta-container {
    display: flex;
  }
}

</style>
