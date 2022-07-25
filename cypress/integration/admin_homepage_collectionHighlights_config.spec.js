describe("admin_homepage_collectionHighlights_config: Update collection highlights fields and revert", function () {
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

    it("Updates first item title", () => {
        cy.get("input[value='edit']")
            .parent()
            .click();
        cy.get("#highlight0_title")
            .clear()
            .type("Sketches");
        cy.contains("Update Config").click();
        cy.contains("Title: Sketches").should("be.visible");
    });

    it("Reverses update", () => {
        cy.get("input[value='edit']")
            .parent()
            .click();
        cy.get("#highlight0_title")
          .clear()
          .type("Travel sketches by IAWA architects");
        cy.contains("Update Config").click();
        cy.contains("Title: Travel sketches by IAWA architects").should("be.visible");
    });
   
    it("Adds new item with image", () => {
        cy.get("input[value='edit']")
            .parent()
            .click();
        const imgPath = "sitecontent/highlight4.jpg";
        cy.get("button[aria-label='Add a collection highlight']").click();
        cy.get("#collectionHighlight3_form > section > div.fileUploadField > input[type=file]")
            .eq(0)
            .attachFile(imgPath)
            .trigger("change", { force: true });
        cy.get(
          "#collectionHighlight3_form > section > div.fileUploadField > button.uploadButton"
        ).click({ force: true });
        cy.get("#highlight3_title").type("New Highlight");
        cy.get("#highlight3_link").type(
          "/search?q=building&view=gallery"
        );
        cy.get("#highlight3_count").type("5");
        cy.wait(5000);
        cy.contains("Update Config").click();
        cy.contains("Collection Highlight 4").should("be.visible");
        cy.contains(
          "highlights/highlight4.jpg"
        ).should("be.visible");
        cy.contains("Title: New Highlight").should("be.visible");
        cy.contains("Link: /search?q=building&view=gallery").should(
          "be.visible"
        );
    })

    it("Removes new item", () => {
        cy.get("input[value='edit']")
            .parent()
            .click();
        cy.get("#collectionHighlight3_form")
          .contains("Remove highlight")
          .click();
        cy.contains("Update Config").click();
        cy.contains("Collection Highlight 4").should("not.exist");
    })
});
