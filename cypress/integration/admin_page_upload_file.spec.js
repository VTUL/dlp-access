const USERNAME = "devtest";
const PASSWORD = Cypress.env('password');

describe("Upload Site Content test", () => {
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

      cy.get("#content-wrapper > div > div > ul")
        .find(":nth-child(3) > a")
        .contains("Upload Site Content")
        .click()
      cy.url().should("include", "/siteAdmin")
    })
 
    describe("Upload an HTML file", () => {
      it("Displays successful upload and stores it in S3", () => {
        const htmlPath = "sitecontent/about1.html"
        cy.get("input[type=file]").eq(0).attachFile(htmlPath).trigger('change', { force: true });
        cy.get("form > div > button")
          .click({ force: true })
        cy.get('[data-test="upload-message"]')
          .should('have.attr', 'style', 'color: green;')
          .invoke("text")
          .should("include", "uploaded successfully")
      })
    })

    describe("Upload an image file", () => {
      it("displays successful upload", () => {
        const imgPath = "sitecontent/cover_image1.jpg"
        cy.get("input[type=file]").eq(0).attachFile(imgPath).trigger('change', { force: true });
        cy.get("form > div > button")
          .click({ force: true })
          
        cy.get('[data-test="upload-message"]')
          .should('have.attr', 'style', 'color: green;')
          .invoke("text")
          .should("include", "uploaded successfully")
      })
    })

    describe("Upload a file other than image or HTML type", () => {
      it("displays error message", () => {
        const filePath = "sitecontent/test.txt"
        cy.get("input[type=file]").eq(0).attachFile(filePath).trigger('change', { force: true });
                
        cy.get('[data-test="upload-message"]')
          .should("have.attr", "style", "color: red;")
          .invoke("text")
          .should("equal", "Please upload image or HTML file only!!")
      })
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