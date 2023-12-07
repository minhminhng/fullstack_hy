import loginService from '../services/login'
import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUsers, setUser } = userSlice.actions

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
    catch (exception) {
      dispatch(setNotification([1, exception.response.data.error, 5]))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch(setUser(null))
  }
}

export default userSlice.reducer