const express = require('express')
const app = express()
app.use(express.json())
let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
  ]
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${Object.keys(persons).length} people</p> <p> ${Date()}</p>`)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(persons => persons.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
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
  
    if (!body.name || !body.number ) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    if(persons.map(n => n.name).includes(body.name)){
        return response.status(400).json({ 
            error: 'Name must be unique' 
          })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
    
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)