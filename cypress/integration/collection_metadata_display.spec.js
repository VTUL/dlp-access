describe('A single Collection Show page metadata section', () => {
  beforeEach(() => {
    cy.visit('/collection/vb765t25');
    cy.get('#content-wrapper')
      .find('div.details-section-content-grid')
      .as('metadataSection')
  })

  it('displays the size field and its corresponding value', () => {
    cy.get('@metadataSection')
      .find(':nth-child(1) > div.collection-detail-key')
      .invoke('text')
      .should('equal', 'Size')
    cy.get('@metadataSection')
      .find(':nth-child(1) > div.collection-detail-value')
      .contains('Collections:')
  })

  it('displays the identifier field and its corresponding value', () => {
    cy.get('@metadataSection')
      .find(':nth-child(7) > div.collection-detail-key')
      .invoke('text')
      .should('equal', 'Identifier')
    cy.get('@metadataSection')
      .find(':nth-child(7) > div.collection-detail-value').click()
    cy.url().should('include', '/collection/vb765t25')
  })
})