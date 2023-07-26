const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
  blogRouter.post('/', async(request, response) => {
    const body = request.body
    if (body.title && body.url) {
      const blog = new Blog(body)
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    }else{
      response.status(400).end()
    }
  })
  
  blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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