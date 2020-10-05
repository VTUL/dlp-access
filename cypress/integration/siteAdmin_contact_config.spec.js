const USERNAME = "devtest";
const PASSWORD = "access2020";

describe("Displays and updates contact configurations", () => {
  it("Logs in to admin site", () => {
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
        
    cy.wait(5000);
  })
      
    it("Displays contact fields", () => {
      cy.get("input[value='viewSite']").parent().click()
      cy.contains("Contact 1")
      cy.contains("Title: IAWA Archivist");
      cy.contains("Contact 2")
      cy.contains("Title: Board Chair")
    });
  
  it("Updates contact fields", () => {
    cy.get("input[value='editSite']").parent().click();
    cy.get("#c1_title").clear().type("Director");
    cy.contains("Update Site").click()
    cy.contains("Title: Director");
  })

});

export const selectors = {
  // Auth component classes
  usernameInput: '[data-test="sign-in-username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]',
  signOutButton: '[data-test="sign-out-button"]',
};