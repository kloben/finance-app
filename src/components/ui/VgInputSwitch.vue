<script setup lang="ts">
import { AppColor } from '@/styles/colors'

const props = defineProps<{
  options: { label: string, value: string, color?: string }[]
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function tryClick (key: string) {
  if (key !== props.modelValue) {
    emit('update:modelValue', key)
  }
}
</script>

<template>
  <div class="vg-input">
    <div class="switch-option"
         v-for="(option, index) in options"
         :key="index"
         :class="{disabled: option.value !== modelValue}"
         :style="{background: option.value === modelValue ? (option.color ?? AppColor.primary) : AppColor.lightGrey }"
         @click="tryClick(option.value)"
    >{{ option.label }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.vg-input {
  display: flex;
  justify-content: center;
  gap: 24px;

  .switch-option {
    flex: 1;
    padding: 8px;
    text-transform: uppercase;
    border-radius: 26px;
    text-align: center;
    color: $white;
    cursor: pointer;
    font-weight: 500;
    font-size: 12px;
    line-height: 22px;

    &.disabled {
      color: $darkGrey;
    }
  }
}
</style>
