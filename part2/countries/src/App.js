import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Countries from './components/countries'
import Filter from './components/filter'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setFilter ] = useState('')
  const [ show, setShow ] = useState(false)

  /// Fetching data
  useEffect(() => {
    console.log('countries effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
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
    setShow(value)  
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(newFilter))

  return (
    
    <div>
      <h2>Countries</h2>
      <Filter value={newFilter} handleFilterChange={handleFilterChange} />     
      <Countries countries={countriesToShow} showChange={handleShowChange} show={show}/>      
    </div>
  )
}

export default App