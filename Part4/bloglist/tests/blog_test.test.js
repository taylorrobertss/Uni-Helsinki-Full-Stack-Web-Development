const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let initBlog of helper.initialBlogs) {
        let blog = new Blog(initBlog)
        await blog.save()
    }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blog')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
    const response = await api.get('/api/blog')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

test('have a unique identifier named "id"', async () => {
    const response = await api.get('/api/blog')
    expect(response.body[0].id).toBeDefined();
  })

test('a valid blog can be added', async () => {
    const newBlog = {
        id: "549fk48848887fhhd67dd",
        title: "test blog",
        author: "Taylor S",
        url: "https://testing.ie",
        likes: 933,
        __v: 0
      }

    await api
      .post('/api/blog/')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain('test blog')
  })


test('all likes default to zero if missing', async () => {
    const newBlog = {
        id: "549fk48848887fhhd67dd",
        title: "test blog",
        author: "Taylor S",
        url: "https://testing.ie",
        __v: 0
    }

    await api
        .post('/api/blog/')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.every(n => n.likes)).toBeDefined()
})

test('ensure title and url property', async () => {
    const newBlogNoURL = {
        id: "549fk48848887fhhd67dd",
        title: "test blog",
        author: "Taylor S",
        url: "testing.com",
        likes: 56,
        __v: 0
    }

    const newBlogNoTitle = {
        id: "549fk48848887fhhd67dd",
        author: "Taylor S",
        url: "testing.com",
        likes: 56,
        __v: 0
    }
    await api
        .post('/api/blog/')
        .send(newBlogNoTitle)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/blog/')
        .send(newBlogNoURL)
        .expect(201)
        .expect('Content-Type', /application\/json/)
})

test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blog/${blogToDelete.id}`)
        .expect(204)

    const blogAtEnd = await helper.blogsInDb()

    expect(blogAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )
    const contents = blogAtEnd.map(r => r.content)
    expect(contents).not.toContain(blogToDelete.content)
})

test('updating a blog property', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const updateBlog = {
        id: blogsAtStart[0].id,
        likes: 2
    }

    await api
        .put(`/api/blog/${updateBlog.id}`)
        .send(updateBlog)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(2)
})

afterAll(async () => {
    await mongoose.connection.close()
})