import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// eslint-disable-next-line
import { showErrorMsg, showSuccessMsg, showUserMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_MESSAGE_ADDED } from '../services/socket.service'

import { loadMessages, addMessage, removeMessage, getActionAddMessage } from '../store/review.actions'
import { loadUsers } from '../store/user.actions'
import { messageReducer } from '../store/review.reducer'

export function MessageIndex() {

  const users = useSelector(storeState => storeState.userModule.users)
  const loggedInUser = useSelector(storeState => storeState.userModule.user)
  const messages = useSelector(storeState => storeState.messageModule.messages)

  const [messageToEdit, setMessageToEdit] = useState({ txt: '', aboutUserId: '' })

  const dispatch = useDispatch()

  useEffect(() => {
    loadMessages()
    loadUsers()

    socketService.on(SOCKET_EVENT_MESSAGE_ADDED, (message) => {
      console.log('GOT from socket', message)
      dispatch(getActionAddMessage(message))
    })

    return () => {
      socketService.off(SOCKET_EVENT_MESSAGE_ADDED)
    }
    // eslint-disable-next-line
  }, [])

  const handleChange = ev => {
    const { name, value } = ev.target
    setMessageToEdit({ ...messageToEdit, [name]: value })
  }

  const onAddMessage = async ev => {
    ev.preventDefault()
    if (!messageToEdit.txt || !messageToEdit.aboutUserId) return alert('All fields are required')
    try {

      await addMessage(messageToEdit)
      showSuccessMsg('Message added')
      setMessageToEdit({ txt: '', aboutUserId: '' })
    } catch (err) {
      showErrorMsg('Cannot add message')
    }
  }

  const onRemove = async messageId => {
    try {
      await removeMessage(messageId)
      showSuccessMsg('Message removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  function canRemove(message) {
    return message.byUser._id === loggedInUser?._id || loggedInUser?.isAdmin
  }


  return (
    <div className="review-app">
      <h1>Reviews and Gossip</h1>
      {messages && <ul className="review-list">
        {messages.map(message => (
          <li key={message._id}>
            {canRemove(message) &&
              <button onClick={() => onRemove(message._id)}>X</button>}
            <p>
              About:
              <Link to={`/user/${message.aboutUser._id}`}>
                {message.aboutUser.fullname}
              </Link>
            </p>
            <h3>{message.txt}</h3>
            <p>
              By:
              <Link to={`/user/${message.byUser._id}`}>
                {message.byUser.fullname}
              </Link>
            </p>
          </li>
        ))}
      </ul>}
      {users && loggedInUser &&
        <form onSubmit={onAddMessage}>
          <select
            onChange={handleChange}
            value={messageToEdit.aboutUserId}
            name="aboutUserId"
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.fullname}
              </option>
            ))}
          </select>
          <textarea
            name="txt"
            onChange={handleChange}
            value={messageToEdit.txt}
          ></textarea>
          <button>Add</button>
        </form>}
      <hr />
    </div>
  )
}