<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  values: {
    positive: number
    negative: number
    label: string
  }[]
}>()

const parsed = computed(() => {
  const positiveMax = Math.max(...props.values.map(v => v.positive))
  const negativeMax = Math.max(...props.values.map(v => v.negative))
  return props.values.map((value) => ({
    positive: Math.round(value.positive * 100 / positiveMax),
    negative: Math.round(value.negative * 100 / negativeMax),
    label: value.label
  }))
})
</script>

<template>
  <div class="bar-chart">
    <div class="column" v-for="(value, index) of parsed" :key="index">
      <div class="bar-container positive">
        <div class="bar" :style="{height: value.positive + '%'}"></div>
      </div>
      <div class="bar-container negative">
        <div class="bar" :style="{height: value.negative + '%'}"></div>
      </div>
      <div class="label">{{ value.label }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.bar-chart {
  display: flex;
  justify-content: center;
  aspect-ratio: 16/9;
  padding: 16px;
  width: 100%;
  max-height: 40vh;
}

.column {
  flex: 0 1 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
