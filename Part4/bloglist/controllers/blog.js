const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
  
  blogRouter.post('/', async(request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token invalid or missing' })
    }
    const user = await User.findById(decodedToken.id)

 
    if (body.title && body.url) {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
      })

      if (blog.likes === undefined) {
        Object.assign(blog, { likes: 0 });
      }

      const savedBlog = await blog.save()
      
      user.blog = user.blog.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)

    }else{
      response.status(400).end()
    }
  })
  
  blogRouter.delete('/:id', async (request, response, next) => {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing" })
      }
  
      const blog = await Blog.findById(request.params.id)
  
      if (blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end() 
      } 
      else {
        return response
          .status(401)
          .json({error: "Blog can only be deleted by creating user"})
      }
    } catch (exception) {
      next(exception)
    }

  })


  blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      likes: body.likes,
      url: body.url
    }
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      response.json(updatedBlog.toJSON())
    } catch(exception) {
      next(exception)
    }
  })

  module.exports = blogRouter