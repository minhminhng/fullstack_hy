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
const Flag = ( {country} ) => <img src={country.flag} alt={country.name} width="200"/>

const Weather = ( {city, temperature, icon, description, wind_speed, wind_dir } ) => {
    return (
        <div>
            <h2>Weather in {city}</h2>
            <div><b>temperature</b> {temperature} &#8451;</div>
            <img src={icon} alt={description}/>
            <div><b>wind</b> {wind_speed} mph direction {wind_dir}</div>
        </div>
    )
}

// Country information component
const CountryInfor = ( {country, city, weather} ) => {
    
    return (
        <div>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>Spoken languages</h2>
            <Languages languages={country.languages} />
            <Flag country={country} />
            <Weather city={city} 
                temperature={weather.temperature} 
                icon={weather.weather_icons}
                description={weather.weather_descriptions}
                wind_speed={weather.wind_speed}
                wind_dir={weather.wind_dir} />
        </div>
    )
}

// List of countries
const Countries = ( props ) => {
    const countryList = props.countries
    const [ selectedCountry, setSelect ] = useState()
    const [ weather, setWeather ] = useState({})
    const [ loc, setLocation ] = useState()    
    const api_key = process.env.REACT_APP_API_KEY

    // Handle clicking button show
    const handleShowClick = (name) => {       
        setSelect(countries.filter(country => country.name === name))                        
    }

    useEffect(() => {          
        if (selectedCountry != null){
            const name = selectedCountry[0].name
            const params = {
                access_key: api_key,
                query: name.replace(/\s/g, '')
            }
            axios
            //   .get(`http://api.weatherstack.com/current?${params}`)
              .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${name.replace(/\s/g, '')}`)
              .then(response => {
                //   console.log(response.data)
                // console.log(response.data.location.name)
              setLocation(response.data.location.name)
              console.log(response.data.current)
              setWeather(response.data.current)            
            })
            props.showChange(true) // set show after set the country otherwise, selectedCountry is not defined for the 1st run
        }              
    }, [selectedCountry])
    
    // if (countryList.length === 1) {       
    //     console.log(countryList[0])
    //     setSelect(countryList[0])    
    //         // return <CountryInfor country={countries[0]} city={loc} weather={weather}/>
    // }

    const countries = props.show 
        ? selectedCountry
        : countryList

    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    else if (countries.length < 1) {
        return <div>No country found</div>
    }    
    else if (props.show) {
        return <CountryInfor country={countries[0]} city={loc} weather={weather}/>
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
                    </tr>)
                })
            }          
            </tbody>
        </table>)
    }
}


export default Countries
