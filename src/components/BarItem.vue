<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  label: string
  route: string
  current: string
  theme?: 'light' | 'dark' // Defaults light
}>()

const classes = computed<string[]>(() => [props.theme ?? 'light', props.route === props.current ? 'active' : ''])
</script>

<template>
  <router-link :to="{name: route}">
    <div class="bar-item" :class="classes">
      <slot/>
      <div class="bar-label">{{ label }}</div>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.bar-item {
  text-align: center;
  padding: 3px 6px 0 6px;
  overflow: hidden;
  cursor: pointer;

  &.light {
    color: $grey;
    --icon-fill: #{$grey};

    &.active {
      color: $primary;
      --icon-fill: #{$primary};
    }
  }

  &.dark {
    opacity: 0.7;
    color: $light-grey;
    --icon-fill: #{$light-grey};

    &.active {
      opacity: 1;
    }
  }
}

.bar-label {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  padding-top: 6px;
}
</style>