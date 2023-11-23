import React from 'react'

const Country = ({country, handleShow}) => {    
    return (
        <div >
            {country.name.common}
            {<button onClick={() => handleShow(country)} type='submit'>show</button>}
        </div>
    )
}


export default Country