import { useState } from 'react'
import { useUserDispatch } from '../contexts/UserContext'
import { login } from '../request'
import { useNotificationDispatch } from '../contexts/NotificationContext'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatchUser = useUserDispatch()
    const dispatchNotification = useNotificationDispatch()

    const handleLogin = async (event) => {
      event.preventDefault()
  
      try {
        const user = await login({ username, password }) 
        dispatchUser({ type: "SET", payload: user })
        window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));       
      } catch (exception) {
        dispatchNotification({ type: "SET", payload: [1, exception.response.data.error]})
        setTimeout(() => {      
          dispatchNotification({ type: "CLEAR" })}, 5000)
      }
    }

    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    )
  }

export default LoginForm