import { Children } from "react";

describe('Heading text', () => {
  it('contains the correct title', () => {
    cy.visit('/search');
    cy.get('h2')
      .invoke('text')
      .should('equal', 'Filter');
  });
});

describe('Collapsible search filter field', () => {
  beforeEach(() => {
    cy.visit('/search');
  });

  it('displays the facet field while hiding the list of facet values', () => {
    cy.get('[data-cy=facet-checkboxes]')
        .should('not.be.visible');
    cy.get('[data-cy=filter-collapsibles] > :nth-child(1)')
        .invoke('text')
        .should('equal', 'Category');
    cy.get('[data-cy=filter-collapsibles] > :nth-child(2)')
        .invoke('text')
        .should('equal', 'Creator');
    cy.get('[data-cy=filter-collapsibles] > :nth-child(3)')
        .invoke('text')
        .should('equal', 'Date');
    cy.get('[data-cy=filter-collapsibles] > :nth-child(4)')
        .invoke('text')
        .should('equal', 'Format');
    cy.get('[data-cy=filter-collapsibles] > :nth-child(5)')
        .invoke('text')
        .should('equal', 'Language');
    cy.get('[data-cy=filter-collapsibles] > :nth-child(6)')
        .invoke('text')
        .should('equal', 'Medium');
    cy.get('[data-cy=filter-collapsibles] > :nth-child(7)')
        .invoke('text')
        .should('equal', 'Type');
  });

  it('displays the list of facet values after the facet field being expanded', () => {
    cy.get('[data-cy=filter-collapsibles] > :nth-child(3)')
        .click();
    cy.get('[data-cy=facet-checkboxes]')
        .should('be.visible');
  });
}) 