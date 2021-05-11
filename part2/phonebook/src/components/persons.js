import React from 'react'
import personService from '../services/persons'

// Person name component
const Person = ( {name, number, onDelete, label} ) => {

  return (
    <tr>
      <td>{name}</td><td>{number}</td>
      <td><button onClick={onDelete}>{label}</button></td>
    </tr>
  )
}

// List of persons
const Persons = ( {persons, setPersons, msg, setMsg} ) => {
    const deletePerson = (id) => {
      const remainedPersons = persons.filter(p => p.id !== id)
      const person = persons.find(p => p.id === id)
      const result = window.confirm(`Delete ${person.name}?`)      
      if (result) {
        personService
          .deletePerson(id)
          .then(response => {
            setMsg([0,`Deleted ${person.name} from the list`])
            setTimeout(() => {
              setMsg(null)
            }, 3000)
          })
          .catch(error => {
            setMsg([1,`${person.name} no longer exists`])
            setTimeout(() => {
              setMsg(null)
            }, 3000)
          })
        setPersons(remainedPersons)        
      }
    }
    
    return (
    <table>
        <tbody>          
          {persons.map(person =>
            <Person key={person.id} name={person.name} number={person.number} 
              onDelete={() =>deletePerson(person.id)} label="delete"/>
          )}          
        </tbody>
    </table>)
}

export default Persons
