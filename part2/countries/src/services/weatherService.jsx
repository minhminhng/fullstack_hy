import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5'
const iconUrl =  'https://openweathermap.org/img/wn'
const API_key = import.meta.env.VITE_API_KEY

const getWeather = (info) => {
    console.log(API_key)
    const request = axios.get(`${baseUrl}/weather?lat=${info[0]}&lon=${info[1]}&appid=${API_key}`)
    return request.then(response => response.data)
}

export default {
    getWeather
}