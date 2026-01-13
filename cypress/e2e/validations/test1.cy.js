// Cypress -- Spec file / Test File
///// <reference types='Cypress' />

    describe('Navigating to Web Application', function()
    {
    it('Navigate to URL', function()
    {
// test step1
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get('.search-keyword').type('ca')

// Here we are targetting list of elements and asserting the condition (4 elements)
// Use of :Visible - this locates only visible elements on webpage 
    cy.get('div.product:visible').should('have.length',4)

// Prent- Child chaining (get(Products- Parent), find(Product- Child)
    cy.get('.products').find('.product').should('have.length',4)

// Selecting a element from list of elements
// Method-1
    cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()

    

// Method-2 - Directly clicking on button
   cy.get(':nth-child(2) > .product-action > button').click()
   
  

// Method-3 - Locating element('Text') and then adding
// use of .each
   cy.get('.products').should('be.visible')
   cy.get('.products').find('.product').should('have.length.at.least', 1)
   
   cy.get('.products').find('.product').each(($e1, index, $list) => {
    const vegName = $e1.find('h4.product-name').text()
        if(vegName.includes('Cashews')){
            
            $e1.find('button').click()
        } 
   })
  
   


})
 
})