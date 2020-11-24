describe('Archive metadata', () => {
  it('lands on search facet by the metadata field', () => {
    cy.visit('/archive/hs59hv2z');
    cy.get('[data-cy=multi-field-span] a')
      .eq(2)
      .click();
    cy.url({ timeout: 2000 })
      .should('eq', 'http://localhost:3000/search/?category=archive&creator=Chadeayne%2C%20Olive%2C%201904-2001&field=title&q=&view=Gallery');
  });
});

describe('Collection metadata', () => {
  it('lands on search facet by the metadata field', () => {
    cy.visit('/collection/vb765t25demo');
    cy.get('[data-cy=multi-field-span] a')
      .eq(1)
      .click();
    cy.url({ timeout: 2000 })
      .should('eq', 'http://localhost:3000/search/?category=collection&field=title&language=en&q=&view=Gallery');
  });
});
