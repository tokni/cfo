/* eslint-disable no-unused-vars */
/// <reference types="Cypress" />

context('Testing Language...', () => {
  beforeEach(() => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))
  })
  describe('Language', () => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))
    it('Visits CFO on localhost', () => {
      cy.visit('http://localhost:3000/')
      cy.wait(1000)
    })

    it('go to Overview', () => {
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
