import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNewNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content !== undefined)
    {
      dispatch(createAnecdote(content))
      dispatch(showNewNotification(content))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)    
    }    
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
          <div><input name="anecdote"/></div>
          <button>create</button>
      </form>      
    </div>
  )
}

export default AnecdoteForm