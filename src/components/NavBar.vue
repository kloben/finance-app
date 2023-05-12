<script setup lang="ts">
import VgAppLogo from '@/components/ui/icons/VgAppLogo.vue'
import { AppRoute } from "@/routes";
import { computed } from "vue";
import { useRoute } from "vue-router";
import VgIconStatus from "@/components/ui/icons/VgIconStatus.vue";
import BarItem from "@/components/BarItem.vue";
import VgIconFuture from "@/components/ui/icons/VgIconFuture.vue";
import VgIconSettings from "@/components/ui/icons/VgIconSettings.vue";

const route = useRoute()

const currentRoute = computed<string>(() => route.name as string ?? '')


</script>

<template>
  <div class="bar-background">
    <div class="bar-container">
      <router-link :to="{name: AppRoute.home}">
        <VgAppLogo/>
      </router-link>
      <div class="navigation" v-if="currentRoute !== AppRoute.welcome">
        <BarItem :current="currentRoute" :route="AppRoute.status" label="Status" theme="dark">
          <VgIconStatus/>
        </BarItem>
        <BarItem :current="currentRoute" :route="AppRoute.future" label="Future" theme="dark">
          <VgIconFuture/>
        </BarItem>
        <BarItem :current="currentRoute" :route="AppRoute.settings" label="Settings" theme="dark">
          <VgIconSettings/>
        </BarItem>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";
@import "src/styles/breakpoints";

.bar-container {
  background: $primary;
  color: $white;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navigation {
  display: none;
  gap: 40px;
}

@media screen and (min-width: $breakpoint-s) {
  .bar-container {
    justify-content: space-between;
  }

  .navigation {
    display: flex;
  }
}
</style>
