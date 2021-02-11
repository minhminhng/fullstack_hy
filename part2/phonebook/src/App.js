import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  /// Fetching data
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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