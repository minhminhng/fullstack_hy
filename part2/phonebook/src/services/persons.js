import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = personObj => {
    const request = axios.post(baseUrl, personObj)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    console.log(`deleting ${baseUrl}/r${id}...`)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, personObj) => {
    console.log(``)
    const request = axios.put(`${baseUrl}/${id}`, personObj)
    return request.then(response => response.data)
}

export default {
    getAll,
    addPerson,
    deletePerson,
    update
}