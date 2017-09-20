describe('Homepage', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000/')
    cy.get('h1').should('contain', 'Job Opportinites')
  })
})

describe('Login', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('h1').should('contain', 'WTCSB EMPLOYMENT PORTAL')
  })
  it('lets you sign in', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[type=email]').type(`test@test.com`)
    cy.get('input[type=password]').type(`test123`)
    cy
      .get('button')
      .contains('Login')
      .click()
    cy.url().should('include', 'dashboard')
  })
})
