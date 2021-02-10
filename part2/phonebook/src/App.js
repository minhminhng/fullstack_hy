import React, { useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    {name: 'Arto Hellas', number: '040-8374238'},
    {name: 'Ani Helos', number: '040-8374348'},
    {name: 'Amy Niemi', number: '050-8373238'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  /// Handle add a new person to list
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name == newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } 
    else if (!/\S/.test(newName)) {
      // If text field is empty
      window.alert('Please add a name') 
    } 
    else if (!/\S/.test(newNumber)){
      // If text field is empty
      window.alert('Please add a phone number') 
    } 
    else
    {
      const personObj = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
    }    
  }

  // Handler when name field changed
  const handleNameChange = (event) => {
    setNewName(event.target.value)  
  }
  
  /// Handler when number field changed
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterName = (event) => {
    if (/\S/.test(newFilter)) {
      setShowAll(false)
    } 
    else {
      setShowAll(true)
    }
  }
  ///Handle filter value changed
  const handleFilterChange = (event) => {
    setFilter(event.target.value)          
  }

  const personsToShow = showAll 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} value={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      
      <PersonForm text="add" onSubmit={addPerson} name={newName} number={newNumber} 
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      
      <h3>Numbers</h3>
      <Persons persons={personsToShow}/>      
    </div>
  )
}

export default App