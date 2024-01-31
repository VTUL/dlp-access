describe("admin_csvExport: Generates CSV files for items and collections", () => {
  before(() => {
    cy.signIn();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/siteAdmin");

    cy.get("#content-wrapper > div > div > ul")
      .find("li.CSVExport > a")
      .contains("CSV Export")
      .click();
    cy.url().should("include", "/siteAdmin");
    cy.wait(1000);
  });

  after(() => {
    cy.clearLocalStorageSnapshot();
    cy.clearLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Shows checkboxes for all items/collections and top level collections", () => {
    cy.contains("All items").should("be.visible");
    cy.contains(
      "Download CSV for all items in Alberta Pfeiffer Architectural Collection, 1929-1976 (Ms1988-017)"
    ).should("be.visible");
    cy.contains("Download CSV for all items in Demo collection").should(
      "be.visible"
    );
    cy.contains(
      "Download CSV for all items in Lorraine Rudoff Architectural Collection, 1950-1980 (Ms1990-025)"
    ).should("be.visible");
    cy.contains(
      "Download CSV for all items in Virginia Tech Insect Collection"
    ).should("be.visible");
    cy.contains("Download CSV for all collection records").should("be.visible");
  });

  it("Does not allow collections and items to be checked at the same time", () => {
    //checks all items box
    cy.get("input[value='allItems']").check({ force: true });
    cy.get("#csv_export :checked")
      .should("be.checked")
      .and("have.value", "allItems");

    //checks specific collections boxes
    cy.get("input[value='692555a6-c794-11ea-87d0-0242ac130003']").check({
      force: true
    });
    cy.get("input[value='ed924036-365e-11eb-adc1-0242ac120002']").check({
      force: true
    });
    cy.get("#csv_export :checked")
      .should("be.checked")
      .and("have.value", "692555a6-c794-11ea-87d0-0242ac130003");
    cy.get("input[value='ed924036-365e-11eb-adc1-0242ac120002']").should(
      "be.checked"
    );
    cy.get("input[value='allItems']").should("not.be.checked");

    //checks all collection box
    cy.get("input[value='allCollections']").check({ force: true });
    cy.get("#csv_export :checked")
      .should("be.checked")
      .and("have.value", "allCollections");
    cy.get("input[value='692555a6-c794-11ea-87d0-0242ac130003']").should(
      "not.be.checked"
    );
    cy.get("input[value='ed924036-365e-11eb-adc1-0242ac120002']").should(
      "not.be.checked"
    );
  });

  it("Generates a download link", () => {
    cy.contains("Generate CSV").click();
    cy.contains("Download CSV file").should("be.visible");
  });
});
