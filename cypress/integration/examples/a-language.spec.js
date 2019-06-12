/// <reference types="Cypress" />

context('Testing Language...', () => {
  beforeEach(() => {
    localStorage.setItem('sub', process.env.REACT_APP_TEST_TOKEN)
  })
  describe('Language', () => {
    localStorage.setItem('sub', process.env.REACT_APP_TEST_TOKEN)
    it('Visits CFO on localhost', () => {
      cy.visit('http://localhost:3000/')
      cy.wait(100)
    })

    it('go to Overview', () => {
      cy.get('[name="overview"]').click()
    })

    it('change to german', () => {
      cy.get('[name="de"]').click()
      cy.wait(300)
      cy.contains('Übersicht')
    })

    it('change to faroese', () => {
      cy.get('[name="fo"]').click()
      cy.wait(300)
      cy.contains('Yvirlit')
    })

    it('change to english', () => {
      cy.get('[name="en"]').click()
      cy.wait(300)
      cy.contains('Overview')
    })
  })
})
