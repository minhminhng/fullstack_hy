import { useState } from 'react'

const Blog = ({ user, blog, updateLikes, deleteBlog }) => {
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

  const increaseLikes = (event) => {
    event.preventDefault()
    updateLikes(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    })
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Removing blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
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
          {(user !== null) && (user.username === blog.user.username) && <button style={btnStyle} onClick={removeBlog}>remove</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog