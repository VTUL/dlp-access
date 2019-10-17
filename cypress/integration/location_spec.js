/// <reference types="Cypress" />

context('Location', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('cy.hash() - get the current URL hash', () => {
    // https://on.cypress.io/hash
    cy.hash().should('be.empty')
  })

  it('cy.url() - get the current URL', () => {
    // https://on.cypress.io/url
    cy.url().should('eq', 'http://localhost:3000/')
  })
})
