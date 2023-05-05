/// <reference types="cypress" />

Cypress.Commands.add('initApp', (amount: number = 15000) => {
  window.localStorage.setItem('finance-db-savings', amount.toString())
})

Cypress.Commands.add('resetApp', () => {
  window.localStorage.removeItem('finance-db-savings')
  window.indexedDB.deleteDatabase('FinanceDB')
})

declare global {
  namespace Cypress {
    interface Chainable {
      initApp(amount?: number): Chainable<void>,
      resetApp(): Chainable<void>
    }
  }
}

export {}
