import React, { useState } from 'react'

const BlogForm = ( {createBlog} ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
  }

  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={addBlog}>
          <table>
            <tbody>
            <tr>
                <td>title:</td>
                <td><input type="text" value={title} name="title" onChange={handleTitleChange} /></td>
            </tr>
            <tr>
                <td>author:</td>
                <td><input type="text" value={author} name="author" onChange={handleAuthorChange} /></td>
            </tr>
            <tr>
                <td>url:</td>
                <td><input type="text" value={url} name="author" onChange={handleUrlChange} /></td>
            </tr>
            </tbody>
        </table>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default BlogForm