// cypress/e2e/navbar.cy.js
describe('Navbar responsiveness', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('toggles mobile menu', () => {
    cy.viewport('iphone-6') // mobil

    cy.get('button[aria-label="Toggle menu"]').click()
    cy.contains('Home').should('be.visible')

    cy.get('button[aria-label="Toggle menu"]').click()
    cy.contains('Home').should('not.be.visible')
  })

  it('toggles dark mode', () => {
    cy.get('button[aria-label="Toggle menu"]').click()
    cy.contains(/dark mode/i).click()
    cy.get('html').should('have.class', 'dark')
  })
})
