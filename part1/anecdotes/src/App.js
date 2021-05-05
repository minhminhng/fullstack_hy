import React, { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

// Find the largest votes
const Stats = ( {anecdotes, stats} ) => {
  let maxInd = 0  
  var i
  for (i=0; i < anecdotes.length; i++) {
    if (stats[i] >= stats[maxInd]) {
      maxInd = i
    }
  }

  if (stats[maxInd] === 0){
    return <div></div>
  }
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[maxInd]}</div>
      <div>has {stats[maxInd]} votes</div>
    </div>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5:0})

  //Store the vote
  const storeVote = () => {    
    setVotes({ ...votes, [selected]:votes[selected] + 1})

  }
  // Set a random number to the selected
  const randomSelect = () => {
      let ran = Math.floor(Math.random() * (anecdotes.length))
      while (ran == selected) {
        ran = Math.floor(Math.random() * (anecdotes.length))
      }
      setSelected(ran)
  }

  return (
    <div>      
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <br/>
      <Button handleClick={storeVote} text="vote" />
      <Button handleClick={randomSelect} text="next anecdote" />
      
      <Stats anecdotes={anecdotes} stats={votes} />
    </div>
  )
}

export default App