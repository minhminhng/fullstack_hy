import React, {useState} from 'react';
import ReactDOM from 'react-dom';

// Define single component for statistics
const Statistic = ({text, value, percent}) => {
  if (percent === "true") {
    return <tr><td>{text}</td><td>{value} %</td></tr>
  }
  return <tr><td>{text}</td><td>{value}</td></tr>
}

// Define all Statistics component
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const score = good * 1 + neutral * 0 + bad * (-1)
  const avg = score / all
  const pos = good / all

  // Only display statistics when feedback has been given
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={avg} />
        <Statistic text="positive" value={pos} percent="true" />
      </tbody>
    </table>
  )
}

//Define handler and name for buttons
const Button = ({ handleClick, text }) => (
  <button onClick={ handleClick }>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)  

  // Increase good and recompute statistics when good is clicked
  const handleGood = () => {
    setGood(good + 1)    
  }
  // Increase neutral and recompute statistics when neutral is clicked
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  // Increase bad and recompute statistics when bad is clicked
  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h1>Statistics</h1>      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);
