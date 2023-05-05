<script setup lang="ts">

defineProps<{
  options: Record<string, string>
  modelValue?: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="vg-input">
    <div class="switch-container">
      <div class="vg-button"
           v-for="(label, key) in options"
           :key="key"
           :class="{disabled: key !== modelValue}"
           @click="emit('update:modelValue', key)"
      >{{ label }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../VgButton.scss";
@import "src/styles/colors";

.switch-container {
  display: flex;
  justify-content: center;

  .vg-button {
    &.disabled {
      pointer-events: all;
    }

    &:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}

</style>
