<template>
  <div class="vg-button"
       :class="[type, size, disabled ? 'disabled': '']"
  >
    <div class="text-button">
      <slot />
    </div>
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
@import "./VgButton.scss";
</style>
