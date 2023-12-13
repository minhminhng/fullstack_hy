import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'

const ALL_QUERY = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
    allBooks {
      title
      author
      published
      genres
    }

  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_QUERY)
  const [errorMessage, setErrorMessage] = useState(null)

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors}/>

      <Books show={page === 'books'} books={result.data.allBooks}/>

      <NewBook show={page === 'add'} setError={notify}/>

    </div>
  )
}

export default App
