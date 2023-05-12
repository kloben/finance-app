<script setup lang="ts">
import TabBar from '@/components/TabBar.vue'
import VgPopup from '@/components/ui/VgPopup.vue'
import { usePopupStore } from '@/stores/popup.store'

const store = usePopupStore()
</script>

<template>
  <router-view></router-view>
  <TabBar />
  <VgPopup v-if="store.component">
    <component :is="store.component()" />
  </VgPopup>
</template>
