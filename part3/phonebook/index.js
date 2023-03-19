const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
app.use(express.static('build'))


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
  
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }

 
  morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
  app.use(morgan(':method :url :body') )

  app.use(cors())
  app.use(express.json())
  app.use(requestLogger)
  app.use(express.static('build'))



  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })
app.get("/api/info", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      const date = new Date().toLocaleString();
      const number = persons.length;
      response.send(`
      <h2>Phonebook has entries for ${number} people.</h2>
      <h3>${date}</h3>`);
    })
    .catch((error) => next(error));
});

  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
   
  })

  app.delete('/api/persons/:id', (request, response, next) => {
    console.log(request.params.id)
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
    // const id = Number(request.params.id)
    // person = persons.filter(persons => persons.id !== id)
    // response.status(204).end()
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  app.post('/api/persons', (request, response, next) => {
    const body = request.body
    console.log("inside post")
    // if (!body.name || !body.number ) {
    //   return response.status(400).json({ 
    //     error: 'content missing' 
    //   })
     //}
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
    .catch(error => next(error))
    
  })

  app.put('/api/persons/:id', (request, response, next) =>{
   // const body = request.body
    const { name, number } = request.body
    // const person = {
    //   name: body.name,
    //   number: body.number,
    // }
  
    Person.findByIdAndUpdate(
      request.params.id, 
      { name, number },
      { new: true, runValidators: true, context: 'query' }
    ) 
      .then(updatePerson => {
        response.json(updatePerson)
      })
      .catch(error => next(error))
   })
  app.use(unknownEndpoint)
  app.use(errorHandler)

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })