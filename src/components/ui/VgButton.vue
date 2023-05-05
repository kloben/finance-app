<template>
  <div class="vg-button"
       :class="[type, size, disabled ? 'disabled': '']"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  type?: 'clear'
  size?: 'big' | 'small'
  disabled?: boolean
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
  user-select: none;

  &.disabled {
    background: $secondary;
    pointer-events: none;
  }
}
</style>
