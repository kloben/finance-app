describe('First Run Test', () => {
  beforeEach(() => {
    cy.resetApp()
  })
  it('redirects to init', () => {
    cy.visit('/')

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/init')
    })
  })

  it('completes form and redirects', () => {
    cy.visit('/')

    cy.get('.vg-button').should('have.class', 'disabled')
    cy.get('input').type('15000')
    cy.get('.vg-button').should('not.have.class', 'disabled')
    cy.get('.vg-button').click()

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/')
    })

    cy.get('.text-title-4').invoke('text').should('contain', 'Total savings: €15,000')
  })
})
