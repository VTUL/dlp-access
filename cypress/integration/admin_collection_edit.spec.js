describe("admin_collection_edit: Update collection metadata and change it back", function() {
  before(() => {
    cy.signIn();
  });
  
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/siteAdmin");
    
    cy.get("#content-wrapper > div > div > ul", { timeout: 2000 })
      .find(".collectionFormLink > a")
      .contains("New / Update Collection")
      .click()
    cy.url().should("include", "/siteAdmin")

    cy.get('input')
      .clear()
      .type('Ms1988_017_Pfeiffer_demo');
    cy.contains("Confirm").click();
    cy.get("input[value='view']")
    .parent()
    .find('input')
    .should('be.checked')
    cy.contains("Description: Alberta Pfeiffer’s architectural career spanned 55 years, where she worked primarily in Hadlyme, Connecticut.").should("be.visible");
  })

  after(() => {
    cy.clearLocalStorageSnapshot();
    cy.clearLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Update single-valued metadata", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("textarea[name='title']").invoke('val', '');
    cy.get("textarea[name='title']").type("New Title");
    cy.contains("Update Collection Metadata").click();
    cy.contains("New Title").should('be.visible');
  })

  it("Change single-valued metadata back", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("textarea[name='title']")
      .clear().type("Alberta Pfeiffer Architectural Collection, 1929-1976 (Ms1988-017)");
    cy.contains("Update Collection Metadata").click();
    cy.contains("Title: Alberta Pfeiffer Architectural Collection, 1929-1976 (Ms1988-017)").should('be.visible');
  })
});
