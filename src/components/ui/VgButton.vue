<template>
  <div class="vg-button" :class="[type, size]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  type?: 'clear'
  size?: 'big' | 'small'
}>()
</script>

<style scoped lang="scss">
@import "src/styles/colors";

.vg-button {
  padding: 12px 16px;
  background: $primary;
  color: $base;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: darken($primary, 10);
  }
}
</style>
