import { useEffect, useState } from 'react'
import React from 'react'
import Country from './Country'
import CountryInfo from './CountryInfo'

const Countries = ({countries, handleShow}) => {
    const [country, setCountry] = useState([])

    const length = countries.length
    
    if (length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    else if (length < 10 & length >1 ) {
        return (
            <div >
                {countries.map(country => <Country key={country.cca3} country={country} handleShow={handleShow}/>)}
            </div>
        )
    }
    else if (length === 1) {
        return (
            <CountryInfo country={countries[0]}/>
        )
    }
    else {
        return (
            <div>No country matches the criteria</div>
        )
    }
}

export default Countries