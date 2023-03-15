describe('collection_metadata_display: A single Collection Show page metadata section', () => {
  beforeEach(() => {
    cy.visit('/collection/vb765t25demo').wait(1000);
    cy.get('#content-wrapper', {timeout: 5000})
      .find('div.details-section-content-grid > table', {timeout: 5000})
      .as('metadataSection');
  })

  it('displays the size field and its corresponding value', () => {
    cy.contains('Collections: 4').should('be.visible');
    cy.contains('Items: 54').should('be.visible');
  })

  it('displays the identifier field and its corresponding value', () => {
    cy.contains('Ms1988_017_Pfeiffer_demo').should('be.visible')
    cy.contains('Ms1988_017_Pfeiffer_demo').click();
    cy.url({ timeout: 2000 }).should('include', '/collection/vb765t25demo');
  })
})