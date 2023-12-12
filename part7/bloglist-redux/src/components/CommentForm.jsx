import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const submitComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    if (comment !== '') {
      dispatch(addComment(blog.id, comment))
    }
  }

  return (
    <div>
      <form onSubmit={submitComment}>   
        <div>
          <input name="comment" />
          <button type="submit">add comment</button>
        </div>        
      </form>
    </div>)
}

export default CommentForm
