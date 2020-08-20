describe('A single Collection Show page metadata section', () => {
  beforeEach(() => {
    cy.visit('/collection/vb765t25');
    cy.get('#content-wrapper')
      .find('div.details-section-content-grid > table')
      .as('metadataSection')
  })

  it('displays the size field and its corresponding value', () => {
    cy.get('@metadataSection')
      .find(':nth-child(2) > th.collection-detail-key')
      .invoke('text')
      .should('equal', 'Size')
    cy.get('@metadataSection')
      .find(':nth-child(2) > td.collection-detail-value')
      .contains('Collections:')
  })

  it('displays the identifier field and its corresponding value', () => {
    cy.get('@metadataSection')
      .find(':nth-child(8) > th.collection-detail-key')
      .invoke('text')
      .should('equal', 'Identifier')
    cy.get('@metadataSection')
      .find(':nth-child(8) > td.collection-detail-value').click()
    cy.url().should('include', '/collection/vb765t25')
  })
})