describe('derivative download section: Archive Show page download section', () => {
  beforeEach(() => {
    cy.visit('archive/s253n51s');
    cy.get('div.download-link-section', {timeout: 10000})
      .as('downloadSection');
  })

  it('displays the size field and its corresponding value', () => {
    cy.get('@downloadSection')
      .find('h3')
      .invoke('text')
      .should('equal', 'Download this file');
    cy.get('@downloadSection')
      .find('ul li:nth-child(1)')
      .invoke('text')
      .should('contain', 'sm:')
  })
})