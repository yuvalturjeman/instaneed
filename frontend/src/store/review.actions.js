import { messageService } from '../services/review.service'
import { store } from '../store/store.js'
import { ADD_MESSAGE, REMOVE_MESSAGE, SET_MESSAGES,NEW_MESSAGE } from './review.reducer'
import { SET_SCORE, SET_WATCHED_USER } from './user.reducer'

// Action Creators
export function getActionRemoveMessage(messageId) {
  return { type: REMOVE_MESSAGE, messageId }
}
export function getActionAddMessage(message) {
  return { type: ADD_MESSAGE, message }
}
export function getActionSetWatchedUser(user) {
  return { type: SET_WATCHED_USER, user }
}

export async function loadMessages() {
  try {
    const messages = await messageService.query()
    store.dispatch({ type: SET_MESSAGES, messages })

  } catch (err) {
    console.log('ReviewActions: err in loadReviews', err)
    throw err
  }
}

export async function addMessage(message) {
  try {
    const addedMessage = await messageService.add(message)
    store.dispatch(getActionAddMessage(addedMessage))
    // const { score } = addedMessage.byUser
    // store.dispatch({ type: SET_SCORE, score })
  } catch (err) {
    console.log('ReviewActions: err in addReview', err)
    throw err
  }
}

export async function removeMessage(messageId) {
  try {
    await messageService.remove(messageId)
    store.dispatch(getActionRemoveMessage(messageId))
  } catch (err) {
    console.log('ReviewActions: err in removeReview', err)
    throw err
  }
}