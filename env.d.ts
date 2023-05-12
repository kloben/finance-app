/// <reference types="vite/client" />

declare global {
  interface Window {
    randomPayment: () => void
  }
}
