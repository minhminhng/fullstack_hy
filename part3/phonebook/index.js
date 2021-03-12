require('dotenv').config()
const { json } = require('express')
const express = require('express')
const { format } = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.json()) // Activate json-parser
app.use(express.static('build'))
app.use(cors())

const morgan = require('morgan')
morgan.token('data', (req, res) => {
  if (req.method === "POST")
    return JSON.stringify(req.body)
  else
    return JSON.stringify()
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


// Get root
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
 })

// Get info
app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people.</p>
    <p>${Date()}</p>`)
})

// Get persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// Get person with id
app.get('/api/persons/:id', (request, response) => {

  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      }
      else {
        response.status(404).end()
      }  
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id'})
    })
})

// Delete person with id
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// Generate a random ID
const generateId = (max) => {
  const id = Math.floor(Math.random() * Math.floor(max))
  return id
}

// Post request
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  // const ind = persons.findIndex(person => 
  //   person.name.toLowerCase() === body.name.toLowerCase())

  // if (ind > -1) {
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})