require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.static('build'))
app.use(express.json()) // Activate json-parser
app.use(cors())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error:error.message })
  }
  next(error)
}

//----- HTTP -----
// Get root
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// Get info
app.get('/info', (request, response, next) => {
  Person.countDocuments().then(result => {
    response.send(`<p>Phonebook has info for ${result} people.</p>
    <p>${Date()}</p>`)
  })
    .catch(error => next(error)) 
})

// Get persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// Get person with id
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      }
      else {
        response.status(404).end()
      }  
    })
    .catch(error => next(error)) // Middleware
})

// Delete person with id
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(response.status(204).end())
    .catch(error => next(error))
})

// Post request - Add person to the database
app.post('/api/persons', (request, response, next) => {
  const body = request.body

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
    .catch(error => next(error))
})

// Put request - Update data
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true } )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//----- Middlewares -----
const morgan = require('morgan')
morgan.token('data', (req, res) => {
  if (req.method === 'POST')
    return JSON.stringify(req.body)
  else
    return JSON.stringify()
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

app.use(errorHandler)