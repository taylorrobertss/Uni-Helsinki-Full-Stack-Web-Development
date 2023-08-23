describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Taylor Rob',
      username: 'tay',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
  })


  it('front page can be opened',  function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })


  it('front page contains random text', function() {
    cy.contains('Browser can execute only JavaScript')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('user can login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('tay')
    cy.get('#password').type('password')
    cy.get('#login-button').click()

    cy.contains('tay logged in')
  })  
})

describe('when logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Taylor Rob',
      username: 'tay',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
    cy.contains('log in').click()
    cy.get('input:first').type('tay')
    cy.get('input:last').type('password')
    cy.get('#login-button').click()
  })

  it('a new note can be created', function() {
    cy.contains('new note').click()
    cy.get('input').type('a note created by cypress')
    cy.contains('save').click()
    cy.contains('a note created by cypress')
  })
})