const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    {
        _id: '64c146fd07432e9a13ea3d2b',
        title: "How to knit Aran Sweaters",
        author: "1334444",
        url: "https://www.sweatershop.com/blog/ultimate-guide-aran-sweater",
        likes: 123,
        __v : 0
    },


  ]

  const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
  }
