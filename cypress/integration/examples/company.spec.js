/// <reference types="Cypress" />

context('End testing company CRUD...', () => {
  beforeEach(() => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))
  })
  describe('./Companies', () => {
    localStorage.setItem('sub', Cypress.env('REACT_APP_TEST_TOKEN'))
    it('Visits CFO on localhost', () => {
      cy.visit('http://localhost:3000/')
      cy.wait(1000)
    })

    it('go to companies', () => {
      cy.get('[name="companies"]').click('center')
    })

    it('open and cancel modal', () => {
      cy.get('[name="addcompany"]').click('center')
      cy.get('[name="cancel"]').click('center')
    })

    // it('open and submit modal', () => {
    //   cy.get('[name="addcompany"]').click('center')
    //   cy.get('[id="name"]').type('Company 1')
    //   cy.get('[name="submit"]').click('center')
    // })

    it('find created company', () => {
      cy.contains('Company 1')
    })
  })
})
