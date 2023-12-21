describe('linked_metadata: Archive metadata', () => {
  it('lands on search facet by the metadata field', () => {
    cy.visit('/archive/cv65x38f');
    cy.get('tr.creator > td.collection-detail-value > div > span.list-unstyled > a')
      .click();
    cy.wait(5000)
    cy.url({ timeout: 2000 })
      .should('eq', 'http://localhost:3000/search/?category=archive&creator=Green%2C%20Terence%20M.&field=title&q=&view=Gallery');
  });

  it('first entry in "Is Part of" directs to the top level collection show page', () => {
    cy.visit('/archive/cv65x38f');
    cy.get('tr.is_part_of > td > div > span:nth-child(1) > a')
      .click();
    cy.wait(5000)
    cy.url({ timeout: 2000 })
      .should('eq', 'http://localhost:3000/collection/4g825g7ddemo');
  });
});

describe('linked_metadata: Collection metadata', () => {
  it('lands on search facet by the metadata field', () => {
    cy.visit('/collection/vb765t25demo');
    cy.wait(5000);
    cy.get('tr.language > td > div > span:nth-child(1) > a')
      .click();
    cy.wait(5000);
    cy.url({ timeout: 2000 })
      .should('eq', 'http://localhost:3000/search/?category=collection&field=title&language=en&q=&view=Gallery');
  });
});
