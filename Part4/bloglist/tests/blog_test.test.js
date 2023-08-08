const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

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

        title: "test blog",
        author: "Taylor S",
        url: "https://testing.ie",
        likes: 933,

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


test('a blog without likes is 0', async () => {
    const newBlog = {
        title: "test blog",
        author: "Taylor S",
        url: "https://testing.ie",

    }

    await api
        .post('/api/blog/')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const length = blogsAtEnd.length

    expect(length).toBe(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[length - 1].likes).toBe(0)
})
test('a blog without title not added', async () => {
    const newBlog = {
        author: 'tay',
        url: 'https://www.tay.com/blog/',
        likes: 99
    }

    await api
        .post('/api/blog/')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
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

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })

    test('creation succeeds with a unique username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'taylorR',
        name: 'Taylor Roberts',
        password: 'password',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
    test('user without unique username is not created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            password: 'password ',
            name: 'Test'
        }

       const result =  await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')
        
        const usersAtEnd = await helper.usersInDb()
        
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
  })


afterAll(async () => {
    await mongoose.connection.close()
})