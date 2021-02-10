import React, { useState } from 'react';
import ReactDOM from 'react-dom';

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
      <p>{anecdotes[maxInd]}</p>
      <p>has {stats[maxInd]} votes</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5:0})

  //Store the vote
  const storeVote = () => {    
    setVotes({ ...votes, [selected]:votes[selected] + 1})

  }
  // Set a random number to the selected
  const randomSelect = () => setSelected(Math.floor(Math.random() * (anecdotes.length)))

  return (
    <div>      
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button handleClick={storeVote} text="vote" />
      <Button handleClick={randomSelect} text="next anecdote" />
      
      <Stats anecdotes={props.anecdotes} stats={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)