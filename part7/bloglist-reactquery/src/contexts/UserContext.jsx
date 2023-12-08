import { createContext, useReducer, useContext } from 'react'
import { setToken } from '../request'

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      setToken(action.payload.token)
      return action.payload
    case "RESET":
      setToken(null)
      return null
  }
}

const UserContext = createContext()

export const useUser = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)
  return (
    <UserContext.Provider value={ [user, userDispatch] }>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext