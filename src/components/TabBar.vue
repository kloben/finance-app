<script setup lang="ts">
import VgIconHome from '@/components/ui/icons/VgIconHome.vue'
import VgIconStatus from '@/components/ui/icons/VgIconStatus.vue'
import VgIconFuture from '@/components/ui/icons/VgIconFuture.vue'
import VgIconSettings from '@/components/ui/icons/VgIconSettings.vue'
import VgIconAdd from '@/components/ui/icons/VgIconAdd.vue'
import { computed } from 'vue'
import { RouteRecordName, useRoute } from 'vue-router'
import { usePopupStore } from '@/stores/popup.store'
import NewPaymentView from '@/views/NewPaymentView.vue'
import { AppRoute } from "@/routes";

const route = useRoute()
const popup = usePopupStore()

const current = computed<RouteRecordName>(() => route.name ?? '')

function openPaymentPopup () {
  popup.openPopup(NewPaymentView)
}

function isActive (route: AppRoute): boolean {
  return current.value === route
}
</script>

<template>
  <div class="tab-bar-container">
    <router-link to="/">
      <div class="bar-item" :class="{active: isActive(AppRoute.home)}">
        <VgIconHome :active="isActive(AppRoute.home)"/>
        <div class="bar-label">Home</div>
      </div>
    </router-link>
    <router-link to="/status">
      <div class="bar-item" :class="{active: isActive(AppRoute.status)}">
        <VgIconStatus :active="isActive(AppRoute.status)"/>
        <div class="bar-label">Status</div>
      </div>
    </router-link>
    <div class="floating-item" @click="openPaymentPopup()">
      <VgIconAdd/>
    </div>
    <router-link to="/future">
      <div class="bar-item" :class="{active: isActive(AppRoute.future)}">
        <VgIconFuture :active="isActive(AppRoute.future)"/>
        <div class="bar-label">Future</div>
      </div>
    </router-link>
    <div class="bar-item" :class="{active: isActive(AppRoute.settings)}">
      <VgIconSettings :active="isActive(AppRoute.settings)"/>
      <div class="bar-label">Settings</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

$big: 41px;
$small: 33px;
$offset: 26px;

.tab-bar-container {
  width: 100%;
  height: 82px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
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

a {
  flex: 0 1 56px;
}

.bar-item {
  text-align: center;
  padding: 3px 6px 0 6px;
  color: $grey;
  overflow: hidden;
  cursor: pointer;

  &.active {
    color: $primary;
  }
}

.bar-label {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  padding-top: 6px;
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

</style>
