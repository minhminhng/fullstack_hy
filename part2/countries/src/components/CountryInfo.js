import React, { useState, useEffect } from 'react'
import weatherService from '../services/weatherService'

const Language = ({name}) => <li>{name}</li>

const Flag = ( {flag} ) => <img src={flag.png} alt={flag.alt} width="200"/>

const Weather = ({info}) => {   
    const icon = info.weather[0].icon
    const iconLink = `https://openweathermap.org/img/wn/${icon}@2x.png`
    return (
        <div>
            <h2>Weather in {info.name}</h2>
            <div>temperature {info.main.temp} Celcius</div>
            <img src={iconLink} width="200"/>
            <div>wind {info.wind.speed} m/s</div>
        </div>
    )
}

const CountryInfo = ({country}) => {
    const capitalInfo = country.capitalInfo.latlng
    const languages = Object.values(country.languages)
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService
        .getWeather(capitalInfo)
        .then(data => {
            setWeather(data)
        })
        .catch(error =>
            console.log('Error: ', error)
        )
    },[])

    if (!weather) {
        return null
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <h2>languages</h2>
            <ul>               
                {languages.map(language => (<Language key={language} name={language}/>))}
            </ul>
            <Flag flag={country.flags} />
            <Weather info={weather}/>
        </div>
    )
}

export default CountryInfo