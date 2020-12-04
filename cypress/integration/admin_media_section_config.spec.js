const USERNAME = "devtest";
const PASSWORD = Cypress.env("password");

describe("Displays and updates media section configurations", () => {
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
      .find(":nth-child(8) > a")
      .contains("Homepage media section")
      .click();
    cy.url({ timeout: 2000 }).should("include", "/siteAdmin");
  })

  describe("Displays media section fields", () => {
    it("Displays media section fields", () => {
      cy.get("input[value='view']")
        .parent()
        .click();
      cy.get("span.link-value", { timeout: 2000 }).should("not.be.empty").should("be.visible");
      cy.get("span.media-embed-value").should("not.be.empty").should("be.visible");
      cy.get("span.title-value").should("not.be.empty").should("be.visible");
      cy.get("span.text-value").should("not.be.empty").should("be.visible");
    });
  });
    
  describe("Updates title and changes it back", () => {
    let title;
    it("Updates media section-title", () => {
      cy.get("input[value='view']")
        .parent()
        .click();
      cy.get("span.title-value").then(($title) => {
        title = $title.text();
        cy.get("input[value='edit']").parent().click();
        cy.get("input[name='title']", { timeout: 2000 })
          .clear()
          .type("Test title");
        cy.get("button.submit").contains("Update Config").click();
        cy.contains("Title: Test title", { timeout: 2000 }).should("be.visible");
      });
    });
  
    it("Reverses update", () => {
      cy.get("input[value='edit']")
        .parent()
        .click();
      cy.get("input[name='title']", { timeout: 2000 })
        .clear()
        .type(title);
      cy.get("button.submit").contains("Update Config").click();
      cy.contains(title, { timeout: 2000 }).should("be.visible");
    });
  });

  afterEach("User signout:", () => {
    cy.get("amplify-sign-out")
      .find(selectors.signOutButton, { includeShadowDom: true })
      .contains("Sign Out").click({ force: true });
  })
});

export const selectors = {
  // Auth component classes
  usernameInput: '[data-test="sign-in-username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]',
  signOutButton: '[data-test="sign-out-button"]',
};