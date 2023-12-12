import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import blogReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    blogs: blogReducer,
    notification: notificationReducer
  }
})

export default store