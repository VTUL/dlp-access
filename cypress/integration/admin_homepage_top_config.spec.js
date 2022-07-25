describe("admin_homepage_top_config: Update Homepage fields and revert", function() {
  before(() => {
    cy.signIn();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/siteAdmin");

    cy.get("#content-wrapper > div > div > ul")
      .find(":nth-child(4) > a")
      .contains("Homepage Config")
      .click()
    cy.url().should("include", "/siteAdmin");
  });

  after(() => {
    cy.clearLocalStorageSnapshot();
    cy.clearLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
 
  it("Update Homepage statement heading", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("input[name='homeStatementHeading']").clear().type("Heading test");
    cy.contains("Update Config").click();
    cy.contains("Heading: Heading test").should('be.visible');
  })

  it("Change Homepage statement heading back", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("input[name='homeStatementHeading']").clear().type("Welcome");
    cy.contains("Update Config").click();
    cy.contains("Heading: Welcome").should('be.visible');
  })

  it("displays successful upload", () => {
    cy.get("input[value='edit']").parent().click();
    const imgPath = "sitecontent/cover_image1.jpg";
    cy.get("input[type=file]").eq(0).attachFile(imgPath).trigger('change', { force: true });
    cy.get(".static-image > div.fileUploadField > button.uploadButton")
      .click({ force: true });
    cy.get('[data-test="upload-message"]', { timeout: 5000 })
      .should('have.attr', 'style', 'color: green;')
      .invoke("text")
      .should("include", "uploaded successfully");
  })
});