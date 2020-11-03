const USERNAME = "devtest";
const PASSWORD = Cypress.env('password');

describe("Update attribute and change it back", function() {
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
      .find(":nth-child(7) > a")
      .contains("Displayed Attributes")
      .click()
    cy.url().should("include", "/siteAdmin")
  })
  it("first attribute required", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("#archive_0_wrapper")
     .find("span.required")
     .invoke("text").should("eq", "Required");
  })
 
  it("Update first attribute", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("input[id='archive_0']").clear().type("Not Identifier");
    cy.contains("Update Attributes").click();
    cy.contains("label: Not Identifier").should('be.visible');
    cy.wait(1000);
  })

  it("Change first attribute back", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("input[id='archive_0']").clear().type("Identifier");
    cy.contains("Update Attributes").click();
    cy.contains("label: Identifier").should('be.visible');
    cy.wait(1000);
  })

  it("Can delete attribute", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("section#archive")
      .find('a.delete.active').last().click();
    cy.contains("Update Attributes").click();
    cy.contains("field: tags").should('not.exist');
    cy.contains("label: Tags").should('not.exist');
    cy.wait(1000);
  })  

  it("Can add attribute", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("section#archive")
      .find('select.add_archive_attribute').select("archive#tags");
    cy.get("section#archive")
      .find('a.add.active').click();
    cy.get("section#archive")
      .find('div.field.attributeLabel').last()
      .find('input').clear().type('Tags');
    cy.contains("Update Attributes").click();

    cy.contains("field: tags").should('be.visible');
    cy.contains("label: Tags").should('be.visible');
    cy.wait(1000);
  })

  afterEach("User signout:", () => {
    cy.get("amplify-sign-out")
      .find(selectors.signOutButton, { includeShadowDom: true })
      .contains("Sign Out").click({ force: true });
  })
});

export const selectors = {
  usernameInput: '[data-test="sign-in-username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]',
  signOutButton: '[data-test="sign-out-button"]'
}