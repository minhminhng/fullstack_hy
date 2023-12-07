import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incLikes, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => {
    return user
  })
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

  const increaseLikes = async (blog) => {
    dispatch(incLikes({...blog, likes: blog.likes + 1}))
  }

  const removeBlog = async (id) => {
    if (window.confirm(`Removing blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(id))
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
            <button onClick={() => increaseLikes(blog)}>like</button>
          </div>
          {userExist && <div>{blog.user.name} </div>}
          {(user !== null) && (user.username === blog.user.username) && <button style={btnStyle} onClick={() => removeBlog(blog.id)}>remove</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog