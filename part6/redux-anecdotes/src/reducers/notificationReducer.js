import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload
    }
  }
})

export const { setMessage } = notificationSlice.actions

export const setNotification = (props) => {
    return async dispatch => {
      dispatch(setMessage(props[0]))
      setTimeout(() => {      
       dispatch(setMessage(''))
      }, props[1] * 1000)  
    }  
}

export default notificationSlice.reducer