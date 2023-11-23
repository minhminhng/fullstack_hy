const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const { initialUsers, initialBlogs, blogsInDb, usersInDb, nonExistingId } = require('./test_helper')
let authHeader

describe('blog api', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const user = initialUsers[0]

    await api.post('/api/users').send(user)

    const response = await api.post('/api/login').send(user)
    authHeader = `Bearer ${response.body.token}`
  })

  describe('blog api', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})

      const blogObjects = initialBlogs
        .map(blog => new Blog(blog))

      const promiseArray = blogObjects.map(blog => blog.save())
      await Promise.all(promiseArray)
    })

    describe('some blogs are saved initially', () => {
      test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })

      test('all blogs have field id', async () => {
        const blogsAtEnd = await blogsInDb()
        const blogIDs = blogsAtEnd.map(blog => blog.id)
        expect(blogIDs).toBeDefined()
      })

      test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
      })

      test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)
        expect(contents).toContain(
          'Go To Statement Considered Harmful'
        )
      })
    })

    describe('view a blog', () => {
      test('a specific blog can be viewed', async () => {
        const blogsAtStart = await blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
          .get(`/api/blogs/${blogToView.id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        expect(resultBlog.body).toEqual(blogToView)
      })

      test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await nonExistingId()

        await api
          .get(`/api/blogs/${validNonexistingId}`)
          .expect(404)
      })

      test('fails with statuscode 400 if id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
          .get(`/api/blogs/${invalidId}`)
          .expect(400)
      })
    })

    describe('adding a new blog', () => {
      test('a valid blog can be added', async () => {
        const newBlog = {
          title: 'Savoury day',
          author: 'Linh Trang',
          url: 'http://savourydays.com/'
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .set('Authorization', authHeader)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsInDb()
        const titles = blogsAtEnd.map(r => r.title)

        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
        expect(titles).toContain(
          newBlog.title
        )
      })

      test('has 0 likes initially if value is not provided', async () => {
        const newBlog = {
          title: 'Savoury days',
          author: 'Linh Trang',
          url: 'http://savourydays.com/'
        }

        const addedBlog = await api
          .post('/api/blogs')
          .send(newBlog)
          .set('Authorization', authHeader)

        expect(addedBlog.body.likes).toEqual(0)
      })

      test('a blog without title is not added', async () => {
        const newBlog = {
          title: '',
          author: 'Linh Trang',
          url: 'http://savourydays.com/'
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .set('Authorization', authHeader)
          .expect(400)

        const blogsAtEnd = await blogsInDb()

        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
      })

      test('a blog without url is not added', async () => {
        const newBlog = {
          title: 'Savoury days',
          author: 'Linh Trang',
          url: ''
        }

        await api
          .post('/api/blogs')
          .set('Authorization', authHeader)
          .send(newBlog)
          .expect(400)

        const blogsAtEnd = await blogsInDb()

        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
      })
    })
  })

  describe('modification', () => {
    let id
    beforeEach(async () => {
      await Blog.deleteMany({})

      const blog = initialBlogs[0]
      const response = await api
        .post('/api/blogs')
        .set('Authorization', authHeader)
        .send(blog)

      id = response.body.id
    })
    describe('update a blog', () => {
      test('a blog can be updated by creator', async () => {
        const blogsAtStart = await blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const likes = blogToUpdate.likes
        blogToUpdate.likes = 100

        await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send(blogToUpdate)
          .set('Authorization', authHeader)

        const blogsAtEnd = await blogsInDb()
        const updatedBlog = blogsAtEnd[0]
        expect(updatedBlog.likes).toEqual(blogToUpdate.likes)
        expect(updatedBlog.likes).not.toEqual(likes)
      })

    })

    describe('a blog', () => {
      test('can be deleted with valid token', async () => {
        const blogsAtStart = await blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(204)
          .set('Authorization', authHeader)

        const blogsAtEnd = await blogsInDb()

        expect(blogsAtEnd).toHaveLength(0)
      })

      test('cannot be deleted without valid authentication', async () => {
        const blogsAtStart = await blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(401)

        const blogsAtEnd = await blogsInDb()

        expect(blogsAtEnd).toHaveLength(1)
      })

      test('cannot be deleted by a different creator', async () => {
        const blogsAtStart = await blogsInDb()
        const blogToDelete = blogsAtStart[0]
        const user = { username: 'Alex', password: 'goodtoknow' }
        const response = await api.post('/api/login').send(user)
        authHeader = `Bearer ${response.body.token}`
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(401)
          .set('Authorization', authHeader)

        const blogsAtEnd = await blogsInDb()

        expect(blogsAtEnd).toHaveLength(1)
      })
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})