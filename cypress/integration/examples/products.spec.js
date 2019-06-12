/// <reference types="Cypress" />

context('Testing products CRUD...', () => {
  beforeEach(() => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))

  })
  describe('./Products', () => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))

    it('Visits CFO on localhost', () => {
      cy.visit('http://localhost:3000/')
      cy.wait(1000)
    })

    it('go to products', () => {
      cy.get('[name="products"]').click()
    })

    it('open and cancel modal', () => {
      cy.get('[name="addproduct"]').click()
      cy.get('[name="cancel"]').click()
    })

    it('open and submit modal', () => {
      cy.get('[name="addproduct"]').click()
      cy.get('[id="name"]').type('milk')
      cy.get('[name="submit"]').click()
    })

    it('find created product', () => {
      cy.contains('milk')
    })

    it('update product', () => {
      cy.get('[name="update"]').click()
      cy.get('[id="name"]').type(' and rainbows')
      cy.get('[name="submit"]').click()
    })

    it('find updated product', () => {
      cy.contains('milk and rainbows')
    })

    // it('delete product', () => {
    //   cy.get('[name="delete"]').click()
    // })

    // it('customer deleted successfully', () => {
    //   cy.get('table tr')
    //     .children()
    //     .should('have.length', 0)
    // })
  })
})
