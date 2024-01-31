describe("admin_page_title_config: Update Site title and change it back", function () {
  before(() => {
    cy.signIn();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/siteAdmin");
  });

  after(() => {
    cy.clearLocalStorageSnapshot();
    cy.clearLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Update Site title", () => {
    cy.get("input[value='editSite']").parent().click();
    cy.get("input[name='siteTitle']", { timeout: 2000 }).clear().type("DEMO1");
    cy.contains("Update Site").click();
    cy.contains("Site Title: DEMO1").should("be.visible");
  });

  it("Change title back", () => {
    cy.get("input[value='editSite']").parent().click();
    cy.get("input[name='siteTitle']", { timeout: 2000 }).clear().type("DEMO");
    cy.contains("Update Site").click();
    cy.contains("Site Title: DEMO", { timeout: 2000 }).should("be.visible");
  });
});
