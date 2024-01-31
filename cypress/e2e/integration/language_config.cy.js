describe("language_config.spec: Selecting English loads English results", () => {
  it("Language checkbox exists and updates url", () => {
    cy.visit("/search");
    cy.wait(2000);
    cy.get("div.facet-fields")
      .find("div.category > div > h3 > button#category")
      .click({ force: true })
      .invoke("text")
      .should("equal", "Category");
    cy.get("input#archive", { timeout: 2000 }).click();
    cy.get("div.facet-fields")
      .find("div.language > div > h3 > button#language")
      .click({ force: true })
      .invoke("text")
      .should("equal", "Language");
    cy.get("input#en", { timeout: 2000 }).click();
    cy.wait(2000);
    cy.url().should("include", "language=en");
  });

  it("Items should now be English", () => {
    cy.visit("/search");
    cy.wait(2000);
    cy.get("div.facet-fields")
      .find("div.category > div > h3 > button#category")
      .click({ force: true })
      .invoke("text")
      .should("equal", "Category");
    cy.get("input#archive", { timeout: 2000 }).click();
    cy.get("div.facet-fields")
      .find("div.language > div > h3 > button#language")
      .click({ force: true })
      .invoke("text")
      .should("equal", "Language");
    cy.get("input#en", { timeout: 2000 }).click();
    cy.get("div.gallery-item > div.card > a").first().click({ force: true });
    cy.wait(2000);
    cy.url().should("include", "/archive/");
    cy.get(
      'div.details-section-metadata > table[aria-label="Item Metadata"] tbody',
      { timeout: 5000 }
    )
      .find("tr.language td a", { timeout: 5000 })
      .invoke("text")
      .should("equal", "English");
  });
});
