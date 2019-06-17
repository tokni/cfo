/* eslint-disable no-unused-vars */
/// <reference types="Cypress" />

context('End testing day book ...', () => {
  beforeEach(() => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))
  })
  describe('./DayBook', () => {
    it('Visits CFO on localhost', async () => {
      await cy.visit('http://localhost:3000/')
      cy.wait(1000)
    })

    it('go to daybook', () => {
      cy.wait(1000)
      cy.get('[name="daybook"]').click()
    })

    it('find created tax at rate 25%', () => {
      cy.contains('325')
    })
  })
})
