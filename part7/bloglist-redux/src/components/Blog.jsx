import { useDispatch, useSelector } from 'react-redux'
import { incLikes, deleteBlog } from '../reducers/blogsReducer'
import { useNavigate } from 'react-router-dom'
import CommentForm from './CommentForm'

const Blog = ({ blog }) => {
  const btnStyle = {
    background:'blue',
    color:'white',
    border: 'none',
    borderRadius: '3px'
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => { return user })
  
  if (!blog) {
    return null
  }

  const userExist = blog.user === null ? false : true

  const increaseLikes = async () => {
    dispatch(incLikes({ ...blog, likes: blog.likes + 1 }))
  }

  const removeBlog = async () => {
    if (window.confirm(`Removing blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      navigate('/')
    }
  }

  return (
    <div>
      <div>
        <h2>{blog.title} by {blog.author}</h2>        
        <div className="blog-details">
          <a href={blog.url}>{blog.url}</a>
          <div id='likes'>
            {blog.likes}
            <button onClick={increaseLikes}>like</button>
          </div>
          {userExist && <div>added by {blog.user.name} </div>}
          {(user !== null) && (user.username === blog.user.username) && <button style={btnStyle} onClick={removeBlog}>remove</button>}
        </div>
        <h3>comments</h3>
        <CommentForm blog ={blog}/>
        <ul>          
          {blog.comments.map((comment, i) => 
              <li key={i}>{comment}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Blog