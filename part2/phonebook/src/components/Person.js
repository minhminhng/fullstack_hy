import React from 'react'

const Person = ({person, handleDelete}) => {
    return (
        <div >{person.name} {person.number}
            <button onClick={() => handleDelete(person)} type='submit'>delete</button>
        </div>
    )
}


export default Person