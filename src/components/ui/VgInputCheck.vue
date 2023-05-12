<script setup lang="ts">
defineProps<{
  label: string
  modelValue?: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <div class="vg-input">
    <div class="text-body-2">{{ label }}</div>
    <div class="check-container"
         :class="{active: modelValue}"
         @click="emit('update:modelValue', !modelValue)"
    >
      <div class="handle"></div>
      <div class="spacer"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

$animation: 0.1s;

.vg-input {
  display: flex;
  align-items: center;
  justify-content: end;
}

.text-body-2 {
  user-select: none;
  flex: 1;
}

.check-container {
  display: flex;
  align-items: center;
  justify-content: end;
  width: 56px;
  height: 32px;
  border-radius: 30px;
  background: $secondary;
  padding: 4px;
  cursor: pointer;
  transition: background $animation linear;
  margin: 4px 0;

  &.active {
    background: $primary;

    .spacer {
      flex: 0;
    }
  }
}

.handle {
  border-radius: 50%;
  background: $white;
  height: 100%;
  aspect-ratio: 1;
}

.spacer {
  flex: 1;
  transition: flex $animation linear;
}
</style>
