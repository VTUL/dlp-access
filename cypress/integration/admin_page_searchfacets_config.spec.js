const USERNAME = "devtest";
const PASSWORD = Cypress.env("password");

describe("Displays and updates sitepages configurations", () => {
  beforeEach(() => {
    cy.visit("/siteAdmin");
    cy.get("amplify-authenticator")
      .find(selectors.usernameInput, {
        includeShadowDom: true,
      })
      .type(USERNAME);

    cy.get("amplify-authenticator")
      .find(selectors.signInPasswordInput, {
        includeShadowDom: true,
      })
      .type(PASSWORD, { force: true });

    cy.get("amplify-authenticator")
      .find(selectors.signInSignInButton, {
        includeShadowDom: true,
      })
      .first()
      .find("button[type='submit']", { includeShadowDom: true })
      .click({ force: true });

    cy.get("#content-wrapper > div > div > ul")
      .find(":nth-child(5) > a")
      .contains("Search Facets Config")
      .click()
    cy.url().should("include", "/siteAdmin")
  });

  describe("Displays search facet fields", () => {
    it("Displays search facets fields", () => {
      cy.get("input[value='view']")
        .parent()
        .click();
      cy.contains("Facet Field: category").should("be.visible");
      cy.contains("Label: Category").should("be.visible");
      cy.contains("Values:").should("be.visible");
      cy.contains("collection").should("be.visible");
      cy.contains("archive").should("be.visible");
    });
  });

  describe("Updates category facet's label and changes it back", () => {
    it("Updates search facet's label", () => {
      cy.get("input[value='edit']").parent().click();
      cy.get("input[name='category_label']")
        .first()
        .clear()
        .type("Object Type");
      cy.contains("Update Search Facets").click()
      cy.contains("Label: Object Type").should("be.visible");
    })

    it("Reverses update", () => {
      cy.get("input[value='edit']")
        .parent()
        .click();
      cy.get("input[name='category_label']")
        .first()
        .clear()
        .type("Category");
      cy.contains("Update Search Facets").click();
      cy.contains("Label: Category").should("be.visible");
    });
  });

  describe("Updates creator facet's value and changes it back", () => {
    it("Updates creator facet's value", () => {
      cy.get("input[value='edit']").parent().click();
      cy.get("input[name='creator_value_0']")
        .first()
        .clear()
        .type("Pfeiffer, Alberta, 1899-1993");
      cy.contains("Update Search Facets").click()
      cy.contains("Pfeiffer, Alberta, 1899-1993").should("be.visible");
    })

    it("Reverses update", () => {
      cy.get("input[value='edit']")
        .parent()
        .click();
      cy.get("input[name='creator_value_0']")
        .first()
        .clear()
        .type("Pfeiffer, Alberta, 1899-1994");
      cy.contains("Update Search Facets").click();
      cy.contains("Pfeiffer, Alberta, 1899-1994").should("be.visible");
    });
  });

  describe("Adds creator facet's value and removes it", () => {
    it("Updates creator facet's value", () => {
      cy.get("input[value='edit']").parent().click();
      cy.contains("Add Value")
        .first()
        .click();
      cy.get("input[name='creator_value_12']")
        .first()
        .clear()
        .type("Department of the Army");
      cy.contains("Update Search Facets").click()
      cy.contains("Department of the Army").should("be.visible");
    })

    it("Removes the added creator value", () => {
      cy.get("input[value='edit']")
        .parent()
        .click();
      cy.get("#content-wrapper > div > div > div > form > section:nth-child(2) > fieldset > ul > li:nth-child(13)")
        .contains("X")
        .click()
      cy.contains("Update Search Facets").click();
      cy.contains("Department of the Army").should("not.be.visible");
    });
  });

  describe("Add a new facet field and remove it", () => {
    it("Adds a new search facet field", () => {
      cy.get("input[value='edit']").parent().click();
      cy.get("select").select("collection");
      cy.contains("Add New Search Facet").click();
      cy.get("input[name='collection_label']")
        .first()
        .clear()
        .type("Collection Type");
      cy.get("#content-wrapper > div > div > div > form > section:nth-child(9) > fieldset")
        .contains("Add Value")
        .click()
      cy.get("input[name='collection_value_0']")
        .first()
        .clear()
        .type("Alberta Pfeiffer Architectural Collection, 1929-1976 (Ms1988-017)");
      cy.contains("Update Search Facets").click();
      cy.contains("Facet Field: collection").should("be.visible");
      cy.contains("Label: Collection Type").should("be.visible");
      cy.contains("Alberta Pfeiffer Architectural Collection, 1929-1976 (Ms1988-017)").should("be.visible");
    })

    it("Removes the newly added facet field", () => {
      cy.get("input[value='edit']")
        .parent()
        .click();
      cy.get("#content-wrapper > div > div > div > form > section:nth-child(2)")
        .contains("Delete Facet Field")
        .click()
      cy.contains("Update Search Facets").click();
      cy.contains("Facet Field: collection").should("not.be.visible");
      cy.contains("Label: Collection Type").should("not.be.visible");
      cy.contains("Alberta Pfeiffer Architectural Collection, 1929-1976 (Ms1988-017)").should("not.be.visible");
    });
  });

  afterEach(() => {
    cy.get("amplify-sign-out")
      .find(selectors.signOutButton, { includeShadowDom: true })
      .contains("Sign Out").click({ force: true });    
  });
});

export const selectors = {
  // Auth component classes
  usernameInput: '[data-test="sign-in-username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]',
  signOutButton: '[data-test="sign-out-button"]',
};