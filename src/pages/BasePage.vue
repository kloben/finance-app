<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import TabBar from '@/components/TabBar.vue'
</script>

<template>
  <div class="base-container">
    <TopBar></TopBar>
    <router-view></router-view>
    <TabBar></TabBar>
  </div>
</template>

<style lang="scss">
.base-container {
  padding-bottom: 60px;
}
</style>
