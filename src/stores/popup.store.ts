import { defineStore } from 'pinia'
import type { Component } from 'vue'

interface StoreState {
  component?: () => Component | undefined
}

export const usePopupStore = defineStore('popup', {
  state: (): StoreState => ({
    component: undefined
  }),
  actions: {
    openPopup (component: Component) {
      this.component = () => component
    },
    closePopup () {
      this.component = undefined
    }
  }
})

