describe("admin_collectionpage_filter_sort_config: Displays and updates browse collections page configurations", () => {
  before(() => {
    cy.signIn();
  });
  
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/siteAdmin");

    cy.get("#content-wrapper > div > div > ul")
      .find(":nth-child(6) > a")
      .contains("Browse Collections Page")
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

  describe("admin_collectionpage_filter_sort_config: Displays filter and sort fields", () => {
    it("Displays filter field", () => {
      cy.get("input[value='view']")
        .parent()
        .click();
      cy.contains("Filter Field: subject").should("be.visible");
      cy.contains("Values:").should("be.visible");
      cy.contains("All").should("be.visible");
    });

    it("Displays sort fields", () => {
      cy.get("input[value='view']")
        .parent()
        .click();
      cy.contains("Sort Field: title").should("be.visible");
      cy.contains("Sort Direction: asc").should("be.visible");
      cy.contains("Sort Field: title").should("be.visible");
      cy.contains("Sort Direction: desc").should("be.visible");
      cy.contains("Sort Field: start_date").should("be.visible");
      cy.contains("Sort Direction: desc").should("be.visible");
    });
  });

  describe("admin_collectionpage_filter_sort_config: Updates filter's value and changes it back", () => {
    it("Updates filter's value", () => {
      cy.get("input[value='edit']").parent().click();
      cy.get("input[name='filter_value_2']")
        .first()
        .clear()
        .type("Infrastructure");
      cy.contains("Update Filter and Sort Fields").click();
      cy.contains("Infrastructure").should("be.visible");
    })

    it("Reverses update", () => {
      cy.get("input[value='edit']").parent().click();
      cy.get("input[name='filter_value_2']")
        .first()
        .clear()
        .type("Architecture");
      cy.contains("Update Filter and Sort Fields").click();
      cy.contains("Infrastructure").should("not.be.visible");
      cy.contains("Architecture").should("be.visible");
    });
  });

  describe("admin_collectionpage_filter_sort_config: Adds filter's value and removes it", () => {
    it("Adds filter's value", () => {
      cy.get("input[value='edit']").parent().click();
      cy.contains("Add Value").first().click();
      cy.get("input[name='filter_value_6']")
        .first()
        .clear()
        .type("Infrastructure");
      cy.contains("Update Filter and Sort Fields").click();
      cy.contains("Infrastructure").should("be.visible");
    })

    it("Removes the added filter value", () => {
      cy.get("input[value='edit']").parent().click();
      cy.get("#content-wrapper > div > div > div > form > section:nth-child(1) > fieldset > ul > li:nth-child(7)", {timeout: 3000})
        .contains("X")
        .click();
      cy.contains("Update Filter and Sort Fields").click();
      cy.contains("Infrastructure").should("not.be.visible");
    });
  });

  describe("admin_collectionpage_filter_sort_config: Adds a new sort field and removes it", () => {
    it("Adds a new sort field", () => {
      cy.get("input[value='edit']").parent().click();
      cy.get("select").select("identifier (asc)");
      cy.contains("Add New Sort Field").click();
      cy.contains("Update Filter and Sort Fields").click();
      cy.contains("Sort Field: identifier").should("be.visible");
    })

    it("Removes the newly added sort field", () => {
      cy.get("input[value='edit']").parent().click();
      cy.get("#content-wrapper > div > div > div > form > ul > section:nth-child(4)")
        .contains("Delete Sort Field")
        .click();
      cy.contains("Update Filter and Sort Fields").click();
      cy.contains("Sort Field: identifier").should("not.be.visible");
    });
  });
});