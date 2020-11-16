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
      .find(":nth-child(2) > a")
      .contains("Site Pages Config")
      .click();
    cy.url().should("include", "/siteAdmin");
  });

  describe("Displays site pages fields", () => {
    it("Displays site pages fields", () => {
      cy.get("input[value='view']")
        .parent()
        .click();
      cy.contains("Page ID: terms").should("be.visible");
      cy.contains("Component: PermissionsPage").should("be.visible");
      cy.contains("Assets:").should("be.visible");
      cy.contains("Local URL: /permissions").should("be.visible");
      cy.contains("Text: Permission").should("be.visible");
      cy.contains("Data URL: terms.html").should("be.visible");
    });
  });
    
  describe("Updates first page's ID and changes it back", () => {
    it("Updates site page's fields", () => {
      cy.get("input[value='edit']").parent().click();
      cy.get("input[name='terms_pageName[]']")
        .first()
        .clear()
        .type("testID");
      cy.contains("Update Site").click();
      cy.contains("Page ID: testID ").should("be.visible");
    })
  
    it("Reverses update", () => {
      cy.get("input[value='edit']")
        .parent()
        .click();
      cy.get("input[name='testID_pageName[]']")
        .first()
        .clear()
        .type("terms");
      cy.contains("Update Site").click();
      cy.contains("Page ID: terms").should("be.visible");
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