describe('Single selectable checkboxes corresponding to facet values of a search facet field', () => {
  it('Allows to select none of the checkboxes', () => {
    cy.visit('http://localhost:3000/search');
    cy.get('[data-cy="filter-collapsible"]')
        .eq(0)
        .click()
    cy.get('.form-check-input')
        .eq(0)
        .should('not.have.class', 'checked')
  
  });

  it('Allows to select one of the checkboxes', () => {
    cy.visit('http://localhost:3000/search');
    cy.get('[data-cy="filter-collapsible"]')
        .eq(0)
        .click()

    cy.get('[type="checkbox"]').first().click()
    
    cy.url()
      .should('include', 'category=collection');
  });

  it('Prevents from select more than one checkboxes', () => {
    cy.visit('http://localhost:3000/search');
    cy.get('[data-cy="filter-collapsible"]')
        .eq(0)
        .click()

    cy.get('[type="checkbox"]')
      .eq(0)
      .click()
    cy.url().should('include', 'category=collection');

    cy.get('[type="checkbox"]')
        .eq(1)
        .click()
    cy.url().should('include', 'category=archive');
    cy.url().should('not.include', 'category=collection');
  });
});