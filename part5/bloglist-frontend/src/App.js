import React, { useState, useEffect, useRef } from 'react'
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

  const blogFormRef = useRef()

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
      <LoginForm handleSubmit={handleLogin} 
              username={username} 
              handleUsernameChange={({target}) => setUsername(target.value)}
              password={password} 
              handlePasswordChange={({target}) => setPassword(target.value)}/>            
    </div>
  )

  const createBlogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const createdBlog = await blogService.create(blogObject)
        
      setBlogs(blogs.concat(createdBlog))       
      setNotiMsg([0,`a new blog \'${createdBlog.title}\' by ${createdBlog.author} is added`])
      setTimeout(() => {
        setNotiMsg(null)
      }, 5000)
    } catch (exception) {
      setErrorMsg([1, exception])
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }    
  }

  const updateBlog = async (id, blogObject) => {
    const index = blogs.findIndex(blog => blog.id === id)
    
    try {
      const updatedBlog  = await blogService.update(id, blogObject)
      let newList = [...blogs]
      newList[index] = { ...newList[index], likes: updatedBlog.likes }          
      setBlogs(newList)          
      setNotiMsg([0,`updated \'${updatedBlog.title}\'`])
      setTimeout(() => {
        setNotiMsg(null)
      }, 2000)    
    } catch (exception) {      
      setErrorMsg([1, exception.message])
      setTimeout(() => {
        setErrorMsg(null)
      }, 2000)
    }
  }
    
  return (
    <div>      
      <h1>Blogs</h1>
      <Notification message={notiMsg} />
      <Notification message={errorMsg} />  
      {user === null ?
        loginForm() :
        <div> 
          <div>
            {user.name} logged in 
            <button onClick={handleLogout}>logout</button>
            <p></p>
            {createBlogForm()}
          </div>
          
          {/* {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} update={updateBlog} />
          )} */}
          {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
            <Blog key={blog.id} blog={blog} update={updateBlog} />
          )}
        </div>}
    </div>
  )
}

export default App