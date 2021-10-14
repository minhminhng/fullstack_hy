
const initial = {
  message: '',
  hidden: true
}
const notificationReducer = (state = initial, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch(action.type) {
      case 'NEW_NOTIFICATION':
        const newNoti = `You added '${action.data}'`
        return { message:newNoti, hidden:false }
      case 'VOTE_NOTIFICATION':
        const voteNoti = `You voted '${action.data}'`        
        return { message:voteNoti, hidden:false }
      case 'REMOVE_NOTIFICATION':            
        return initial
      default:
        return state
    }  
}

export const showNewNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: content
  }
}

export const showVoteNotification = (content) => {
  return {
    type: 'VOTE_NOTIFICATION',
    data: content
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer