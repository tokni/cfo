/// <reference types="Cypress" />

context('End testing company CRUD...', () => {
  beforeEach(() => {
    localStorage.setItem('sub', process.env.REACT_APP_TEST_TOKEN)
  })
  describe('./Companies', () => {
    localStorage.setItem('sub', process.env.REACT_APP_TEST_TOKEN)
    it('Visits CFO on localhost', () => {
      cy.visit('http://localhost:3000/')
      cy.wait(200)
    })

    it('go to companies', () => {
      cy.get('[name="companies"]').click()
    })

    it('open and cancel modal', () => {
      cy.get('[name="addcompany"]').click()
      cy.get('[name="cancel"]').click()
    })

    it('open and submit modal', () => {
      cy.get('[name="addcompany"]').click()
      cy.get('[id="name"]').type('Company 1')
      cy.get('[name="submit"]').click()
    })

    it('find created customer', () => {
      cy.contains('Company 1')
    })
  })
})
