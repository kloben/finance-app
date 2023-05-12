<script setup lang="ts">
defineProps<{
  label: string
  route: string
  current: string
}>()
</script>

<template>
  <router-link :to="{name: route}">
    <div class="bar-item" :class="{active: route === current}">
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
  color: $grey;
  --icon-fill: #{$grey};

  &.active {
    color: $primary;
    --icon-fill: #{$primary};
  }
}

.bar-label {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  padding-top: 6px;
}
</style>