import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import { getAll, createBlog } from './request'
import { useNotificationDispatch } from './contexts/NotificationContext'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useUser, useUserDispatch } from './contexts/UserContext'

const App = () => {
  const queryClient = useQueryClient()
  const user = useUser()
  const dispatchUser = useUserDispatch()
  const dispatchNotification = useNotificationDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      dispatchUser({ type: "SET", payload:JSON.parse(loggedUserJSON) })
    }
  }, [])

  const handleLogout = () => {
    dispatchUser({ type: "RESET" })
    window.localStorage.removeItem("loggedBlogappUser");
  }

  const blogFormRef = useRef()

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      // const blogs = queryClient.getQueryData('blogs')
      // queryClient.setQueryData('blogs', blogs.concat(newBlog))
      queryClient.invalidateQueries({ queryKey: ['blogs']})
    }
  })

  const addBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      newBlogMutation.mutate(blog)      
      dispatchNotification({ type: "SET", payload: [0, `added a new blog ${blog.title} by ${blog.author}`] })
      setTimeout(() => {      
        dispatchNotification({ type: "CLEAR" })}, 5000)
    } catch (exception) {
      dispatchNotification({ type: "SET", payload: [1, exception.response.data.error]})
      setTimeout(() => {      
        dispatchNotification({ type: "CLEAR" })}, 5000)
    }
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    refetchOnWindowFocus: false
  })
  
  const blogs = result.data

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const blogForm = () => (
    <Togglable
      buttonLabelShow='create new blog'
      buttonLabelHide='cancel'
      ref={blogFormRef}
    >
      <BlogForm createBlog={addBlog} />
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
            <button onClick={() => handleLogout()}>
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
          />
        ))}
    </div>
  )
}

export default App
