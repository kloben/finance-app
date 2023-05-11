<script lang="ts" setup>
export interface VgButtonProps {
  type?: 'button' | 'submit' // Defaults button
  mode?: 'light' | 'dark'  // Defaults light
  disabled?: boolean
}

defineProps<VgButtonProps>()

</script>

<template>
  <button class="vg-button"
          :class="mode ?? 'light'"
          :disabled="disabled"
          :type="type ?? 'button'"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

button.vg-button {
  appearance: none;
  padding: 16px;
  border-radius: 44px;
  text-align: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  border: none;
  outline: none;
  display: block;
  width: 100%;
  user-select: none;

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }

  &.light {
    background: $primary;
    color: $white;
  }

  &.dark {
    background: $white;
    color: $primary;
  }
}
</style>
