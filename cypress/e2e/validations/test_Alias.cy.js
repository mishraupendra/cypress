// Cypress -- Spec file / Test File
/// <reference types='Cypress' />

    describe('Navigating to Web Application', function()
    {
    it('Navigate to URL', function()
    {
// test step1
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get('.search-keyword').type('ca')

// Using Aliasing
cy.get('.products').as('productLocator')
cy.get('@productLocator').find('.product').should('have.length',4)

// Aliasing at parent level
cy.get('@productLocator').find('.product').as('productItems')
// Display number of elements
cy.get('@productLocator').find('.product').then(function(elements){

    cy.log(elements.length)
    cy.log(elements.text())
})

// Aliasing at Child level
cy.get('@productItems').then(function(elements){
    cy.log(elements.length)
    cy.log(elements.text())
})

})
 
})