import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    if (message[0] === 0){
        return (
            <div className="message">
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