describe('Blog app', function() {
  const user1 = {
      name: 'Mini',
      username: 'mini',
      password: 'keepmesecret'
  }

  const user2 = {
    name: 'Yo',
    username: 'yoon',
    password: 'AsANewUser'
  }

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function() {    
    cy.contains('blogs')    
  })

  it('Login form is shown'), function() {
    cy.get('#username').should('be.visible')
  }

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(user1.username)
      cy.get('#password').type(user1.password)
      cy.get('#login-button').click()
      cy.contains('Mini logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(user1.username)
      cy.get('#password').type('Nothin')
      cy.get('#login-button').click()      
      cy.get('.error').should('contain','Wrong credentials').and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Mini logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {      
      cy.login({ username: user1.username, password: user1.password })
    })

    it('a new blog can be created', function() {
      cy.contains('create new blog').click()      
      cy.get('input.blog-title').type('a blog created by cypress')
      cy.get('input.blog-url').type('https://www.google.com')      
      cy.get('#create-button').click()
      cy.contains('a blog created by cypress')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'no name',
          url: 'https://noname.com'
        })
        cy.createBlog({
          title: 'second blog',
          author: 'unknown name',
          url: 'https://google.com',
          likes: 10
        })
        cy.createBlog({
          title: 'third blog',
          author: 'unknown name',
          url: 'https://google.com'
        })
      })

      it('user can like a blog', function () {
        cy.contains('second blog')
          .contains('view').click()
        cy.contains('second blog')
          .contains('like').click()        
        cy.contains('second blog').find('#likes')
          .should('contain', '1')
      })

      describe('blog and its creator', function () {    
        beforeEach(function () {
          cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
          cy.login({ username: user2.username, password: user2.password })
          cy.createBlog({
            title: 'forth blog',
            author: 'Cong',
            url: 'https://noname.com'
          })
          cy.createBlog({
            title: 'fifth blog',
            author: 'Thang',
            url: 'https://google.com'
          })
        })

        it('creator can delete the blog', function () {          
          cy.contains('forth blog')
            .contains('view').click()
          cy.contains('forth blog')
            .contains('remove').click
          cy.should('not.contain', 'forth blog')
        })
    
        it('only creator can see the remove button', function () {
          cy.login({ username: user1.username, password: user1.password })
          cy.contains('forth blog')
            .contains('view').click()
            cy.contains('forth blog').should('not.contain', 'remove')
        })

        it('blogs are ordered from most likes', function () {          
          cy.get('.blog').eq(0).should('contain', 'second blog')
          cy.contains('forth blog')
            .contains('view').click()          
          cy.contains('forth blog').contains('like').click().click().click()
          cy.get('.blog').eq(1).should('contain', 'forth blog')
        })
      })
    })
  })  
})