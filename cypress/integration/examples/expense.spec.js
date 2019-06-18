/* eslint-disable no-unused-vars */
/// <reference types="Cypress" />

context('End testing expence CRUD ...', () => {
  beforeEach(() => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))
  })
  describe('./Expense', () => {
    it('Visits CFO on localhost', () => {
      cy.visit('/expense')
      cy.wait(1000)
    })

    // it('go to expence', () => {
    //   cy.wait(6000)
    //   cy.get('[name="expense"]').click()
    // })

    it('open and cancel modal', () => {
      cy.get('[name="addexpense"]').click()
      cy.get('[name="cancel"]').click()
    })

    it('open and submit modal', () => {
      cy.get('[name="addexpense"]').click()
      cy.get('[id="name"]').type('EL')
      cy.get('[name="submit"]').click()
    })

    it('find created expense', () => {
      cy.contains('EL')
    })

    it('update expense', () => {
      cy.get('[name="update"]').click()
      cy.get('[id="name"]').type(' and gas')
      cy.get('[name="submit"]').click()
    })

    it('find updated expense', () => {
      cy.contains('EL and gas')
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
