import { useParams } from "react-router-dom"

const Anecdote = ({ anecdote }) => (
    <div>
      <h3>{anecdote.content}</h3>
      <div>{anecdote.author}</div>
      <div>{anecdote.info}</div>
      <div>{anecdote.votes}</div>
    </div>
  )


export default Anecdote