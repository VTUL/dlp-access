import { Children } from "react";

describe('Selecting English loads English results', () => {
  it('Language checkbox exists and updates url', () => {
    cy.visit("/search");
    cy.get('div.facet-fields')
      .find(':nth-child(1) h3 button#category')
      .click()
      .invoke('text')
      .should('equal', 'Category');
      cy.get('input#archive').click();
    cy.get('div.facet-fields')
      .find(':nth-child(5) h3 button#language')
      .click()
      .invoke('text')
      .should('equal', 'Language');
    cy.get('input#en').click()
    cy.url().should("include", "language=en");
  });

  it('Items should now be English', () => {
    cy.get('div.gallery-item').first()
      .find('a')
      .click();
    cy.url().should("include", "/archive/")
    cy.get('div.details-section-metadata > table[aria-label="Item Metadata"] tbody')
      .find(':nth-child(7) td a')
      .invoke('text')
      .should('equal', 'English');
  });
});