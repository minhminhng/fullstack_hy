import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    fetchData()
  },[])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)    
    setResources(resources.concat(response.data))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
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