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

  it("Update Homepage statement using editor", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get(".ql-editor").clear().type("Test statement");
    cy.contains("Update Config").click();
    cy.contains("Test statement").should('be.visible');
    cy.get("input[value='edit']").parent().click();
    cy.get(".ql-editor").clear().type("A visual exhibit of selected items from the International Archive of Women in Architecture, a joint partnership between the College of Architecture and Urban Studies and the University Libraries.");
    cy.contains("Update Config").click();
    cy.contains("A visual exhibit of selected items from the International Archive of Women in Architecture, a joint partnership between the College of Architecture and Urban Studies and the University Libraries.").should('be.visible');
  })

  it("displays successful upload", () => {
    cy.get("input[value='edit']").parent().click();
    const imgPath = "sitecontent/cover_image1.jpg";
    cy.get("input[type=file]").eq(0).attachFile(imgPath).trigger('change', { force: true });
    cy.get(".static-image > div.fileUploadField > button.uploadButton")
      .click({ force: true }).wait(5000);
    cy.get('#file_upload_results_message', { timeout: 5000 })
      .should('have.attr', 'style', 'color: green;')
      .invoke("text")
      .should("include", "uploaded successfully");
  })
});