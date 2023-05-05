<script setup lang="ts">
import { ref } from 'vue'
import { initDB } from '@/services/db.service'

const loaded = ref(false)
const error = ref(false)

initDB()
  .then(() => {
    loaded.value = true
  })
  .catch((e) => {
    console.log(e)
    error.value = true
    loaded.value = true
  })
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
