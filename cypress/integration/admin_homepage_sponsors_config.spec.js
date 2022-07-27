describe("admin_homepage_sponsors_config: Update sponsors fields and revert", function () {
    before(() => {
        cy.signIn();
    });
    
    beforeEach(() => {
        cy.restoreLocalStorage();
        cy.visit("/siteAdmin");

        cy.get("#content-wrapper > div > div > ul")
            .find(":nth-child(4) > a")
            .contains("Homepage Config")
            .click();
        cy.url().should("include", "/siteAdmin");
    });

    after(() => {
        cy.clearLocalStorageSnapshot();
        cy.clearLocalStorage();
    });
    
    afterEach(() => {
        cy.saveLocalStorage();
    });

    it("Updates first sponsor URL", () => {
        cy.get("input[value='edit']")
            .parent()
            .click();
        cy.get("#s0_link")
            .clear()
            .type("https://lib.vt.edu/");
        cy.contains("Update Config").click();
        cy.contains("URL: https://lib.vt.edu/").should("be.visible");
    });

    it("Reverses update", () => {
        cy.get("input[value='edit']")
            .parent()
            .click();
        cy.get("#s0_link")
            .clear()
            .type("https://clir.org/");
        cy.contains("Update Config").click();
        cy.contains("URL: https://clir.org/").should("be.visible");
    });
    
    it("Adds new sponsor with image", () => {
        cy.get("input[value='edit']")
            .parent()
            .click();
        const imgPath = "sitecontent/sponsor4.png";
        cy.get("button[aria-label='Add sponsor']").click();
        cy.get(
            "#sponsor3_form > section > div.fileUploadField > input[type=file]")
            .eq(0)
            .attachFile(imgPath)
            .trigger("change", { force: true });
        cy.get(
            "#sponsor3_form > section > div.fileUploadField > button.uploadButton"
        ).click({ force: true });
        cy.get("#s3_alt").type("Virginia Tech");
        cy.get("#s3_link").type("https://vt.edu");
        cy.wait(3000);
        cy.contains("Update Config").click();
        cy.contains("Sponsor 4").should("be.visible");
        cy.contains(
            "Source: sponsors/sponsor4.png"
        ).should("be.visible");
        cy.contains("Alt text: Virginia Tech").should("be.visible");
        cy.contains("URL: https://vt.edu").should("be.visible");
    })

    it("Removes new sponsor", () => {
        cy.get("input[value='edit']")
            .parent()
            .click();
        cy.get(
            "#sponsor3_form > section > button").click()
        cy.contains("Update Config").click();
        cy.contains("Sponsor 4").should("not.exist");
    })
});
