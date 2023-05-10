<script setup lang="ts">
import VgIconClose from '@/components/ui/icons/VgIconClose.vue'
import { usePopupStore } from '@/stores/popup.store'

const store = usePopupStore()

</script>

<template>
<div class="popup-container">
  <div class="popup-background" @click="store.closePopup()"></div>
  <div class="popup">
    <div class="popup-header">
      <VgIconClose @click="store.closePopup()" />
    </div>
    <div class="popup-body">
      <slot />
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.popup-container {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
}

.popup-background, .popup {
  grid-row: 1;
  grid-column: 1;
}

.popup-background {
  background: $black;
  opacity: 0.7;
  width: 100%;
  height: 100%;
}

.popup {
  background: $white;
  border-radius: 16px;
  z-index: 10;
  width: calc(100% - 32px);
  max-width: 500px;
}

.popup-header {
  padding: 16px 16px 0 16px;
  text-align: end;

  svg {
    cursor: pointer;
  }
}

.popup-body {
  padding: 0 32px 48px 32px;
}
</style>
