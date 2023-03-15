describe('show_all_less_buttons: Search Facet field with more than 5 selectable values', () => {
  beforeEach(() => {
    cy.visit('/search');
    cy.get('button#medium')
      .click().wait(20000);
      
  });
  
  it('displays the first 5 facet values', () => {
    cy.get('div.medium > div > div.facet-listing', { timeout: 5000 })
      .should("be.visible");
    
    cy.get('div.medium > div > div.facet-listing', { timeout: 5000 })
      .children()
      .should('have.length', 5);
  });
  
  it('displays all facet values if all button is clicked', () => {
    cy.get('div.medium > div > div.facet-listing', { timeout: 5000 })
      .should('be.visible');
    cy.get('div.medium > div > div.all-less', { timeout: 5000 })
      .click({force: true});
    cy.get('div.medium > div > div.facet-listing', { timeout: 5000 })
      .children()
      .should('have.length', 9);
    cy.get('div.medium > div > div.facet-listing', { timeout: 5000 })
      .should('have.class', 'scroll');
    cy.get('div.medium > div > div.facet-listing > :nth-child(9) input', { timeout: 5000 })
      .should('not.be.visible');
    cy.get('div.medium > div > div.facet-listing > :nth-child(9) input', { timeout: 5000 }).scrollIntoView()
      .should('be.visible');
  });
})
