describe('searchfacet_checkbox: Search facet checkboxes correspond to the facet values of a facet field', () => {
  beforeEach(() => {
    cy.visit('/search');
    cy.get('button#medium')
      .click();
      cy.wait(20000);
  })

  it('allows to select one of the checkboxes', () => {
    cy.get('input#colored_pencil', { timeout: 5000 })
      .check();
    cy.url()
      .should('contain', 'medium=Colored+pencil');
    cy.get('[data-cy=search-filter-field-value-pairs]')
      .invoke('text')
      .should('contain', 'medium', 'Colored pencil');
  })

  it('allows to select more than one checkboxes', () => {
    cy.get('input#colored_pencil', { timeout: 5000 })
      .check();
    cy.get('div.medium > div > div.all-less')
      .click();
    cy.get('input#photographic_print_-_black_and_white').scrollIntoView()
      .should('be.visible');
    cy.get('input#photographic_print_-_black_and_white')
      .check();

    cy.url()
      .should('contain', 'medium=Colored+pencil')
      .and('contain', 'medium=Photographic+Print+-+Black+and+White');
    cy.get('[data-cy=search-filter-field-value-pairs]')
      .invoke('text')
      .should('contain', 'medium', 'Colored pencil')
      .and('contain', 'medium', 'Photographic Print - Black and White');
  })
})
