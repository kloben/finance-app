<script lang="ts" setup>
defineProps<{
  type?: 'button' | 'submit' // Defaults button
  mode?: 'light' | 'dark'  // Defaults light
  disabled?: boolean
}>()

</script>

<template>
  <button class="vg-button"
          :class="mode ?? 'light'"
          :disabled="disabled" :type="type"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
@import "./VgButton.scss";
</style>
