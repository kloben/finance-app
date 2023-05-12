import { defineStore } from 'pinia'
import type { Component } from 'vue'

type GetComponentFn = () => any // This should be ComponentDefinition. There is no types

interface StoreState {
  component?: GetComponentFn | undefined
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

