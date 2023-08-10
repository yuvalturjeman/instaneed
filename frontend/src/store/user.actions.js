
import { userService } from "../services/user.service.js";
import { socketService } from "../services/socket.service.js";
import { store } from '../store/store.js'

import { showErrorMsg } from '../services/event-bus.service.js'
import { LOADING_DONE, LOADING_START } from "./system.reducer.js";
import {NEW_NOTIFICATION, ADD_USER ,REMOVE_USER, SET_USER, SET_USERS, SET_LOGGEDIN_USER ,SET_WATCHED_USER, UPDATE_USER } from "./user.reducer.js";

export async function loadUsers(filterBy = { txt: '' }) {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers(filterBy)
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function addUser(userCred) {
    try {
        const savedUser = await userService.signup(userCred)
        store.dispatch({
            type: ADD_USER,
            user: savedUser
        })
        return savedUser
    } catch (err) {
        console.log('Cannot add user', err)
        throw err
    }
}


export async function login(user) {
    try {
        const loggedInUser = await userService.login(user)
        store.dispatch({
            type: SET_LOGGEDIN_USER,
            user: loggedInUser
        })
        socketService.login(user)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(user) {
    try {
        const loggedInUser = await userService.signup(user)
        store.dispatch({
            type: SET_LOGGEDIN_USER,
            user: loggedInUser
        })
        socketService.login(user)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_LOGGEDIN_USER,
            user: null
        })
        // socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

// export async function loadUser(userId) {
//     try {
//         const user = await userService.getById(userId);
//         store.dispatch({ type: SET_WATCHED_USER, user })
//     } catch (err) {
//         showErrorMsg('Cannot load user')
//         console.log('Cannot load user', err)
//     }
// }

export async function updateUser(user) {
    try {
        const updatedUser = await userService.saveUser(user)
        console.log('updatedUser', updatedUser)
        store.dispatch({
            type: UPDATE_USER,
            user: updatedUser
        })
        return updateUser
    } catch (err) {
        console.log('Cannot update logged user (id: ' + user._id + ')', err)
        throw err
    }
}

export function getActionUpdateUser(user) {
    return {
        type: UPDATE_USER,
        user
    }
}