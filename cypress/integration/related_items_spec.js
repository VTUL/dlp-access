describe('Related items on archives page', () => {

    it('Related items section shows on the page', () => {
        cy.visit("http://localhost:3000/archive/pf59ds4d");
        cy.get('.related-items-wrapper')
    })

    it('Carousel populates when more than ten items in the item\'s subcollection', () => {
        cy.get('.slick-slide')
        .should('have.class', 'slick-active')
    })

    it("Carousel populates when less than 10 items in the item's subcollection, and more than 10 items in the parent's subcollections", () => {
        cy.visit("http://localhost:3000/archive/p0636w4x");
        cy.get(".slick-slide").should("have.class", "slick-active");
    });

    it('Carousel populates when less than 10 items in the item\'s subcollection, and less than 10 items in the parent\'s subcollections', () => {
        cy.visit("http://localhost:3000/archive/ft77nv3b");
        cy.get(".slick-slide").should('have.class', 'slick-active')
    })

    it("Carousel populates when less than 10 items in the entire collection", () => {
        cy.visit("http://localhost:3000/archive/0863k84a");
        cy.get(".slick-slide").should("have.class", "slick-active");
    });
})