describe("admin_displayed_attributes_config: Update attribute and change it back", function () {
  before(() => {
    cy.signIn();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/siteAdmin");

    cy.get("#content-wrapper > div > div > ul", { timeout: 2000 })
      .find(":nth-child(7) > a")
      .contains("Displayed Attributes")
      .click();
    cy.url({ timeout: 2000 }).should("include", "/siteAdmin");
  });

  after(() => {
    cy.clearLocalStorageSnapshot();
    cy.clearLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("first attribute required", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("#archive_0_wrapper", { timeout: 2000 })
      .find("span.required")
      .invoke("text")
      .should("eq", "Required");
  });

  it("Update first attribute", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("input[id='archive_0']", { timeout: 2000 })
      .clear()
      .type("Not Identifier");
    cy.contains("Update Attributes").click();
    cy.contains("label: Not Identifier", { timeout: 2000 }).should(
      "be.visible"
    );
  });

  it("Change first attribute back", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("input[id='archive_0']", { timeout: 2000 })
      .clear()
      .type("Identifier");
    cy.contains("Update Attributes").click();
    cy.contains("label: Identifier", { timeout: 2000 }).should("be.visible");
  });

  it("Can delete attribute", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("section#archive", { timeout: 2000 })
      .find("div.archive_tags_wrapper > a.delete")
      .click();
    cy.contains("Update Attributes", { timeout: 2000 }).click();
    cy.contains("field: tags", { timeout: 2000 }).should("not.exist");
    cy.contains("label: Tags").should("not.exist");
  });

  it("Can add attribute", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("section#archive", { timeout: 2000 })
      .find("select.add_archive_attribute")
      .select("archive#tags");
    cy.get("section#archive").find("a.add.active").click();
    cy.get("section#archive", { timeout: 2000 })
      .find("div.archive_tags_wrapper > div.field.attributeLabel")
      .find("input")
      .clear()
      .type("Tags");
    cy.contains("Update Attributes").click();
    cy.contains("field: tags", { timeout: 2000 }).should("be.visible");
    cy.contains("label: Tags").should("be.visible");
  });
});
