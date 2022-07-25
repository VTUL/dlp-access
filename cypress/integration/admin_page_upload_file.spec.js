describe("admin_page_upload_file: Upload Site Content test", () => {
  before(() => {
    cy.signIn();
  });
  
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/siteAdmin");

    cy.get("#content-wrapper > div > div > ul")
      .find(":nth-child(3) > a")
      .contains("Upload Site Content")
      .click();
    cy.url().should("include", "/siteAdmin");
  })

  after(() => {
    cy.clearLocalStorageSnapshot();
    cy.clearLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
 
  describe("admin_page_upload_file: Upload an HTML file", () => {
    it("Displays successful upload and stores it in S3", () => {
      const htmlPath = "sitecontent/about1.html"
      cy.get("input[type=file]").eq(0).attachFile(htmlPath).trigger('change', { force: true });
      cy.get("form > div > button")
        .click({ force: true });
      cy.get('[data-test="upload-message"]', { timeout: 5000 })
        .should('have.attr', 'style', 'color: green;')
        .invoke("text")
        .should("include", "uploaded successfully");
    })
  })

  describe("admin_page_upload_file: Upload an image file", () => {
    it("displays successful upload", () => {
      const imgPath = "sitecontent/cover_image1.jpg"
      cy.get("input[type=file]").eq(0).attachFile(imgPath).trigger('change', { force: true });
      cy.get("form > div > button")
        .click({ force: true });
        
      cy.get('[data-test="upload-message"]', { timeout: 5000 })
        .should('have.attr', 'style', 'color: green;')
        .invoke("text")
        .should("include", "uploaded successfully");
    })
  })

  describe("admin_page_upload_file: Upload a file other than image or HTML type", () => {
    it("displays error message", () => {
      const filePath = "sitecontent/test.txt"
      cy.get("input[type=file]").eq(0).attachFile(filePath).trigger('change', { force: true });
              
      cy.get('[data-test="upload-message"]', { timeout: 5000 })
        .should("have.attr", "style", "color: red;")
        .invoke("text")
        .should("equal", "Please upload image or HTML file only!!");
    })
  })
});