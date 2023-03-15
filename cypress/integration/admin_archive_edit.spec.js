describe("admin_archive_edit: Update item metadata and change it back", function() {
  before(() => {
    cy.signIn();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/siteAdmin").wait(1000);

    cy.get("li.updateArchive > a", { timeout: 2000 })
      .contains("Update Item")
      .click()
    cy.url().should("include", "/siteAdmin")

    cy.get("input.identifier-field")
      .clear()
      .type("Ms1990_025_Per_Ph_B001_F001_003_demo");
    cy.contains("Confirm").click().wait(1000);
  })

  after(() => {
    cy.clearLocalStorageSnapshot();
    cy.clearLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
 
  it("Unable to empty required metadata", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("div[class='required field']")
      .first()
      .find("textarea").clear().type("  ");
    cy.contains("Update Item Metadata").click();
    cy.contains("Please fill in the required field!").should('be.visible');
  })

  it("Update single-valued metadata", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("textarea[name='title']")
      .clear().type("New Title");
    cy.contains("Update Item Metadata").click();
    cy.contains("Title: New Title", { timeout: 5000 }).should('be.visible');
    cy.contains("View Item")
      .should('have.attr', 'href').and("include", "/archive/3h85z50c")
  })

  it("Change single-valued metadata back", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("textarea[name='title']")
      .clear().type("Unidentified building site, c. 1979. Photographs (Ms1990-025)");
    cy.contains("Update Item Metadata").click();
    cy.contains("Title: Unidentified building site, c. 1979. Photographs (Ms1990-025)").should('be.visible');
  })

  it("Can delete single-valued metadata", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("textarea[name='start_date']")
      .clear();
    cy.contains("Update Item Metadata").click();
    cy.contains("Start date:").should('not.exist');
  })

  it("Can add single-valued metadata", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("textarea[name='start_date']")
      .clear().type("1979/03/23");
      cy.contains("Update Item Metadata").click();
      cy.contains("Start date: 1979/03/23").should('be.visible');
  })

  it("Can delete multi-valued metadata", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("textarea[name='is_part_of_1']")
      .siblings(".deleteValue")
      .click();
    cy.contains("Update Item Metadata").click();
    cy.contains("Ms1990-025, Box 1, Folder 1").should('not.exist');
  })

  it("Can add multi-valued metadata", () => {
    cy.get("input[value='edit']").parent().click();
    cy.get("#is_part_of_add_value_button").click();
    cy.get("textarea[name='is_part_of_1']").should("have.value", "new is_part_of")
      .clear()
      .type("Ms1990-025, Box 1, Folder 1");
    cy.contains("Update Item Metadata").click();
    cy.contains("Ms1990-025, Box 1, Folder 1").should('be.visible');
  })

  it("Can change metadata using text editor", () => {
    cy.get("input[value='edit']").parent().click().wait(1000);
    cy.get("#description_0", { timeout: 10000 }).find(".ql-editor", { timeout: 10000 }).then($editor => {
      if(!$editor.length) {
        return
      }
      cy.wrap($editor).clear().type("Description field test");
      cy.contains("Update Item Metadata").click();
      cy.contains("Description field test").should('be.visible');
      cy.get("input[value='edit']").parent().click();
      cy.get("#description_0").find(".ql-editor").clear().type("Two photographs of an unidentified industrial building site");
      cy.contains("Update Item Metadata").click();
      cy.contains("Two photographs of an unidentified industrial building site").should('be.visible');
    } )
    
  })

});