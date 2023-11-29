import { useSelector, useDispatch } from 'react-redux'
import { incVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === ''){      
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.includes(filter.toLowerCase()))
  })

  const vote = anecdote => {        
    dispatch(incVotes(anecdote))
    dispatch(setNotification([`You voted '${anecdote.content}'`, 10]))
  }
  
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList