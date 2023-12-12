import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'

import { logout } from './reducers/userReducer'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {  
  const dispatch = useDispatch()
  const { user, users, blogs } = useSelector(({ user, users, blogs }) => ({ user, users, blogs }))

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable
      buttonLabelShow='create new blog'
      buttonLabelHide='cancel'
      ref={blogFormRef}>
      <BlogForm ref={blogFormRef} />
    </Togglable>
  )

  const padding = {
    paddingRight: 5
  }

  const matchBlog = useMatch('/blogs/:id')
  const selectedBlog = matchBlog
    ? blogs.find(b => b.id === matchBlog.params.id) : null

  const matchUser = useMatch('/users/:id')
  const selectedUser = matchUser
    ? users.find(u => u.id === matchUser.params.id) : null

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user && 
          <span>
          {user.name} logged in
            <button onClick={() => dispatch(logout())}>
              logout
            </button>
        </span>}
      </div>
      <Notification />
      
      {!user && (
        <LoginForm />
      )}

      {user && (
        <div>          
          {!selectedBlog && blogForm()}
        </div>
      )}

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog blog={selectedBlog}/>} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={selectedUser} />} />
      </Routes>

    </div>
  )
}

export default App
