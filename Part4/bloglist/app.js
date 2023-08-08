const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const usersRouter = require('./controllers/users')
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const logger = require('./utils/logger')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

  app.use(cors())
  app.use(express.json())
  app.use(middleware.tokenExtractor)
  app.use('/api/blog', blogRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/login', loginRouter)
  app.use(middleware.unknownEndpoint)
  app.use(middleware.errorHandler)
 
  module.exports = app