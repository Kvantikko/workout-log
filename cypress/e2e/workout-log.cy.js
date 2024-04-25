describe('Login and register functionality', function() {

  it('visit other website', function() {
    cy.visit('https://vaadin.com')
    cy.contains('The Web App Platform for Java Developers')
  })
})
