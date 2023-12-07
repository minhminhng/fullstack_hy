import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage([1, 'Wrong credentials'])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setMessage([
        0,
        `added a new blog ${blog.title} by ${blog.author}`,
      ])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage([1, exception.response.data.error])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateLikes = async (id, blogObject) => {
    try {
      const blog = await blogService.update(id, blogObject)
      let updateBlogs = blogs.map((b) => (b.id === id ? blog : { ...b }))
      setBlogs(updateBlogs)
    } catch (exception) {
      setMessage([1, exception.response.data.error])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      let remainedBlogs = blogs.filter((b) => b.id !== id)
      setBlogs(remainedBlogs)
    } catch (exception) {
      setMessage([1, exception.response.data.error])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable
      buttonLabelShow="create new blog"
      buttonLabelHide="cancel"
      ref={blogFormRef}
    >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      )}

      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={() => handleLogout()} type="submit">
              logout
            </button>
          </p>
          {blogForm()}
        </div>
      )}

      {blogs
        .sort((b1, b2) => b2.likes - b1.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            updateLikes={updateLikes}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  )
}

export default App
