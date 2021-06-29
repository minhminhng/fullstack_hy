import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/Create'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [notiMsg, setNotiMsg] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

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

  // Handle creating a new blog
  const handleCreate = async (event) => {
    event.preventDefault()
    // console.log('create blog', newTitle, newAuthor, newUrl) 
    try {
      // const blog = await loginService.login({
      //   username, password,
      setNotiMsg([0,`a new blog \'${newTitle}\' by ${newAuthor} is added`])
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setNotiMsg(null)
        }, 5000)
    } catch (exception) {
      setErrorMsg([1, 'Wrong credentials'])
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  return (
    <div>      
      {user === null ?
        <div>     
          <h1>login to application</h1>          
          <Notification message={errorMsg} />   
          <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} 
            password={password} setPassword={setPassword}/>            
        </div>
        :
        <div>
          <h1>Blogs</h1>
          <Notification message={notiMsg} />
          <Notification message={errorMsg} />            
        
          <div>
            {user.name} logged in 
            <button onClick={handleLogout}>logout</button>
          </div>
          <CreateForm handleCreate={handleCreate} setTitle={setTitle} title={newTitle} author={newAuthor} 
            setAuthor={setAuthor} url={newUrl} setUrl={setUrl}/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}
    </div>
  )
}

export default App