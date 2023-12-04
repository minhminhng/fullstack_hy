import { useState, useEffect } from 'react'
import countryService from "../services/countryService"

export const useCountry = (name) => {
  const [ country, setCountry ] = useState({ found: false, data: null })

  useEffect(() => {
    if (name !== '') {
      countryService
        .getCountry(name)
        .then(res => {    
          if (res) {
            setCountry({ found: true, data : {
              name:res.name.common,
              capital:res.capital,
              population:res.population,
              flag:res.flags.png }
            })
          }
          else {
            setCountry({found: false})
          }
        })
        .catch(error => {
          console.log('Error: ', error)
          setCountry({found: false})
        })
      }
      else {
        setCountry(null)
      }
    },[name])

  return country
}  

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    name,
    value,
    onChange
  }
}