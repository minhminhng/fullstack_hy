import { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logout } from './reducers/userReducer'

const App = () => {  
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => {
    return user
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable
      buttonLabelShow='create new blog'
      buttonLabelHide='cancel'
      ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {!user && (
        <LoginForm />
      )}

      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={() => dispatch(logout())}>
              logout
            </button>
          </p>
          {blogForm()}
        </div>
      )}

      <Blogs />
    </div>
  )
}

export default App
