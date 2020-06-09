describe('Heading text', () => {
  it('contains the correct title', () => {
    cy.visit('http://localhost:3000/search');
    cy.get('h2')
      .invoke('text')
      .should('equal', 'Filter');
  });
});

describe('Collapsible search filter field', () => {
  it('displays the facet field while hiding the list of facet values', () => {
    cy.visit('http://localhost:3000/search');
    cy.get('[data-cy="filter-collapsible"]')
        .as('CollapseFilter');

    cy.get('@CollapseFilter')
        .eq(0)
        .invoke('text')
        .should('equal', 'Category');
    cy.get('@CollapseFilter')
        .eq(1)
        .invoke('text')
        .should('equal', 'Creator');
    cy.get('@CollapseFilter')
        .eq(2)
        .invoke('text')
        .should('equal', 'Language');
    cy.get('@CollapseFilter')
        .eq(3)
        .invoke('text')
        .should('equal', 'Date');
  })
}) 