<script setup lang="ts">
defineProps<{
  label?: string
  options: string[]
  modelValue?: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function emitUpdate (event: InputEvent): void {
  emit('update:modelValue', (event.target as HTMLInputElement).value ?? '')
}
</script>

<template>
  <div class="vg-input">
    <label>
      <span v-if="label" class="text-caption">{{ label }}</span>
      <select @input="emitUpdate($event as InputEvent)">
        <option value="">Select</option>
        <option v-for="(option, index) of options" :value="option" :key="index">{{ option }}</option>
      </select>
    </label>
  </div>
</template>

<style scoped lang="scss">
@import "./VgInput";
</style>
