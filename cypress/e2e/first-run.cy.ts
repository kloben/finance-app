describe('First Run Test', () => {
  it('redirects to init', () => {
    cy.visit('/')

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/init')
    })
  })

  it('disables input until value', () => {
    cy.visit('/')
    cy.get('.vg-button').should('have.class', 'disabled')

    cy.get('input').type('15000')

    cy.get('.vg-button').should('not.have.class', 'disabled')
  })

  it('redirects on form submit', () => {
    cy.visit('/')

    cy.get('input').type('15000')
    cy.get('.vg-button').click()

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/')
    })
  })

  it('persists value', () => {
    cy.visit('/')

    cy.get('input').type('15000')
    cy.get('.vg-button').click()

    cy.get('.text-title-4').invoke('text').should('contain', 'Total savings: €15,000')

    cy.reload()
    cy.get('.text-title-4').invoke('text').should('contain', 'Total savings: €15,000')
  })
})
