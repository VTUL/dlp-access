describe('Search by title by hitting enter key', () => {
  beforeEach(() => {
    cy.visit('/search?field=title&q=building&view=Gallery');
    cy.get('input')
      .clear()
    cy.get('select')
      .select('title');
    cy.get('input').type('Additions{enter}').trigger('input');
    cy.wait(1000);
  });

  it('returns resulting objects with the title searched', () => {
    cy.url()
      .should('eq', 'http://localhost:3000/search?field=title&q=Additions&view=Gallery');
    cy.get('#content > div.navbar > div.navbar-text > div.pagination-section > div.pagination-text')
      .invoke('text')
      .should('equal', 'Search Results: 1 - 10 of 37');
    
    cy.get('#content > div.search-results-section > div.row')
      .children()
      .should('have.length', 10);

    cy.get('#content > div.search-results-section > div.row > :nth-child(1) > div.card > div.card-body > a > h3')
      .invoke('text')
      .should('contains', "Additions");
  });
});

describe('Search by description by clicking search button', () => {
  beforeEach(() => {
    cy.visit('/search?field=title&q=Additions&view=Gallery');
    cy.get('select')
      .select('description');
    cy.get('input')
      .clear()
      .type('certificate');
    cy.get('#content-wrapper > div > div.search-result-wrapper > div > div.searchbar-wrapper > button.btn')
      .click();
    cy.wait(1000);
  });

  it('returns resulting objects with description searched', () => {
    cy.url()
      .should('eq', 'http://localhost:3000/search?field=description&q=certificate&view=Gallery');
    cy.get('#content > div.navbar > div.navbar-text > div.pagination-section > div.pagination-text')
      .invoke('text')
      .should('equal', 'Search Results: 1 - 7 of 7');

    cy.get('#content > div.search-results-section > div.row')
      .children()
      .should('have.length', 7);

    cy.get('#content > div.search-results-section > div.row > :nth-child(1) > div.card > div.card-body > a > p')
      .invoke('text')
      .should('contains', "certificate");
  });
});

describe('Search by all fields by hitting enter key', () => {
  beforeEach(() => {
    cy.visit('/search?field=description&q=building&view=Gallery');
    cy.get('select')
      .select('all');
    cy.get('input')
      .clear()
      .type('Diazotypes (copies){enter}')
      .trigger('input');
    cy.wait(1000);
  });

  it('returns resulting objects with full text search', () => {
    cy.url()
      .should('eq', 'http://localhost:3000/search?field=all&q=Diazotypes%20%28copies%29&view=Gallery');
    cy.get('#content > div.navbar > div.navbar-text > div.pagination-section > div.pagination-text')
      .invoke('text')
      .should('equal', 'Search Results: 1 - 10 of 469');

    cy.get('#content > div.search-results-section > div.row')
      .children()
      .should('have.length', 10)
  });
});