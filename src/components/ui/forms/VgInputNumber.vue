<script setup lang="ts">
defineProps<{
  label?: string
  modelValue?: number
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

function emitUpdate (event: InputEvent): void {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value ? parseInt(value) : 0)
}
</script>

<template>
  <div class="vg-input">
    <label>
      <span v-if="label" class="text-caption">{{ label }}</span>
      <input type="number"
             min="0"
             step="1"
             :value="modelValue ?? 0"
             @input="emitUpdate($event as InputEvent)"
      />
    </label>
  </div>
</template>

<style lang="scss">
@import "./VgInput";
</style>
