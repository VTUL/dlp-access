const USERNAME = "devtest";
const PASSWORD = Cypress.env('password');

describe("Authenticator:", function() {
    beforeEach(function() {
      cy.visit("/siteAdmin");
    });
 
    describe("Sign in and Sign out:", () => {
      it("allows a user to signin and signout", () => {
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
        
        cy.get("amplify-sign-out")
          .find(selectors.signOutButton, { includeShadowDom: true })
          .contains("Sign Out").click({ force: true });
      });
    });
});

export const selectors = {
  // Auth component classes
  usernameInput: '[data-test="username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]',
  signOutButton: '[data-test="sign-out-button"]'
}