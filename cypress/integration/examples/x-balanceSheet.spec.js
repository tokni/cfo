/* eslint-disable no-unused-vars */
/// <reference types="Cypress" />

context('End testing Balance Sheet ...', () => {
  beforeEach(() => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))
  })
  describe('./BalanceSheet', () => {
    it('Visits CFO on localhost', async () => {
      await cy.visit('http://localhost:3000/')
      cy.wait(1000)
    })

    it('go to balancesheet', () => {
      cy.get('[name="balancesheet"]').click()
    })

    it('Show current balance sheet', () => {
      cy.get('[name="currentbalance"]').click()
      cy.get('#select-dropdown').click()
      cy.get('[name="show"]').click()
      cy.get('[name="submit"]').click()
    })

    it('find total of 325 twice', () => {
      cy.get('[name="total"]').should('have.length', 2)
      cy.get('[name="total"]').contains(/(Gesamt|Samantalt|Total)\s:\s[235]{3}/)
    })
  })
})
