// import { userService } from '../services/user.service.js'

// export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'
// export const ADD_USER = 'ADD_USER'
// export const SET_WATCHED_USER = 'SET_WATCHED_USER'
// export const REMOVE_USER = 'REMOVE_USER'
// export const SET_USERS = 'SET_USERS'
// export const SET_SCORE = 'SET_SCORE'
// // export const GET_LOGGED_IN_USER = 'GET_LOGGED_IN_USER'
// // export const SET_GUEST_USER = 'SET_GUEST_USER'
// export const UPDATE_LOGGEDIN_USER = 'UPDATE_LOGGEDIN_USER'

// const initialState = {
//     loggedInUser: userService.getLoggedinUser(),
//     users: [],
// }

// export function userReducer(state = initialState, action) {
//     var newState = state
//     switch (action.type) {
//         case SET_LOGGED_IN_USER:
//             newState = { ...state, loggedInUser: action.loggedInUser }
//             break
//         case UPDATE_LOGGEDIN_USER:
//             newState = { ...state, user: action.updatedUser }
//             break
//         case REMOVE_USER:
//             newState = { ...state, users: state.users.filter(user => user._id !== action.userId) }
//             break
//         case SET_USERS:
//             newState = { ...state, users: action.users }
//             break
//         case ADD_USER:
//             newState = { ...state, users: [...state.users, action.loggedInUser] }
//             break
//         default:
//     }

//     // For debug:
//     // window.userState = newState
//     // console.log('State:', newState)
//     return newState

// }



//start hereeeeeeee
import { userService } from '../services/user.service.js'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
// export const NEW_NOTIFICATION = 'NEW_NOTIFICATION'
const initialState = {
    count: 10,
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser: null
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case INCREMENT:
            newState = { ...state, count: state.count + 1 }
            break
        case DECREMENT:
            newState = { ...state, count: state.count - 1 }
            break
        case CHANGE_COUNT:
            newState = { ...state, count: state.count + action.diff }
            break
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case SET_SCORE:
            newState = { ...state, user: { ...state.user, score: action.score } }
            break
        // case NEW_NOTIFICATION:
        //     newState = { ...state, newNotification: action.message }
        //     break
        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}