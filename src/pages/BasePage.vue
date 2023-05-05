<template>
  <TopBar></TopBar>
  <router-view></router-view>
  <FooterBar></FooterBar>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<style lang="scss">

</style>
