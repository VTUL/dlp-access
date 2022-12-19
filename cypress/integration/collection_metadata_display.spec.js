describe('collection_metadata_display: A single Collection Show page metadata section', () => {
  beforeEach(() => {
    cy.visit('/collection/vb765t25demo').wait(1000);
  })

  it('displays the size field and its corresponding value', () => {
    cy.get('div#collections-size', {timeout: 5000})
      .contains('Collections: 4')
      .should('be.visible');
    cy.get('div#archives-size', {timeout: 5000})
      .contains('Items: 54')
      .should('be.visible');
  })

  it('displays the identifier field and its corresponding value', () => {
    cy.get('td.collection-detail-value.identifier > a', {timeout: 5000})
      .contains('Ms1988_017_Pfeiffer_demo')
      .should('be.visible')
      cy.get('td.collection-detail-value.identifier > a', {timeout: 5000}).click().wait(1000);
    cy.url({ timeout: 2000 }).should('include', '/collection/vb765t25demo');
  })
})