import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  /// Fetching data
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  /// Adding a new person to the database list
  const addPerson = (event) => {
    event.preventDefault()
    const index = persons.findIndex(p => p.name.toLowerCase() == newName.toLocaleLowerCase())
    if (!/\S/.test(newName)) {
      // If text field is empty
      window.alert('Please add a name') 
    } 
    else if (!/\S/.test(newNumber)){
      // If text field is empty
      window.alert('Please add a phone number') 
    } 
    else if (index !== -1) {
      const result = window.confirm(`${persons[index].name} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        const personObj = {
          name: persons[index].name,
          number: newNumber
        }
        personService
          .update(persons[index].id, personObj)
          .then(updatedPerson => {            
            let newList = [...persons]
            newList[index] = {...newList[index], number: updatedPerson.number}
            setPersons(newList)
            setNewName('')
            setNewNumber('')
          })
        
      }
    }
    else{
      const personObj = {
        name: newName,
        number: newNumber
      }
      personService
        .addPerson(personObj)
        .then(personList => {
          setPersons(persons.concat(personList))
          setNewName('')
          setNewNumber('')
        })      
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
      <Persons persons={personsToShow} setPersons={setPersons}/>      
    </div>
  )
}

export default App