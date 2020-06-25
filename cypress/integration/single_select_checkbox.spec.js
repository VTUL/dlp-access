describe('Single selectable checkboxes corresponding to facet values of a search facet field', () => {
  beforeEach(() => {
    cy.visit('/search');
    cy.get('[data-cy=filter-collapsibles] > :nth-child(1)')
      .click();
  });

  it('allows to select none of the checkboxes', () => {
    cy.get('[data-cy=filter-collapsibles] > :nth-child(1) > div > div.facet-listing > :nth-child(1) input')
      .should('not.have.class', 'checked')
  });

  it('allows to select one of the checkboxes', () => {
    cy.get('[data-cy=filter-collapsibles] > :nth-child(1) > div > div.facet-listing > :nth-child(1) input')
      .check();

    cy.url()
      .should('contain', 'category=collection');
    cy.get("[data-cy=search-filter-field-value-pairs]")
      .invoke("text")
      .should("contain", "category › collection");
  });

  it('Prevents from select more than one checkboxes', () => {
    cy.get('[data-cy=filter-collapsibles] > :nth-child(1) > div > div.facet-listing > :nth-child(1) input')
      .check();
    cy.get('[data-cy=filter-collapsibles] > :nth-child(1) > div > div.facet-listing > :nth-child(2) input')
      .check();

    cy.url()
        .should('contain', 'category=archive')
        .should('not.contain', 'category=collection');
    cy.get("[data-cy=search-filter-field-value-pairs]")
      .invoke("text")
      .should("contain", "category › archive")
      .should("not.contain", "category › collection");
  });
});
