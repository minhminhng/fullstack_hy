const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the arguments in format: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.n3omq.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,    
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
  return
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]   
})

person.save().then(result => {
  console.log(`added ${result.name} number ${result.number} to phonebook`)
  mongoose.connection.close()
})

// Person.find({ id: 1}).then(result => {
//     result.forEach(person => {
//         console.log(person)
//     })
//     mongoose.connection.close()
// })