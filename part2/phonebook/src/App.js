import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/Personform'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/notification'

const App = () => {
  const [ persons, setPersons ] = useState([])   
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ msg, setMsg ] = useState(null)

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
            setMsg([0, `Updated phone number for ${updatedPerson.name}`])
            setTimeout(() => {
              setMsg(null)
            }, 5000)
          })
          .catch(error => {
            setMsg([1,`${persons[index].name} no longer exists`])
            setTimeout(() => {
              setMsg(null)
            }, 3000)
          }) 
      }
      else {
        setNewName('')
        setNewNumber('')
      }
    }
    else{
      const personObj = {
        name: newName,
        number: newNumber
      }
      personService
        .addPerson(personObj)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
          setMsg([0,`Added ${addedPerson.name} to the list`])
          setTimeout(() => {
            setMsg(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data)
          setMsg([1, `${error.response.data.error}`])
          setTimeout(() => {
            setMsg(null)
          }, 5000)
        })
    }    
  }

  // Handler when name field changed
  const handleNameChange = (event) => {
    setNewName(event.target.value)
    const index = persons.findIndex(p => p.name.toLocaleLowerCase() == newName.toLocaleLowerCase())
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
  : persons.filter(person => person.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={msg} />
      <Filter filterName={filterName} value={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      
      <PersonForm text="add" onSubmit={addPerson} name={newName} number={newNumber} 
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      
      <h3>Numbers</h3>
      <Persons persons={personsToShow} setPersons={setPersons} msg={msg} setMsg={setMsg}/>      
    </div>
  )
}

export default App