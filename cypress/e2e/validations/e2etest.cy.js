describe('navigate to Website, add items and checkout',function(){

    it('Navigates to Website',function(){

        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('be')
        cy.wait(2000)

        cy.get('.products').find('.product').as('itemList')
        cy.get('@itemList').each(($lst, index, $list) => {

            const item = $lst.find('h4.product-name').text()
            if(item.includes('Strawberry') || (item.includes('Raspberry'))){
                    cy.wrap($lst).find('button').click()

            }            
        })
       cy.get('.cart-icon > img').click()
       cy.get('p.product-name:visible').each(($el, index, $list) => {

        const productName = $el.text()
            if(productName.includes('Strawberry')){
                cy.log('Strawberry is present in the cart')
            }
            else if(productName.includes('Raspberry')){
                    cy.log('Raspberry is present in the cart')
            }
       })

       // Checkout steps - moved outside the loop
       cy.contains('button', 'PROCEED TO CHECKOUT').click()
       cy.contains('button', 'Place Order').click()
       cy.wait(2000)

       cy.get('select').select('India')
       
// Screenshot Syntax       
    //    cy.screenshot('order-summary')
       cy.get('.chkAgree').click()

       cy.get('button').click()

   })
})
