<script setup lang="ts">

defineProps<{
  label?: string
  values: string[]
  modelValue?: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="vg-input">
    <label>
      <span v-if="label" class="text-caption">{{ label }}</span>
      <div class="switch-container">
        <div class="vg-button"
             v-for="(value, index) of values"
             :key="index"
             :class="{disabled: value !== modelValue}"
             @click="emit('update:modelValue', value)"
        >{{ value }}
        </div>
      </div>
    </label>
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
