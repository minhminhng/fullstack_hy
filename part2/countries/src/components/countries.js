import React, { useState, useEffect } from 'react'
import BtnShow from './showbutton'
import axios from 'axios'

// Country name component
const Country = ( {name} ) => {
    return (        
            <td>{name}</td>            
    )
}

// Language component
const Language = ( {name} ) => <li>{name}</li>

// Languages component
const Languages = ( {languages} ) => {
    return (
        <ul>
            {languages.map(language =>
                <Language key={language.name} name={language.name} />)}
        </ul>
    )
}

// Flag component
const Flag = ( {flag} ) => <img src={flag} width="200"/>

const Weather = ( {city, temperature, icon, wind_speed, wind_dir } ) => {
    return (
        <div>
            <h2>Weather in {city}</h2>
            <div><b>temperature</b> {temperature}</div>
            <img src={icon} />
            <div><b>wind</b> {wind_speed} mph direction {wind_dir}</div>
        </div>
    )
}

// Country information component
const CountryInfor = ( {country} ) => {
    const [ weather, setWeather ] = useState({})
    const [ loc, setLocation ] = useState('')

    const params = {
        access_key: 'a54dd213ab1ee86de093d4a13ae12358',
        query: country.name
    }
    console.log('url  http://api.weatherstack.com/current', {params})
      
    /// Fetching data
    axios
      .get(`http://api.weatherstack.com/current?access_key=${params.access_key}&query=${country.name}`)
      .then(response => {
          const apiResponse = response.data.location.name
          console.log(apiResponse)
          setLocation(apiResponse)
          console.log(loc)
        //setWeather(apiResponse)
        
      })

    return (
        <div>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <Languages languages={country.languages} />
            <Flag flag={country.flag} />
            {/* <Weather city={weather.name} 
                temperature={weather.current.temperature} 
                icon={weather.current.weather_icons}
                wind_speed={weather.current.wind_speed}
                wind_dir={weather.current.wind_dir} /> */}
        </div>
    )
}

// List of countries
const Countries = ( props ) => {
    const countries = props.countries 
    const [ selected, setSelect] = useState()

    // Handle clicking button show
    const handleShowClick = (name) => {
        props.showChange(true) // change the state on the parent
        setSelect(countries.find(country => country.name === name))  
    }
    
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    else if (countries.length < 1) {
        return <div>No country found</div>
    }
    else if (countries.length === 1) {
        return <CountryInfor country={countries[0]} />
    }
    else if (props.show) {
        return <CountryInfor country={selected} />
    }    
    else {
        return (
        <table>
            <tbody>          
            {countries.map(country => {
                return( 
                    <tr key={country.name}>
                        <Country name={country.name}/>
                        <td><BtnShow handleClick={() => handleShowClick(country.name)} text = "show"/></td>
                    </tr>
                )}
            )}          
            </tbody>
        </table>)
    }
}


export default Countries
