import axios from "axios"
const baseBlogUrl = 'http://localhost:3003/api/blogs'
const baseUserUrl = 'http://localhost:3003/api/login'

let token = null
let config = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

export const login = async (credentials) => {
  const response = await axios.post(baseUserUrl, credentials)
  return response.data
}

export const getAll = () =>
  axios.get(baseBlogUrl).then(res => res.data)

export const createBlog = newObject =>
  axios.post(baseBlogUrl, newObject, config).then(res => res.data)

export const updateBlog = (object) =>
  axios.put(`${baseBlogUrl}/${object.id}`, object).then(res => res.data)

export const removeBlog = (id) => 
  axios.delete(`${baseBlogUrl}/${id}`, config).then(res => res.data)