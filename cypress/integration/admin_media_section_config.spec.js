const linkText = "https://lib.vt.edu/";
const mediaEmbedText = '<iframe src="https://www.youtube.com/embed/8fswmAtvCqI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
const titleText = "Welcome to the University Libraries at Virginia Tech";
const textText = "The University Libraries play an essential role in furthering Virginia Tech’s mission as a global land-grant university by providing a diversity of resources to produce, disseminate, use, share and sustain data and information.";

describe("admin_media_section_config: Displays and updates media section configurations", () => {
  before(() => {
    cy.signIn();
  });
  
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/siteAdmin");

    cy.get("#content-wrapper > div > div > ul")
      .find(":nth-child(8) > a")
      .contains("Homepage media section")
      .click();
    cy.url({ timeout: 2000 }).should("include", "/siteAdmin");
  })

  after(() => {
    cy.clearLocalStorageSnapshot();
    cy.clearLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe("admin_media_section_config: Displays media section fields", () => {
    it("Displays media section fields", () => {
      cy.get("input[value='view']")
        .parent()
        .click();
      
      cy.get('span.link-value', { timeout: 2000 })
        .should("not.be.empty")
        .should("be.visible");

      cy.get('span.media-embed-value', { timeout: 2000 })
        .should("not.be.empty")
        .should("be.visible");

      cy.get('span.title-value', { timeout: 2000 })
        .should("not.be.empty")
        .should("be.visible");

      cy.get('span.text-value', { timeout: 2000 })
        .should("not.be.empty")
        .should("be.visible");

    });
  });
    
  describe("admin_media_section_config: Updates title and changes it back", () => {
    it("Updates media section-title", () => {
      cy.get("input[value='view']")
        .parent()
        .click();
      cy.get("input[value='edit']").parent().click();
      cy.get("input[name='title']", { timeout: 2000 })
        .clear()
        .type("Test title");
      cy.get("button.submit").contains("Update Config").click();
      cy.contains("Title: Test title", { timeout: 2000 }).should("be.visible");
    });
  
    it("Reverses update", () => {
      cy.get("input[value='edit']")
        .parent()
        .click();
      cy.get("input[name='title']", { timeout: 2000 })
        .clear()
        .type(titleText);
      cy.get("button.submit").contains("Update Config").click();
      cy.contains(titleText, { timeout: 2000 }).should("be.visible");
    });
  });

  describe("admin_media_section_config: Doesn't render media section if no values present", () => {
    it("Clears values and doesn't render section", () => {
      cy.get("input[value='edit']").parent().click();
      cy.get("#clear-values").click();
      cy.get("button.submit").contains("Update Config").click();

      cy.visit("/");
      cy.get("div.media-section-wrapper", { timeout: 2000 }).should('not.exist');
      cy.visit("/siteAdmin");
    });
  });

  describe("admin_media_section_config: Renders media section if values present", () => {
    it("Adds values back and renders section", () => {
      cy.get("input[value='edit']")
        .parent()
        .click();
      cy.get("input[name='link']", { timeout: 2000 })
        .clear()
        .type(linkText);
      cy.get("textarea[name='mediaEmbed']", { timeout: 2000 })
        .clear()
        .type(mediaEmbedText);
      cy.get("input[name='title']", { timeout: 2000 })
        .clear()
        .type(titleText);
      cy.get("textarea[name='text']", { timeout: 2000 })
        .clear()
        .type(textText);
      cy.get("button.submit").contains("Update Config").click();


      cy.visit("/");
      cy.get("div.media-section-wrapper", { timeout: 2000 }).should("be.visible");
      cy.visit("/siteAdmin");
    });
  });
});