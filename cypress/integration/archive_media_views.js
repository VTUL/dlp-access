describe('Archive static img view', () => {
  it('shows correct img tag', () => {
    cy.visit('http://localhost:3000/archive/m58xyh90');
    cy.get('#content-wrapper > div > div.item-image-section > div.row > div > img')
      .eq(0)
      .should('have.class', 'item-img')
      .should('be.visible');
  });
});

describe('Archive Mirador viewer', () => {
  it('renders viewer if manifest.json', () => {
    cy.visit('http://localhost:3000/archive/5v709r98');
    cy.get('div#mirador_viewer')
      .eq(0)
      .should('have.class', 'mirador-container')
      .should('be.visible');
    cy.get('div.workspace-container > div > div > div.window > div.content-container > div.view-container > div.image-view')
      .eq(0)
      .should('be.visible');
  });
});