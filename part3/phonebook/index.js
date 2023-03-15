const express = require('express')
const app = express()
app.use(express.static('build'))

const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
app.use(cors())

const Person = require('./models/phonebook')


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
  
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(express.json())
  app.use(requestLogger)
  morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
  app.use(morgan(':method :url :body') )
  
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

  app.get('/api/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${Object.keys(persons).length} people</p> <p> ${Date()}</p>`)
  })

  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    person = persons.filter(persons => persons.id !== id)
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log("inside post")
    if (!body.name || !body.number ) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
     }
    // if(persons.map(n => n.name).includes(body.name)){
    //     return response.status(400).json({ 
    //         error: 'Name must be unique' 
    //       })
    // }
   
    const person = new Person({
      name: body.name,
      number: body.number,
      // id: generateId(),
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    
  })

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })