const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {  
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    // let blogObject = new Blog(helper.initialBlogs[0])
    // await blogObject.save()
    // blogObject = new Blog(helper.initialBlogs[1])
    // await blogObject.save()
    // blogObject = new Blog(helper.initialBlogs[2])
    // await blogObject.save()
    // blogObject = new Blog(helper.initialBlogs[3])
    // await blogObject.save()
    // blogObject = new Blog(helper.initialBlogs[4])
    // await blogObject.save()
    // blogObject = new Blog(helper.initialBlogs[5])
    // await blogObject.save()
  })

  describe('blogs return', () => {
    test('returned blogs as json', async () => {
    
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
      
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
      
    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
      
        const contents = response.body.map(r => r.content)
        expect(contents).toContain(
          helper.initialBlogs.title
      )
    })

    test('unique identifier is proper', async() => {
      const blogs = await helper.blogsInDb()
    
      const blogIDs = blogs.map(b => b.id)
    
      expect(blogIDs).toBeDefined()
    })
  })

  describe('blog manipulation', () => {
    test('a specific blog can be viewed', async () => {
      const blogsAtStart = await helper.blogsInDb()
    
      const blogToView = blogsAtStart[0]
    
      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    
      expect(resultBlog.body).toEqual(processedBlogToView)
    })
    
    test('a blog can be deleted', async() => {
      const blogsAtStart = await helper.blogsInDb()
    
      const blogToDelete = blogsAtStart[0]
    
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
      const blogsAtEnd = await helper.blogsInDb()
    
      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )
    
      const contents = blogsAtEnd.map(r => r.title)
    
      expect(contents).not.toContain(blogToDelete.title)
    })

    test('a blog can be edited', async() => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToChange = blogsAtStart[1]
      const updatedBlog = {        
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 10
      }
      await api
        .put(`/api/blogs/${blogToChange.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
        const blogsUpdated = await helper.blogsInDb()

        expect(blogsUpdated).toHaveLength(helper.initialBlogs.length)      
        expect(blogsUpdated[1].likes).toEqual(10)
    })
  })

  describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: "Hallo makeup",
        author: "Oma Phan",
        url: "https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12",
        likes: 7
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const blogAtEnd = await helper.blogsInDb()
      expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
      const contents = blogAtEnd.map(r => r.title)
      expect(contents).toContain(
        "Hallo makeup"
      )
    })
    
    test('blog without likes is added with 0 like', async () => {
      const newBlog = {
        title: "Hallo makeup",
        author: "Milla Nuusi",
        url: "https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12",
        __v: 0
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
    
      const blogsAtEnd = await helper.blogsInDb()
      const likes = blogsAtEnd.map(b => b.likes)
    
      expect(likes[helper.initialBlogs.length]).toEqual(0)
    })
    
    test('blog without title or url is not added', async () => {
      const newBlog = {
        title: "Hallo makeup",
        author: "Milla Nuusi",   
        __v: 0
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })
})

//********/ ?????????
// If this part is written in a separated test file, console will show 
// ReferenceError: You are trying to `import` a file after the Jest environment has been torn down

describe('when there is initially one user in db', () => {
  beforeEach(async() => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({username: 'root', passwordHash})

    await user.save()
    // await Promise.all(promiseArray)  
  })

  test('creation succeeds with a fresh username', async() => {
    const usersAtStart = await helper.usersInDb()
    // console.log(usersAtStart)

    const newUser = {
      username: 'malatha',
      name: 'Mi Ng',
      password: 'matkhau'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails when username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})