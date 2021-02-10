import React from 'react'

// Person name component
const Person = ({name, number}) => <tr><td>{name}</td><td>{number}</td></tr>

// List of persons
const Persons = ( {persons} ) => {
    return (
    <table>
        <tbody>          
          {persons.map(person =>
            <Person key={person.name} name={person.name} number={person.number}/>
          )}

          
        </tbody>
    </table>)
}


export default Persons
