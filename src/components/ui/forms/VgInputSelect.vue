<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  label?: string
  options: Record<string, string>
  modelValue?: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function emitUpdate (event: InputEvent): void {
  emit('update:modelValue', (event.target as HTMLInputElement).value ?? '')
}

watch(() => props.options, () => {
  emit('update:modelValue', '')
})
</script>

<template>
  <div class="vg-input">
    <label>
      <span v-if="label" class="text-caption">{{ label }}</span>
      <select @input="emitUpdate($event as InputEvent)">
        <option value=""></option>
        <option v-for="(label, key) in options" :value="key" :key="key">{{ label }}</option>
      </select>
    </label>
  </div>
</template>

<style scoped lang="scss">
@import "./VgInput";
</style>
