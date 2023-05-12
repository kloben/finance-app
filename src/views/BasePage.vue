<script setup lang="ts">
import TabBar from '@/components/TabBar.vue'
import VgPopup from '@/components/ui/VgPopup.vue'
import { usePopupStore } from '@/stores/popup.store'

const store = usePopupStore()
</script>

<template>
  <div class="base-container">
    <router-view></router-view>
    <TabBar />
  </div>
  <VgPopup v-if="store.component">
    <component :is="store.component()" />
  </VgPopup>
</template>

<style lang="scss">
@import "src/styles/breakpoints";

.base-container {
  padding-bottom: 100px;
}

@media screen and (min-width: $breakpoint-s) {
  .base-container {
    padding-bottom: 0;
  }
}
</style>
