/* eslint-disable no-unused-vars */
/// <reference types="Cypress" />

context('End testing vendor ...', () => {
  beforeEach(() => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))
  })
  describe('Vendor', () => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))
    it('Visits CFO on localhost', () => {
      cy.visit('http://localhost:3000/')
      cy.wait(1000)
    })

    it('go to vendor', () => {
      cy.get('[name="vendor"]').click()
    })

    it('open and cancel modal', () => {
      cy.get('[name="addvendor"]').click()
      cy.get('[name="cancel"]').click()
    })

    it('open and submit modal', () => {
      cy.get('[name="addvendor"]').click()
      cy.get('[id="name"]').type('FT')
      cy.get('[name="submit"]').click()
    })

    it('find created vendor', () => {
      cy.contains('FT')
    })

    it('update vendor', () => {
      cy.get('[name="update"]').click()
      cy.get('[id="name"]').type(' and 5G')
      cy.get('[name="submit"]').click()
    })

    it('find updated vendor', () => {
      cy.contains('FT and 5G')
    })

    // it('delete vendoor', () => {
    //   cy.get('[name="delete"]').click()
    //   cy.wait(2000)
    // })

    // it('customer deleted successfully', () => {
    //   cy.get('table tr')
    //     .children()
    //     .should('have.length', 0)
    // })
  })
})
