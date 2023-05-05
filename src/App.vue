<script setup lang="ts">
import { ref } from 'vue'
import { initDB } from '@/services/db.service'
import { useHomeStore } from '@/stores/home.store'

const loaded = ref(false)
const error = ref(false)

async function initApp () {
  try {
    await initDB()
    const store = useHomeStore()
    await store.init()
  } catch (e) {
    console.log(e)
    error.value = true
  } finally {
    loaded.value = true
  }
}
initApp()
</script>

<template>
  <template v-if="loaded">
    <router-view></router-view>
  </template>
  <template v-else>
    Loading...
  </template>
</template>

<style scoped lang="scss">

</style>
