describe("admin_page_contact_config: Displays and updates contact configurations", () => {
  before(() => {
    cy.signIn();
  });
  
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/siteAdmin");
  })

  after(() => {
    cy.clearLocalStorageSnapshot();
    cy.clearLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe("admin_page_contact_config: Displays contact fields", () => {
    it("Displays contact fields", () => {
      cy.get("input[value='viewSite']")
        .parent()
        .click();
      cy.contains("Contact 1").should("be.visible");
      cy.contains("Title: IAWA Archivist").should("be.visible");
      cy.contains("Contact 2").should("be.visible");
      cy.contains("Title: Board Chair").should("be.visible");
    });
  });
    
  describe("admin_page_contact_config: Updates first contact's title and changes it back", () => {
    it("Updates contact fields", () => {
      cy.get("input[value='editSite']").parent().click();
      cy.get("#c0_title").clear().type("Director");
      cy.contains("Update Site").click();
      cy.contains("Title: Director").should("be.visible");
    })
  
    it("Reverses update", () => {
      cy.get("input[value='editSite']")
        .parent()
        .click();
      cy.get("#c0_title")
        .clear()
        .type("IAWA Archivist");
      cy.contains("Update Site").click();
      cy.contains("Title: IAWA Archivist").should("be.visible");
    });
  });
});