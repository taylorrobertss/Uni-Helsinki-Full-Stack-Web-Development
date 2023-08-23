describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Tay Rob',
            username: 'tay',
            password: 'password'
          }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
      })


    
    it('login form is shown', function() {
      cy.contains('log in').click()
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('tay')
            cy.get('#password').type('password')
            cy.get('#login-button').click()
        
            cy.contains('Tay Rob logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('tay')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
        
            cy.contains('Login Failed, wrong credentials')
        })

  })

  describe('When logged in', function() {
    beforeEach(function() {
        cy.contains('log in').click()
        cy.get('#username').type('tay')
        cy.get('#password').type('password')
        cy.get('#login-button').click()
        // const blog = {
        //     title: 'Test blog',
        //     author: 'tay',
        //     url: 'www.test.com'
        //   }
        // cy.request('POST', 'http://localhost:3001/api/blog/', blog) 
        cy.visit("http://localhost:3000/");
    })

    it('A blog can be created', function() {
        cy.contains('Create blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('James Roberts')
        cy.get('#url').type('www.test.com')
        cy.get('#Create').click()
        cy.contains('a blog created by cypress - James Roberts')
    })

    it('A blog can be liked', function() {
        cy.contains('Create blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('James Roberts')
        cy.get('#url').type('www.test.com')
        cy.get('#Create').click()
        cy.contains('a blog created by cypress - James Roberts')
        cy.get('#view').click()
        cy.get('#like').click()
       
    })
  })

})