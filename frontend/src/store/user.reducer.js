
import { userService } from '../services/user.service.js'

// export const INCREMENT = 'INCREMENT'
// export const DECREMENT = 'DECREMENT'
// export const CHANGE_COUNT = 'CHANGE_COUNT'
// export const SET_USER = 'SET_USER'
// export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
// export const SET_SCORE = 'SET_SCORE'
export const UPDATE_USER = 'UPDATE_USER'
export const ADD_USER = 'ADD_USER'
export const SET_LOGGEDIN_USER = 'SET_LOGGED_IN_USER'

const initialState = {
  
    loggedinUser: userService.getLoggedinUser() || null,
    users: []
   
}

export function userReducer(state = initialState, action) {
    var newState = state
    
    switch (action.type) {
        case SET_LOGGEDIN_USER:
            newState = { ...state, loggedinUser: action.user }
            break
        // case SET_WATCHED_USER:
        //     newState = { ...state, watchedUser: action.user }
        //     break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
            case UPDATE_USER:
                const users = state.users.map(u => (u._id === action.user._id) ? action.user : u)
                newState = (action.user._id === state.loggedinUser._id) ? { ...state, users, loggedinUser: action.user } : { ...state, users }
                break
        case ADD_USER:
            newState = { ...state, users: [...state.users, action.user] }
            break
        // case NEW_NOTIFICATION:user
        //     newState = { ...state, newNotification: action.message }
        //     break
        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}