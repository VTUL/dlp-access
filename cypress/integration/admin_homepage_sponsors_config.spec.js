const USERNAME = "devtest";
const PASSWORD = Cypress.env("password");

describe("Update sponsors fields and revert", function () {
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
            .find(":nth-child(4) > a")
            .contains("Homepage Config")
            .click();
        cy.wait(500);
        cy.url().should("include", "/siteAdmin");
    });

    it("Updates first sponsor URL", () => {
        cy.get("input[value='edit']")
            .parent()
            .click();
        cy.get("#s0_link")
            .clear()
            .type("https://www.lib.vt.edu");
        cy.contains("Update Config").click();
        cy.wait(500);
        cy.contains("URL: https://www.lib.vt.edu").should("be.visible");
    });

    it("Reverses update", () => {
        cy.get("input[value='edit']")
            .parent()
            .click();
        cy.get("#s0_link")
            .clear()
            .type("https://clir.org/");
        cy.contains("Update Config").click();
        cy.wait(500);
        cy.contains("URL: https://clir.org/").should("be.visible");
    });

    it("Updates existing sponsor image", () => {
        cy.get("input[value='edit']")
            .parent()
            .click();
        cy.wait(500);
        const imgPath = "sitecontent/sponsor1.png";
        cy.get(
            "#sponsor0_form > section > div.fileUploadField > input[type=file]"
        )
            .eq(0)
            .attachFile(imgPath)
            .trigger("change", { force: true });
        cy.get("#sponsor0_form > section > div.fileUploadField > button.uploadButton").click({ force: true });

        cy.get(
            '#sponsor0_form > section > div.fileUploadField > [data-test="upload-message"]'
        )
            .should("have.attr", "style", "color: green;")
            .invoke("text")
            .should("include", "uploaded successfully");
    });
    
    it("Adds new sponsor", () => {
        cy.get("input[value='edit']")
            .parent()
            .click();
        const imgPath = "sitecontent/sponsor3.png";
        cy.get("button[aria-label='Add sponsor']").click();
        cy.get(
            "#sponsor2_form > section > div.fileUploadField > input[type=file]"
        )
            .eq(0)
            .attachFile(imgPath)
            .trigger("change", { force: true });
        cy.get(
            "#sponsor2_form > section > div.fileUploadField > button.uploadButton"
        ).click({ force: true });
        cy.wait(500);
        cy.get("#s2_alt").type("Virginia Tech");
        cy.get("#s2_link").type("https://lib.vt.edu");
        cy.contains("Update Config").click();
        cy.contains("Sponsor 3").should("be.visible");
        cy.contains(
            "Source: https://img.cloud.lib.vt.edu/sites/images/iawa/sponsor3.png"
        ).should("be.visible");
        cy.contains("Alt text: Virginia Tech").should("be.visible");
        cy.contains("URL: https://lib.vt.edu").should("be.visible");
    })

    it("Removes new sponsor", () => {
        cy.get("input[value='edit']")
            .parent()
            .click();
        cy.get(
            "#sponsor2_form > section > button"
        ).click()
        cy.contains("Update Config").click();
        cy.wait(500);
        cy.contains("Sponsor 3").should("not.exist");
    })

    afterEach("User signout:", () => {
        cy.get("amplify-sign-out")
            .find(selectors.signOutButton, { includeShadowDom: true })
            .contains("Sign Out")
            .click({ force: true });
    })
});    

export const selectors = {
  usernameInput: '[data-test="sign-in-username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]',
  signOutButton: '[data-test="sign-out-button"]',
};
