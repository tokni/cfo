/// <reference types="Cypress" />

context('End testing invoice ...', () => {
  beforeEach(() => {
    localStorage.setItem('sub', process.env.REACT_APP_TEST_TOKEN)
  })
  describe('./Invoice', () => {
    localStorage.setItem('sub', process.env.REACT_APP_TEST_TOKEN)
    it('Visits CFO on localhost', () => {
      cy.visit('http://localhost:3000/')
      cy.wait(1000)
    })

    it('go to invoice', () => {
      cy.get('[name="invoice"]').click()
    })

    it('open and cancel modal', () => {
      cy.get('[name="addinvoice"]').click()
      cy.get('.MuiDialog-container-353').click('bottomRight')
    })

    it('open and submit modal', () => {
      cy.get('[name="addinvoice"]').click()
    })

    it('Choose customer', () => {
      cy.get(
        ':nth-child(1) > .MuiInputBase-root-222 > .MuiSelect-root-202 > #select-kundi1'
      ).click()
      cy.contains('John Doe').click()
    })

    it('Write fa number', () => {
      cy.get(
        'form > :nth-child(3) > .MuiFormControl-root-180 > .MuiInputBase-root-222 > .MuiInputBase-input-232'
      )
        .click()
        .type('fa-0001')
    })

    it('Add #1 product', () => {
      cy.get('#select-Product1').click()
      cy.contains('milk and rainbows').click()

      cy.get('#quantity').type(22)

      cy.get('#price').type(5)

      cy.get(
        '.Form-container-405 > .MuiButtonBase-root-278 > .MuiButton-label-253'
      ).click()

      cy.contains('110')
    })

    it('Set created date', () => {
      cy.get(
        ':nth-child(11) > .MuiInputBase-root-222 > .MuiInputBase-input-232'
      ).type('2019-06-22')
    })

    it('Set due date', () => {
      cy.get(
        ':nth-child(15) > .MuiInputBase-root-222 > .MuiInputBase-input-232'
      ).type('2019-07-22')
    })

    it('Write description', () => {
      cy.get('#description').type('We accept YEN')
    })

    it('Select account', () => {
      cy.get(
        ':nth-child(21) > .MuiInputBase-root-222 > .MuiSelect-root-202 > #select-kundi1'
      ).click()
      cy.contains('Konta 1')
      cy.contains('Income').click()

      cy.contains('Betri')
      cy.contains('9181-300.200.5')
      cy.contains('Bank Nordic')
    })

    it('Submit', () => {
      cy.get(
        '.MuiGrid-grid-lg-5-76 > .MuiPaper-root-110 > .MuiFab-root-340'
      ).click()
    })
  })
})

// remove item
//   cy.get(
//     'form > .MuiTable-root-380 > .MuiTableBody-root-399 > .MuiTableRow-root-382 > :nth-child(4)'
//   )
//     .children()
//     .click()
//   cy.wait(300)

//   cy.get(
//     'form > .MuiTable-root-380 > .MuiTableHead-root-381 > .MuiTableRow-root-382 > :nth-child(1)'
//   ).click()

//   cy.get(
//     '.MuiTableRow-root-382 > :nth-child(4) > .MuiButtonBase-root-278'
//   ).click()

// add #2 product
//   cy.get('#select-Product1').click({ force: true })
//   cy.contains('milk and rainbows').click({ force: true })
//   cy.get('#quantity').type(10)
//   cy.get('#price').type(500)

//   cy.get(
//     '.Form-container-405 > .MuiButtonBase-root-278 > .MuiButton-label-253'
//   ).click()
