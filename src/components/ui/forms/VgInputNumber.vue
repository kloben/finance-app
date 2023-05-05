<script setup lang="ts">
defineProps<{
  label?: string
  modelValue?: number
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>

<template>
  <div class="vg-input">
    <label>
      <span v-if="label" class="text-caption">{{ label }}</span>
      <input type="number"
             min="0"
             step="1"
             :value="modelValue ?? 0"
             @input="emit('update:modelValue', $event.target.value ? Number($event.target.value) : 0)"
      />
    </label>
  </div>
</template>

<style lang="scss">
@import "./VgInput";
</style>
