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

watch(() => props.options, () => {
  emit('update:modelValue', '')
})
</script>

<template>
  <div class="vg-input">
    <label>
      <span v-if="label" class="text-caption">{{ label }}</span>
      <select @change="emit('update:modelValue', $event.target.value ?? '')">
        <option value=""></option>
        <option v-for="(label, key) in options"
                :key="key"
                :value="key"
                :selected="modelValue === key"
        >{{ label }}
        </option>
      </select>
    </label>
  </div>
</template>

<style scoped lang="scss">
@import "./VgInput";
</style>
