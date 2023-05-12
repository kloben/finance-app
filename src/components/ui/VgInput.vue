<script setup lang="ts">
export interface VgInputProps {
  label?: string
  modelValue?: string
  mode?: 'light' | 'dark'  // Defaults light
}
defineProps<VgInputProps>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="vg-input" :class="mode ?? 'light'">
    <input type="text"
           :placeholder="label ?? ''"
           :value="modelValue ?? ''"
           @input="emit('update:modelValue', $event.target.value ?? '')"
    />
  </div>
</template>

<style scoped lang="scss">
@import "./VgInput";
</style>
