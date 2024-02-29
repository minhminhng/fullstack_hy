import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const addPerson = (event) => {
    event.preventDefault()
    const ind = persons.findIndex(p => p.name.toLowerCase() === newName.toLowerCase())

    if (newName !== ''){
      if (ind > -1) {
        if (newNumber !== persons[ind].number)
        {
          if (window.confirm(`Do you want to change phone number for ${persons[ind].name}`)) {
            const updatedPerson = {
              name: persons[ind].name,
              number: newNumber    
            }
            const newList = [...persons]
            newList[ind] = updatedPerson
            personService
              .update(persons[ind].id, updatedPerson)
              .then(returnedPerson => 
                setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson ))
              )
          }
        }      
      }
      else{
        const newPerson = {
          name: newName,
          number: newNumber
        }        
        personService
          .create(newPerson)
          .then(returnedNote => {
            setPersons(persons.concat(returnedNote))
            setMsg([0,`Added ${newPerson.name}`])
            setTimeout(() => {
              setMsg(null)
            }, 5000)
          })
          .catch(error => {            
            setMsg([1, error.response.data.error])          
            setTimeout(() => {
              setMsg(null)
            }, 5000)
          })
        } 
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (person) =>{  
    if (window.confirm(`Do you want to delete ${person.name} from the list`)) {
        personService    
        .deletePerson(person.id)
        .then(result =>
          setPersons(persons.filter(p => p.id !== person.id))
        )
        .catch(error => {
          setMsg([1, `${person.name} has already been deleted from the server`])          
          setTimeout(() => {
            setMsg(null)
          }, 5000)
      })
    }  
  }

  const personsToShow = filter === '' ? persons : persons.filter(p => p.name.toLowerCase().includes(filter))

  return (
    <div>
      <h1>Phonebook</h1> 
      <Notification message={msg}/>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App