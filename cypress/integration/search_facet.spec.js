import { Children } from "react";

describe('search_facet: Heading text', () => {
  it('contains the correct title', () => {
    cy.visit('/search');
    cy.get('h2')
      .invoke('text')
      .should('equal', 'Filter My Results');
  });
});

describe('search_facet: Collapsible search filter field', () => {
  beforeEach(() => {
    cy.visit('/search');
  });

  it('displays the facet field while hiding the list of facet values', () => {
    cy.get('div#sidebar div.facet-fields')
      .should('not.be.visible');
    cy.get('button#category')
      .invoke('text')
      .should('equal', 'Category');
    cy.get('button#creator')
      .invoke('text')
      .should('equal', 'Creator');
    cy.get('button#date')
      .invoke('text')
      .should('equal', 'Date');
    cy.get('button#format')
      .invoke('text')
      .should('equal', 'Format');
    cy.get('button#language')
      .invoke('text')
      .should('equal', 'Language');
    cy.get('button#spatial')
      .invoke('text')
      .should('equal', 'Location');
    cy.get('button#tags')
      .invoke('text')
      .should('equal', 'Tags');
    cy.get('button#type')
      .invoke('text')
      .should('equal', 'Type');
  });

  it('displays the list of facet values after the facet field being expanded', () => {
    cy.get('[data-cy=filter-collapsibles] > :nth-child(6) > div > div.facet-listing')
        .should('not.be.visible');
    cy.get('[data-cy=filter-collapsibles] > :nth-child(6)')
        .click();
    cy.get('[data-cy=filter-collapsibles] > :nth-child(6) > div > div.facet-listing', { timeout: 5000 })
        .should('be.visible');
  });
})
