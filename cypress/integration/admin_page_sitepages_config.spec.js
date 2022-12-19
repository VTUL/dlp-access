describe("admin_page_sitepages_config: Displays and updates sitepages configurations", () => {
  before(() => {
    cy.signIn();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/siteAdmin");

    cy.get("#content-wrapper > div > div > ul")
      .find(":nth-child(2) > a")
      .contains("Site Pages Config")
      .click();
    cy.url({ timeout: 2000 }).should("include", "/siteAdmin");
  });

  after(() => {
    cy.clearLocalStorageSnapshot();
    cy.clearLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe("admin_page_sitepages_config: Displays site pages fields", () => {
    it("Displays site pages fields", () => {
      cy.get("input[value='view']")
        .parent()
        .click();
      cy.contains("Page ID: terms", { timeout: 5000 }).should("be.visible");
      cy.contains("Page Type: PermissionsPage").should("be.visible");
      cy.contains("Assets:").should("be.visible");
      cy.contains("Page URL: /permissions").should("be.visible");
      cy.contains("Page Title: Permissions").should("be.visible");
      cy.contains("terms.html").should("be.visible");
    });
  });
    
  describe("admin_page_sitepages_config: Updates first page's ID and changes it back", () => {
    it("Updates site page's fields", () => {
      cy.get("input[value='edit']").parent().click();
      cy.get("input[name='terms_pageName']", { timeout: 5000 })
        .first()
        .clear()
        .type("testID");
      cy.contains("Update Site").click();
      cy.contains("Page ID: testID ", { timeout: 2000 }).should("be.visible");
    })
  
    it("Reverses update", () => {
      cy.get("input[value='edit']")
        .parent()
        .click();
      cy.get("input[name='testID_pageName']", { timeout: 2000 })
        .first()
        .clear()
        .type("terms");
      cy.contains("Update Site").click();
      cy.contains("Page ID: terms", { timeout: 2000 }).should("be.visible");
    });
  });

  describe("admin_page_sitepages_config: Uploads files successfully", () =>{
    it("Uploads asset file", () => {
      cy.get("input[value='edit']").parent().click();
      const docPath = "sitecontent/PubPermission.doc";
      cy.get("input#terms_assets").attachFile(docPath).trigger('change', { force: true });
      cy.get("button#terms_assets_button")
        .click({ force: true });
      cy.wait(3000);
      cy.get('#file_upload_results_message', { timeout: (10 * 1000) })
        .should('have.attr', 'style', 'color: green;')
        .invoke("text")
        .should("include", "uploaded successfully");
    });
    it("Uploads HTML file", () => {
      cy.get("input[value='edit']").parent().click();
      const dataPath = "sitecontent/about1.html";
      cy.get("input#terms_dataURL").attachFile(dataPath).trigger('change', { force: true });
      cy.get("button#terms_dataURL_button")
        .click({ force: true });
      cy.wait(3000);
      cy.get('#file_upload_results_message', { timeout: (10 * 1000) })
        .should('have.attr', 'style', 'color: green;')
        .invoke("text")
        .should("include", "uploaded successfully");
      cy.contains("Current HTML file: about1.html").should("be.visible");
      cy.get("#terms_useDataUrl").parent().should("have.class", "checked");
    })
  })

  describe("admin_page_sitepages_config: Can use text editor", () =>{
    it("Can edit page content using text editor", () => {
      cy.get("input[value='edit']").parent().click();
      cy.get("#terms_openEditor").click();
      cy.wait(3000);
      cy.get(".ql-editor").click().type(" Testing123");
      cy.get("button").contains("Save").click();
      cy.get("input[value='edit']").parent().click();
      cy.get("#terms_openEditor").click();
      cy.wait(3000);
      cy.contains("Testing123").should("be.visible");
      cy.get(".ql-editor").click().type("{end}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}");
      cy.contains("Testing123").should("not.be.visible");
      cy.get("button").contains("Save").click();
    })
  })
});