describe('Login and register functionality', function() {

  const email = 'testaaja@mail.com'

  before(function() {
    cy.request('POST', 'http://localhost:8080/api/v1/testing/reset')
  })

  beforeEach(function() {
    cy.visit('http://localhost:5173/login')
  })

  it('login page can be opened', function() {
    cy.contains('WORKOUT LOG')
    cy.contains('Login')
  })

  it('register page can be opened', function() {
    cy.get('button:contains("Register")').click()
    cy.contains('Firstname')
    cy.contains('Lastname')
  })

  it('user can register and app is opened', function() {
    cy.get('button:contains("Register")').click()
    cy.get('#email').type(email)
    cy.get('#firstname').type('Tarja')
    cy.get('#lastname').type('Testaaja')
    cy.get('#password').type('salainen')
    cy.get('#passwordAgain').type('salainen')
    cy.get('button:contains("Register")').click()
    cy.contains('Hello Tarja!')
    cy.contains('Time to workout?')
  })

  it('user cant register with existing email', function() {
    cy.get('button:contains("Register")').click()
    cy.get('#email').type(email)
    cy.get('#firstname').type('Tarja')
    cy.get('#lastname').type('Testaaja')
    cy.get('#password').type('salainen')
    cy.get('#passwordAgain').type('salainen')
    cy.get('button:contains("Register")').click()
    cy.contains(`${email} is already taken`)
  })

  it('existing user can login', function() {
    cy.get('input:first').type('testaaja@mail.com')
    cy.get('#password').type('salainen')
    cy.get('#loginButton').click()
    cy.contains('Hello')
    cy.contains('Time to workout?')
  })
})

describe('Active Workout', function() {

  before(function() {
    cy.visit('http://localhost:5173/login')
    cy.get('input:first').type('testaaja@mail.com')
    cy.get('#password').type('salainen')
    cy.get('#loginButton').click()
  })

  it('workout section opens', function() {
    cy.contains('Hello')
    cy.contains('start a new workout', { matchCase: false }).click()
    //cy.contains('.MuiButtonBase-root', 'START A NEW WORKOUT')
    //cy.get('button:contains("START")').click()
    cy.contains('finish workout', { matchCase: false })
    cy.contains('cancel workout', { matchCase: false })
  })

})