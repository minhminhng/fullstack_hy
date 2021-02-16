import axios from 'axios'
import React from 'react'
import personService from '../services/persons'

// Person name component
const Person = ( {name, number, delPerson, label} ) => {

  return (
    <tr>
      <td>{name}</td><td>{number}</td>
      <td><button onClick={delPerson}>{label}</button></td>
    </tr>
  )
}

// List of persons
const Persons = ( {persons, setPersons} ) => {
    const deletePerson = (id) => {
      const remainedPersons = persons.filter(p => p.id !== id)
      const person = persons.find(p => p.id === id)
      const result = window.confirm(`Delete ${person.name}?`)      
      if (result) {
        personService
          .deletePerson(id)
          .catch(error => {
            alert(``)
          })
        setPersons(remainedPersons)        
      }
    }
    
    return (
    <table>
        <tbody>          
          {persons.map(person =>
            <Person key={person.id} name={person.name} number={person.number} 
              delPerson={() =>deletePerson(person.id)} label="delete"/>
          )}          
        </tbody>
    </table>)
}

export default Persons
