/* eslint-disable no-unused-vars */
/// <reference types="Cypress" />

context('End testing customers CRUD...', () => {
  beforeEach(() => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))
  })
  describe('./Customer', () => {
    it('Visits CFO on localhost', async () => {
      await cy.visit('http://localhost:3000/')
      cy.wait(200)
    })

    it('go to customers', () => {
      cy.wait(6000)
      cy.get('[name="customers"]').click()
    })

    it('open and cancel modal', () => {
      cy.get('[name="addcustomer"]').click()
      cy.get('[name="cancel"]').click()
    })

    it('open and submit modal', () => {
      cy.get('[name="addcustomer"]').click()
      cy.get('[id="name"]').type('John')
      cy.get('[name="submit"]').click()
    })

    it('find created customer', () => {
      cy.contains('John')
    })

    it('update customer', () => {
      cy.get('[name="update"]').click()
      cy.get('[id="name"]').type(' Doe')
      cy.get('[name="submit"]').click()
    })

    it('find updated customer', () => {
      cy.contains('John Doe')
    })
  })
})
