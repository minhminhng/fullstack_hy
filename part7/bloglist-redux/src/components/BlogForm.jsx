import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <table>
          <tbody>
            <tr>
              <td>blog:</td>
              <td>
                <input className='blog-title' type="text"
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                  placeholder='write title here'
                />
              </td>
            </tr>
            <tr>
              <td>author:</td>
              <td>
                <input type="text"
                  value={author}
                  onChange={event => setAuthor(event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>url:</td>
              <td>
                <input className='blog-url' type="text"
                  value={url}
                  onChange={event => setUrl(event.target.value)}
                  placeholder='write url here'
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>)
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
