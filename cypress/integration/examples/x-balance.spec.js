/* eslint-disable no-unused-vars */
/// <reference types="Cypress" />

context('End testing tax ...', () => {
  beforeEach(() => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))
  })
  describe('./Tax', () => {
    it('Visits CFO on localhost', () => {
      cy.visit('/balance')
      //   cy.server()
      //   cy.route('GET', '/balance')
      //   cy.contains('Unpaid')
    })

    it('later', () => {
      cy.get('[data-cy=title]')

      cy.wait(2500)
      cy.get('.chartjs-render-monitor').should('be.visible')
    })

    /**
     * GO TO BILLS AND PAY BILL
     */

    it('PAY BILL', () => {
      cy.visit('/bills')
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
      cy.contains('Yes' | 'Ja')
    })

    it('pay bill should be gone', () => {
      cy.get('table tr')
        .children()
        .should('have.length', 21)
    })
  })
})
