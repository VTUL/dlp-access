describe('A single Collection Show page metadata section', () => {
  beforeEach(() => {
    cy.visit('/collection/vb765t25demo');
    cy.get('#content-wrapper')
      .find('div.details-section-content-grid > table')
      .as('metadataSection');
  })

  it('displays the size field and its corresponding value', () => {
    cy.get('@metadataSection')
      .find(':nth-child(1) > th.collection-detail-key')
      .invoke('text')
      .should('equal', 'Size');
    cy.get('@metadataSection')
      .find(':nth-child(1) > td.collection-detail-value')
      .contains('Collections:');
  })

  it('displays not display the identifier field in the collection page', () => {
    cy.contains('Identifier').should('not.exist');;
    cy.get('@metadataSection')
      .find(':nth-child(6) > td.collection-detail-value').click();
    cy.url({ timeout: 2000 }).should('include', '/collection/vb765t25demo');
  })
})