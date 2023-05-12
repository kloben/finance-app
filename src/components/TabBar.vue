<script setup lang="ts">
import VgIconHome from '@/components/ui/icons/VgIconHome.vue'
import VgIconStatus from '@/components/ui/icons/VgIconStatus.vue'
import VgIconFuture from '@/components/ui/icons/VgIconFuture.vue'
import VgIconSettings from '@/components/ui/icons/VgIconSettings.vue'
import VgIconAdd from '@/components/ui/icons/VgIconAdd.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePopupStore } from '@/stores/popup.store'
import NewPaymentView from '@/views/NewPaymentView.vue'
import { AppRoute } from "@/routes";
import BarItem from "@/components/BarItem.vue";

const route = useRoute()
const popup = usePopupStore()

const currentRoute = computed<string>(() => route.name as string ?? '')

function openPaymentPopup () {
  popup.openPopup(NewPaymentView)
}
</script>

<template>
  <div class="tab-bar-container">
    <BarItem :current="currentRoute" :route="AppRoute.home" label="Home">
      <VgIconHome/>
    </BarItem>
    <BarItem :current="currentRoute" :route="AppRoute.status" label="Status">
      <VgIconStatus/>
    </BarItem>
    <div class="floating-item" @click="openPaymentPopup()">
      <VgIconAdd/>
    </div>
    <BarItem :current="currentRoute" :route="AppRoute.future" label="Future">
      <VgIconFuture/>
    </BarItem>
    <BarItem :current="currentRoute" :route="AppRoute.settings" label="Settings">
      <VgIconSettings/>
    </BarItem>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";
@import "src/styles/breakpoints";

$big: 41px;
$small: 33px;
$offset: 26px;

.tab-bar-container {
  position: sticky;
  width: 100%;
  height: 82px;
  bottom: 0;
  left: 0;
  margin-top: 26px;
  display: grid;
  grid-template-columns: 56px 56px auto 56px 56px;
  align-items: center;
  justify-content: center;
  gap: 16px;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1));
  background: radial-gradient(
                  circle at 50% calc($big / 2 * -1),
                  transparent #{$big},
                  #fff calc(#{$big} + 1px)
  ) 0 calc($big / 2) / 100% calc(100% - #{$big} / 2) no-repeat no-repeat,
  radial-gradient(
                  circle at calc(50% - #{$big} - #{$offset}) #{$small},
                  #fff #{$small},
                  transparent calc(#{$small} + 1px)
  ) 0 0 / 100% 100% no-repeat no-repeat,
  radial-gradient(
                  circle at calc(50% + #{$big} + #{$offset}) #{$small},
                  #fff #{$small},
                  transparent calc(#{$small} + 1px)
  ) 0 0 / 100% 100% no-repeat no-repeat,
  linear-gradient(
                  90deg,
                  #fff calc(50% - #{$big} - #{$offset}),
                  transparent calc(50% - #{$big} - #{$offset} + 1px),
                  transparent calc(50% + #{$big} + #{$offset} - 1px),
                  #fff calc(50% + #{$big} + #{$offset})
  ) 0 0 / 100% 100% no-repeat no-repeat;
}

.floating-item {
  position: relative;
  top: -40px;
  padding: 16px;
  border-radius: 50%;
  background: linear-gradient(315deg, $primary 0%, $primary-gradient 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

@media screen and (min-width: $breakpoint-s) {
  .tab-bar-container {
    display: none;
  }
}
</style>
