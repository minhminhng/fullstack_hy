import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [notiMsg, setNotiMsg] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    try {
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNotiMsg([0,`a new blog \'${returnedBlog.title}\' by ${returnedBlog.author} is added`])
          setTimeout(() => {
            setNotiMsg(null)
            }, 5000)
        })
    } catch (exception) {
      setErrorMsg([1, exception])
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }    
  }

  // Handle user login
  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMsg([1, 'Wrong username or password'])
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  // Handle user logout
  const handleLogout = async (event) => {
    event.preventDefault()
    // console.log('logging out', username)

    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      setUser(null)
    } catch (exception) {
      setErrorMsg([1, 'Wrong credentials'])
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h1>login to application</h1>            
          <Notification message={errorMsg} />   
          <LoginForm handleSubmit={handleLogin} 
              username={username} 
              handleUsernameChange={({target}) => setUsername(target.value)}
              password={password} 
              handlePasswordChange={({target}) => setPassword(target.value)}/>            
    </div>
  )

  const createBlogForm = () => (
    <Togglable buttonLabel='create new blog'>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )
    
  return (
    <div>      
      {user === null ?
        loginForm() :
        <div>
          <h1>Blogs</h1>
          <Notification message={notiMsg} />
          <Notification message={errorMsg} />            
        
          <div>
            {user.name} logged in 
            <button onClick={handleLogout}>logout</button>
            <p></p>
            {createBlogForm()}
          </div>
          
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}
    </div>
  )
}

export default App