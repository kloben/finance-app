<script setup lang="ts">
import { computed } from 'vue'

interface DisplayData {
  values: {
    label: string
    up: number
    down: number
    predicted?: boolean
  }[]
  gridPoints: number[]
}

const props = defineProps<{
  values: {
    label: string
    positive: number
    negative: number
    predicted?: boolean
  }[]
}>()

const displayData = computed((): DisplayData => {
  let max = Math.max(...props.values.map(v => Math.max(v.positive, v.negative)))
  max = Math.round(max * 1.10)
  return {
    values: props.values.map((value) => ({
      label: value.label,
      up: Math.round(value.positive * 100 / max),
      down: Math.round(value.negative * 100 / max),
      predicted: value.predicted ?? false
    })),
    gridPoints: max === 0 ? [0] : [max, Math.round(max / 2), 0, -Math.round(max / 2), max]
  }
})

const emptyChart = computed((): boolean => {
  return displayData.value.gridPoints.length === 1
})
</script>

<template>
  <div class="chart-container">
    <div class="chart-lines" :class="{empty: emptyChart}">
      <div class="line" v-for="(_, index) of displayData.gridPoints" :key="index"></div>
    </div>
    <div class="chart-bars">
      <div class="column" v-for="(value, index) of displayData.values" :key="index"
           :class="{predicted: value.predicted}"
      >
        <div class="bar-container positive">
          <div class="bar" :style="{height: value.up + '%'}"></div>
        </div>
        <div class="bar-container negative">
          <div class="bar" :style="{height: value.down + '%'}"></div>
        </div>
      </div>
    </div>
    <div class="chart-x-axis">
      <div class="text-body-2" v-for="(value, index) of displayData.values" :key="index">{{ value.label }}</div>
    </div>
    <div class="chart-y-axis" :class="{empty: emptyChart}">
      <div class="text-caption" v-for="(point, index) of displayData.gridPoints" :key="index">{{ point }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.chart-container {
  background: $white;
  margin: 0 auto;
  padding: 16px;
  aspect-ratio: 16/9;
  max-width: 100%;
  max-height: 40vh;
  display: grid;
  grid-template-areas: "label-y bars" "empty label-x";
  grid-template-rows: 1fr auto;
  grid-template-columns: auto 1fr;
  border-radius: 4px;
}

.chart-bars {
  display: flex;
  justify-content: center;
  grid-area: bars;
}

.chart-lines {
  grid-area: bars;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 12px;

  &.empty {
    justify-content: space-around;
  }

  .line {
    border-bottom: 1px solid $secondary;
  }
}

.chart-y-axis {
  grid-area: label-y;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.empty {
    justify-content: space-around;
  }

  .text-caption {
    text-align: end;
    flex: 0 1 1px;
    display: flex;
    align-items: center;
    justify-content: end;
  }
}

.chart-x-axis {
  grid-area: label-x;
  display: flex;
  padding-top: 8px;

  .text-body-2 {
    flex: 1;
    text-align: center;
  }
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;

  &.predicted {
    .bar {
      opacity: 0.4;
    }
  }
}

.bar-container {
  flex: 1;
  display: flex;

  .bar {
    width: 25px;
  }

  &.positive {
    align-items: flex-end;

    .bar {
      background: $chart-positive;
    }
  }

  &.negative {
    align-items: flex-start;

    .bar {
      background: $chart-negative;
    }
  }
}

.label {
  padding: 8px 0;
}

</style>
