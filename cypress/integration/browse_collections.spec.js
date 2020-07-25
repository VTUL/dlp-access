describe('Browse collections page', () => {
  beforeEach(() => {
    cy.visit('/collections')
  })

  it('displays the correct page title', () => {
    cy.get('h1')
      .invoke('text')
      .should('equal', 'About Our Collections')
  })

  it('finds the first collection sorted by title as default', () => {
    cy.get('#content-wrapper')
      .find('.row')
      .children('.gallery-item')
      .first() 
      .as('firstCollection')
      .contains('Alberta Pfeiffer Architectural Collection, 1929-1976 (Ms1988-017)')
    cy.get('@firstCollection').click()
    cy.url()
      .should('include', '/collection/vb765t25')
    cy.contains('Ms1988_017_Pfeiffer')
  })

  it('renders the first 10 collections by default number of results to be showed', () => {
    cy.get('#content-wrapper')
      .find('.row')
      .children('.gallery-item')
      .should('have.length', 10)
  })
  
  it('renders the all the collections if increasing the number of results to be showed', () => {
    cy.get('#content-wrapper')
      .find('div.collection-view-options > :nth-child(4) > div.selection')
      .click()
      .contains('50')
      .click()
    cy.get('#content-wrapper')
      .find('.row')
      .children('.gallery-item')
      .should('have.length', 11)
  })
})
