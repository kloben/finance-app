describe('Create Payment Test', () => {
  beforeEach(() => {
    cy.resetApp()
    cy.initApp()
  })

  it('redirects to payment', () => {
    cy.visit('/')

    cy.get('.footer-bar').find('[data-test-id="new-link"]').click()

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/new')
    })
  })

  it('creates new outcome', () => {
    cy.visit('/new')

    cy.get('.vg-input').contains('Amount').type('123')
    cy.get('.vg-input').contains('Category').get('select').select(1)
    cy.get('.vg-input').contains('Description').type('Some description')

    cy.get('.vg-button').contains('Create').click()

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/')
    })
  })

  it('creates new income', () => {
    cy.visit('/new')

    cy.get('.vg-button').contains('income', { matchCase: false }).click()
    cy.get('.vg-input').contains('amount', { matchCase: false }).type('321')
    cy.get('.vg-input').contains('category', { matchCase: false }).get('select').select(1)
    cy.get('.vg-input').contains('description', { matchCase: false }).type('Another description')

    cy.get('.vg-button').contains('create', { matchCase: false }).click()

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/')
    })
  })
})
