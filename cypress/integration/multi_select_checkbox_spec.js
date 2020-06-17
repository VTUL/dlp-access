describe('Single selectable checkboxes corresponding to facet values of a search facet field', () => {
  beforeEach(() => {
    cy.visit('/search');
    cy.get('[data-cy=filter-collapsibles] > :nth-child(4)')
        .click();
  });

  it('allows to select none of the checkboxes', () => {
    cy.get('[data-cy=facet-checkboxes] > :nth-child(1) input')
        .should('not.have.class', 'checked')
  });

  it('allows to select one of the checkboxes', () => {
    cy.get('[data-cy=facet-checkboxes] > :nth-child(3) input')
        .check();

    cy.url()
      .should('contain', 'format=13.5+in.+x+16+in.');
    cy.get('[data-cy=search-filter-field-value-pairs]')
        .invoke('text')
        .should('contain', 'format --> 13.5 in. x 16 in.');
  });

  it('allows to select more than one checkboxes', () => {
    cy.get('[data-cy=facet-checkboxes] > :nth-child(3) input')
        .check();
    cy.get('[data-cy=facet-checkboxes] > :nth-child(7) input')
        .check();

    cy.url()
        .should('contain', 'format=13.5+in.+x+16+in.')
        .should('contain', 'format=Scale%3A+1%2F8+in.+%3D+1+ft.');
    cy.get('[data-cy=search-filter-field-value-pairs]')
        .invoke('text')
        .should('contain', 'format --> 13.5 in. x 16 in.')
        .should('contain', 'format --> Scale: 1/8 in. = 1 ft.');
  });
});