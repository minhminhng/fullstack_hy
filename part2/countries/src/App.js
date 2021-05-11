import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ selectedCountry, setSelect ] = useState({})
  const [ newFilter, setFilter ] = useState('')
  const [ show, setShow ] = useState(false)

  /// Fetching data
  useEffect(() => {
    // console.log('countries effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // console.log(response.data)
        setCountries(response.data)
      })   
  }, [])


  ///Handle filter value changed
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShow(false)
  }

  // Handle show change
  const handleShowChange = (value) => {
    setShow(true)  
  }

  const handleSelectedChange = (value) => {
    setSelect(value)
  }

  const countriesToShow = show 
    ? selectedCountry
    : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    
    <div>
      <h2>Countries</h2>
      <Filter value={newFilter} handleFilterChange={handleFilterChange} />     
      <Countries countries={countriesToShow} showChange={handleShowChange} show={show} selected={selectedCountry} selectChange={handleSelectedChange} />      
    </div>
  )
}


export default App