import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState:[],
  reducers: {    
    changeLikes(state, action) {
      const changedBlog = action.payload      
      return state.map(blog => blog.id !== changedBlog.id ? blog : changedBlog).sort((b1, b2) => b2.likes - b1.likes)
    },    
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload.sort((b1, b2) => b2.likes - b1.likes)
    },
    removeBlog(state, action) {
      const removedBlog = action.payload
      return state.filter(blog => blog.id !== removedBlog).sort((b1, b2) => b2.likes - b1.likes)
    },
    updateComment(state, action) {
      const commentedBlog = action.payload
      return state.map(blog => blog.id !== commentedBlog.id ? blog : commentedBlog)
    }
  }
})

export const { changeLikes, appendBlog, setBlogs, removeBlog, updateComment } = blogSlice.actions
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = newBlog => {
  return async dispatch => {
    try {
      const blog = await blogService.create(newBlog)
      dispatch(appendBlog(blog))
      dispatch(setNotification([0, `Added '${blog.title}' by ${blog.author}`, 10]))
    }
    catch (exception) {
      console.log(exception)
      dispatch(setNotification([1, exception.response.data.error, 5]))
    }
  }
}

export const incLikes = (blog) => {
  return async dispatch => {
    try {
      const changedBlog = await blogService.update(blog.id, blog)
      dispatch(changeLikes(changedBlog))
    }
    catch (exception) {
      dispatch(setNotification([1, exception.response.data.error, 5]))
    }
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    try {
      const commentedBlog = await blogService.createComment(id, {comment})
      dispatch(updateComment(commentedBlog))
    }
    catch (exception) {
      console.log(exception)
      dispatch(setNotification([1, exception.response.data.error, 5]))
    }
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    try {
      await(blogService.remove(id))
      dispatch(removeBlog(id))
    }
    catch (exception) {
      const data = exception.response.data.error
      if (data) {
        dispatch(setNotification([1, exception.response.data.error, 5]))
      }
      else {
        dispatch(setNotification([1, exception.message, 5]))
      }
    }
  }
}
export default blogSlice.reducer