import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    dispatch(createBlog({ title, author, url }))
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

export default BlogForm
