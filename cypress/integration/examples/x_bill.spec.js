/* eslint-disable no-unused-vars */
/// <reference types="Cypress" />

context('End testing bills ...', () => {
  beforeEach(() => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))
  })
  describe('./Bills', () => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))

    it('Visits CFO on localhost', () => {
      cy.visit('http://localhost:3000/')
      cy.wait(1000)
    })

    it('go to bills', () => {
      cy.get('[name="bills"]').click()
    })

    it('open and cancel modal', () => {
      cy.get('[name="addbill"]').click()
      cy.get('[name="cancel"]').click()
    })

    it('open and submit modal', () => {
      cy.get('[name="addbill"]').click()
    })

    it('Choose vendor', () => {
      cy.get(
        ':nth-child(2) > .MuiInputBase-root-222 > .MuiSelect-root-202 > .MuiSelect-select-203'
      ).click()
      cy.contains('FT and 5G').click()
    })

    it('Choose expense', () => {
      cy.get(
        ':nth-child(3) > .MuiInputBase-root-222 > .MuiSelect-root-202 > .MuiSelect-select-203'
      ).click()
      cy.contains('EL and gas').click()
    })

    it('Write description', () => {
      cy.get('#description').type('Hello, World...')
    })

    it('Set payment', () => {
      cy.get('#payment').type(325)
    })

    it('Choose tax', () => {
      cy.get(
        ':nth-child(6) > .MuiInputBase-root-222 > .MuiSelect-root-202 > .MuiSelect-select-203'
      ).click()
      cy.contains('øl').click()
    })

    it('Set created date', () => {
      cy.get('.MuiInputBase-root-222 > #tax').type('2019-06-22')
    })

    it('Set due date', () => {
      cy.get('#payment_due').type('2017-08-22')
    })

    it('Create bill', () => {
      cy.get('[name="submit"]').click()
    })

    it('find unpaid bill', () => {
      cy.contains('Name' && 'No')
    })

    it('open update modal', () => {
      cy.get('[name="update"]')
        .children()
        .click()
    })

    it('change payment due', () => {
      cy.get('#payment_due').type('2019-08-22')
    })

    it('submit update', () => {
      cy.get('[name="submit"]').click()
    })

    it('open and cancel', () => {
      cy.get('[name="paybill"]')
        .children()
        .click()

      cy.get('[name="cancel"]').click()
    })

    it('open pay bill', () => {
      cy.get('[name="paybill"]')
        .children()
        .click()
    })

    it('fill form', () => {
      cy.get('[id="type"]').type('Payment')

      cy.get(
        ':nth-child(3) > .MuiInputBase-root-222 > .MuiSelect-root-202 > .MuiSelect-select-203'
      ).click()
      cy.contains('Assets').click()

      cy.get(
        ':nth-child(4) > .MuiInputBase-root-222 > .MuiSelect-root-202 > .MuiSelect-select-203'
      ).click()
      cy.contains('Debts').click()
    })

    it('submit form', () => {
      cy.get('[name="submit"]').click()
    })

    it('find paid bill', () => {
      cy.contains('Name' && 'Yes')
    })

    it('pay bill should be gone', () => {
      cy.get('table tr')
        .children()
        .should('have.length', 21)
    })
  })
})
