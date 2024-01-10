import { useState, useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_AUTHORS)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const [token, setToken] = useState(null)

  useEffect(() =>{
    localStorage.clear()
  }, [])

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token &&<button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} />

      <Books show={page === 'books'} />

      {token && <NewBook show={page === 'add'} setError={notify} />}

      {token && <Recommend show={page === 'recommend'} books={result.data.allBooks}/>}

      {!token && <LoginForm show={page === 'login'} setError={notify} setToken={setToken} />}

    </div>
  )
}

export default App
