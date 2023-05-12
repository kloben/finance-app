describe('Create Payment Test', () => {
  beforeEach(() => {
    cy.viewport(400, 654)
    cy.resetApp()
    cy.initApp()
  })

  it('creates new outcome', () => {
    cy.visit('/')
    cy.get('.home-summary.savings .value').invoke('text').should('contain', '15.000')
    cy.get('.floating-item').click()

    cy.get('.vg-input input[placeholder*="Amount"]').type('123')
    cy.get('.vg-input select').select(1)
    cy.get('.vg-input input[placeholder*="Add description"]').type('Some description')

    cy.get('.vg-button').contains('Add Payment').click()

    cy.get('.home-summary.savings .value').invoke('text').should('contain', '14.877')
  })

  it.only('creates new income', () => {
    cy.visit('/')
    cy.get('.home-summary.savings .value').invoke('text').should('contain', '15.000')
    cy.get('.floating-item').click()

    cy.get('.vg-switch').contains('income', { matchCase: false }).click()
    cy.get('.vg-input input[placeholder*="Amount"]').type('321')
    cy.get('.vg-input select').select(1)
    cy.get('.vg-input input[placeholder*="Add description"]').type('Some description')

    cy.get('.vg-button').contains('Add Payment').click()

    cy.get('.home-summary.savings .value').invoke('text').should('contain', '15.321')
  })
})
