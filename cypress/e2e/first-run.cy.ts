describe('First Run Test', () => {
  beforeEach(() => {
    cy.resetApp()
  })
  it('redirects to init', () => {
    cy.visit('/')

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/welcome')
    })
  })

  it('completes form and redirects', () => {
    cy.visit('/')

    cy.get('.vg-button').should('have.attr', 'disabled')
    cy.get('input').type('15000')
    cy.get('.vg-button').should('not.have.attr', 'disabled')
    cy.get('.vg-button').click()

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/')
    })

    cy.get('.home-summary.savings .value').invoke('text').should('contain', '15.000')
  })
})
