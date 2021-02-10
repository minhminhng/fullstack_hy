import React from 'react'

const PersonForm = (props) => {
  return (
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input value={props.name} onChange={props.handleNameChange}/>
          <br />
          number: <input value={props.number} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">{props.text}</button>
        </div>
      </form>
  )
}

export default PersonForm