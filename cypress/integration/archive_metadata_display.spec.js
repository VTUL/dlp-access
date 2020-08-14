describe('A single Archive Show page metadata section', () => {
  beforeEach(() => {
    cy.visit('/archive/hs59hv2z');
    cy.get('#content-wrapper > div.item-page-wrapper > div.item-details-section > div.details-section-metadata > table')
      .as('metadataSection')
  })

  it('displays the identifier field and its corresponding value', () => {
    cy.get('@metadataSection')
      .find(':nth-child(2) > th.collection-detail-key')
      .invoke('text')
      .should('equal', 'Identifier')
    cy.get('@metadataSection')
      .find(':nth-child(2) > td.collection-detail-value').click()
    cy.url().should('include', '/archive/hs59hv2z')
  })

  it('displays the custom key field and its corresponding value', () => {
    cy.get('@metadataSection')
      .find(':nth-child(6) > th.collection-detail-key')
      .invoke('text')
      .should('equal', 'Permanent Link')
    cy.get('@metadataSection')
      .find(':nth-child(6) > td.collection-detail-value')
      .contains('idn.lib.vt.edu/ark:/53696/hs59hv2z')
  })
})