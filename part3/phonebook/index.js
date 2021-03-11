const { json } = require('express')
const express = require('express')
const { format } = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json()) // Activate json-parser
app.use(cors())

const morgan = require('morgan')
morgan.token('data', (req, res) => {
  if (req.method === "POST")
    return JSON.stringify(req.body)
  else
    return JSON.stringify()
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "01065064",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "059-64-591984",
    "id": 2
  },
  {
    "name":"Dan Abromod",
    "number":"12-43-24352",
    "id":3
  },
  {
    "name": "Mary Poppendieck",
    "number": "010-26-19672",
    "id": 4
  },
  {
    "name": "Jenny Harrison",
    "number": "020-63-79298",
    "id": 7
  },
  {
    "name": "Dan Abromod",
    "number": "31-498-64",
    "id": 8
  },
  {
    "name": "Ali Skd",
    "number": "136-43-4634",
    "id": 9
  }
]

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
  response.json(persons)
})


// Get person with id
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }  
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

  const ind = persons.findIndex(person => 
    person.name.toLowerCase() === body.name.toLowerCase())

  if (ind > -1) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(100),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})