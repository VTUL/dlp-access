describe("admin_homepage_sponsors_config: Update sponsors fields and revert", function () {
  before(() => {
    cy.signIn();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/siteAdmin");

    cy.get(
      "#content-wrapper > div.row.admin-wrapper > div.admin-sidebar > ul",
      { timeout: 5000 }
    )
      .find("li.homepage > a", { timeout: 5000 })
      .contains("Homepage Config")
      .click();
    cy.url().should("include", "/siteAdmin");
  });

  after(() => {
    cy.clearLocalStorageSnapshot();
    cy.clearLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Updates first sponsor URL", () => {
    cy.get("input[value='edit']", { timeout: 2000 }).parent().click();
    cy.get("#s0_link").clear().type("https://lib.vt.edu/");
    cy.contains("Update Config").click();
    cy.contains("URL: https://lib.vt.edu/").should("be.visible");
  });

  it("Reverses update", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("#s0_link").clear().type("https://clir.org/");
    cy.contains("Update Config").click();
    cy.contains("URL: https://clir.org/").should("be.visible");
  });

  it("Adds new sponsor with image", () => {
    cy.get("input[value='edit']").parent().click();
    const imgPath = "sitecontent/sponsor4.png";
    cy.get("button[aria-label='Add sponsor']", { timeout: 2000 }).click();
    cy.get(
      "#sponsor3_form > section > div.fileUploadField > input[type=file]",
      { timeout: 2000 }
    )
      .eq(0)
      .attachFile(imgPath)
      .trigger("change", { force: true });
    cy.get(
      "#sponsor3_form > section > div.fileUploadField > button.uploadButton",
      { timeout: 2000 }
    ).click({ force: true });
    cy.get("input#s3_alt", { timeout: 2000 })
      .clear({ force: true })
      .type("Virginia Tech", { force: true });
    cy.get("input#s3_link", { timeout: 2000 })
      .clear({ force: true })
      .type("https://vt.edu", { force: true });

    cy.contains("Update Config").click();
    cy.contains("Sponsor 4").should("be.visible");
    cy.contains("Source: sponsors/sponsor4.png").should("be.visible");
    cy.contains("Alt text: Virginia Tech").should("be.visible");
    cy.contains("URL: https://vt.edu").should("be.visible");
  });

  it("Removes new sponsor", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("#sponsor3_form > section > button").click();
    cy.contains("Update Config").click();
    cy.contains("Sponsor 4").should("not.exist");
  });
});
