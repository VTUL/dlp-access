const USERNAME = "devtest";
const PASSWORD = Cypress.env('password');

describe("Update Site title and change it back", function() {
  beforeEach(() => {
    cy.visit("/siteAdmin");
    cy.get("form")
      .find(selectors.usernameInput, {
        includeShadowDom: true,
      })
      .type(USERNAME);

    cy.get("form")
      .find(selectors.signInPasswordInput, {
        includeShadowDom: true,
      })
      .type(PASSWORD, { force: true });

    cy.get("form")
      .find(selectors.signInSignInButton, {
        includeShadowDom: true,
      })
      .click({ force: true });
  })
 
  it("Update Site title", () => {
    cy.get("input[value='editSite']").parent().click();
    cy.get("input[name='siteTitle']").clear().type("IAWA1");
    cy.contains("Update Site").click();
    cy.contains("Site Title: IAWA1").should('be.visible');
    cy.wait(1000);
  })

  it("Change title back", () => {
    cy.get("input[value='editSite']").parent().click();
    cy.get("input[name='siteTitle']").clear().type("IAWA");
    cy.contains("Update Site").click();
    cy.contains("Site Title: IAWA").should('be.visible');
    cy.wait(1000);
  })

  afterEach("User signout:", () => {
    cy.get("amplify-sign-out")
      .find(selectors.signOutButton, { includeShadowDom: true })
      .contains("Sign Out").click({ force: true });
  })
});

export const selectors = {
  usernameInput: '[data-test="username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]',
  signOutButton: '[data-test="sign-out-button"]'
}