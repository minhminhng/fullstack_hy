import { useNotification } from "../contexts/NotificationContext"

const Notification = () => {
  const message = useNotification()

  if (message === null) {
    return null
  }

  if (message[0] === 0){
    return (
      <div className="info">
        {message[1]}
      </div>
    )
  }
  else if (message[0] === 1){
    return (
      <div className="error">
        {message[1]}
      </div>
    )
  }
}

export default Notification