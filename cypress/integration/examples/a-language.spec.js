/* eslint-disable no-unused-vars */
/// <reference types="Cypress" />

context('Testing Language...', () => {
  beforeEach(() => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))
  })
  describe('Language', () => {
    it('Visits CFO on localhost', async () => {
      await cy.visit('http://localhost:3000/')
    })

    it('go to Overview', () => {
      cy.wait(6000)
      cy.get('[name="overview"]').click()
    })

    it('change to german', () => {
      cy.get('[name="de"]').click()
      cy.wait(500)
      cy.contains('Übersicht')
      cy.wait(100)
    })

    it('change to faroese', () => {
      cy.get('[name="fo"]').click()
      cy.wait(500)
      cy.contains('Yvirlit')
      cy.wait(100)
    })

    it('change to english', () => {
      cy.get('[name="en"]').click()
      cy.wait(500)
      cy.contains('Overview')
      cy.wait(100)
    })
  })
})
