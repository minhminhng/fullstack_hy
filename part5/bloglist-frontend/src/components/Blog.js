import React, { useState } from 'react'

const Blog = ({blog, update}) => {
  const blogStyle = {
    paddingTop: 4,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 2,
    marginTop: 5,
    marginBottom: 5,
    borderRadius :5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    // setLikes(blog.likes)
    setVisible(!visible)
  }

  const increaseLikes = () => {  
    update(blog.id, {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blog.user.id
    })    
    setLikes(blog.likes + 1)
  }  
  
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>  
        {blog.title} {blog.author} &nbsp;             
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible}>                
        {blog.title} {blog.author} &nbsp;
        <button onClick={toggleVisibility}>hide</button>
        <div>
          <div>{blog.url}</div>
          <div>like {likes} &nbsp;<button onClick={increaseLikes}>like</button></div>
          <div>{blog.user.name}</div>
        </div>
      </div> 
    </div> 
  )
}

export default Blog