<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  label?: string
  options: { key: string | number, label: string }[]
  modelValue?: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void
}>()

watch(() => props.options, () => {
  emit('update:modelValue', undefined)
})
</script>

<template>
  <div class="vg-input">
    <label>
      <span v-if="label" class="text-caption">{{ label }}</span>
      <select @change="emit('update:modelValue', $event.target.value.length ? $event.target.value : undefined)">
        <option value=""></option>
        <option v-for="{key, label} of options"
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
