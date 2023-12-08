import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBlog, removeBlog } from '../request'

const Blog = ({ user, blog }) => {
  const queryClient = useQueryClient()
  const [visible, setVisible] = useState(false)
  const btnStyle = {
    background:'blue',
    color:'white',
    border: 'none',
    borderRadius: '3px'
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const userExist = blog.user === null ? false : true

  const newLikeMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (blog) => {
      // const blogs = queryClient.getQueryData({ queryKey: ['blogs'] })
      // queryClient.setQueryData({ queryKey: ['blogs'] }, blogs.map(b => (b.id === id ? blog : b )).sort((b1, b2) => b2.likes - b1.likes))
      queryClient.invalidateQueries({ queryKey: ['blogs']})
    }
  })

  const increaseLikes = async () => {
    try {
      newLikeMutation.mutate({ ...blog, likes: blog.likes + 1 })
    } catch (exception) {
      dispatchNotification({ type: "SET", payload: [1, exception.response.data.error]})
      setTimeout(() => {      
        dispatchNotification({ type: "CLEAR" })}, 5000)
    }
  }

  const deleteMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: () => {
      // const blogs = queryClient.getQueryData({ queryKey: ['blogs'] })
      // queryClient.setQueryData({ queryKey: ['blogs'] }, blogs.map(b => (b.id === id ? blog : b )).sort((b1, b2) => b2.likes - b1.likes))
      queryClient.invalidateQueries({ queryKey: ['blogs']})
    }
  })

  const deleteBlog = () => {
    if (window.confirm(`Removing blog ${blog.title} by ${blog.author}`)) {
      try {
        deleteMutation.mutate(blog.id)
      } catch (exception) {
        dispatchNotification({ type: "SET", payload: [1, exception.response.data.error]})
        setTimeout(() => {      
          dispatchNotification({ type: "CLEAR" })}, 5000)
      }
    }
  }

  return (
    <div>
      <div className='blog'>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={() => setVisible(true)}>view</button>
        <button style={showWhenVisible} onClick={() => setVisible(false)}>hide</button>
        <div style={showWhenVisible} className="blog-details">
          <div>{blog.url}</div>
          <div id='likes'>
            {blog.likes}
            <button onClick={increaseLikes}>like</button>
          </div>
          {userExist && <div>{blog.user.name} </div>}
          {(user !== null) && (user.username === blog.user.username) && <button style={btnStyle} onClick={deleteBlog}>remove</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog