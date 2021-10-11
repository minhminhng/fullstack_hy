import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClickVote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} 
        <button onClick={handleClickVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((anec1, anec2) => anec2.votes - anec1.votes).map(anecdote =>
        <Anecdote key={anecdote.id} 
          anecdote={anecdote}
          handleClickVote={() =>
            dispatch(increaseVote(anecdote.id))
          }
        />
      )}
    </div>
  )
}

export default AnecdoteList