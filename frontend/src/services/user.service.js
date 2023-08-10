import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import users from '../data/backup-users.json'
import userDefault from '../assets/img/user-default.jpg'
import { httpService } from './http.service.js'
import { socketService } from './socket.service.js'
export const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
const STORAGE_KEY_USERS = 'users'

export const userService = {
    login,
    logout,
    signup,
    query,
    getById,
    update,
    remove,
    getLoggedinUser,
    getEmptyUser,
    getUsers,
    queryComments,
    getCommentById,
    getEmptyCred,
    _createGuest,
    saveUser,
    // getByUserName
}

window.cs = userService


function getUsers(filterBy = { txt: '' }) {
    return httpService.get(`user`, filterBy)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

async function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update({ _id, user }) {
    const updatedUser = await httpService.put(`user/${_id}`, { _id, user })
    if (getLoggedinUser()._id === updatedUser._id) saveLocalUser(updatedUser)
    return updatedUser
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        saveLocalUser(user)
        return user
    }
}


async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return user
}

async function logout() {
    socketService.logout()
    return await httpService.post('auth/logout')
}

function getEmptyUser() {
    return {
        fullname: "",
        username: "",
        password: "",
        // imgUrl:  'https://res.cloudinary.com/duxmabf4n/image/upload/v1686594941/p5igjah3vvmmfpdhs2e5.jpg',
        userImg: { userDefault },
        savedStories: [],
        taggedStories: [],
        userStories: []
    }
}


function getEmptyCred() {
    return {
        username: '',
        password: '',
        fullname: ''

    }
}


function saveLocalUser(user) {
    user = { _id: user._id, username: user.username, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}




async function saveUser(user) {
    var savedUser
    if (user._id) {
        savedUser = await storageService.put(STORAGE_KEY_USERS, user)
    } else {
        savedUser = await storageService.post(STORAGE_KEY_USERS, user)
    }
    return savedUser
}







// async function getByUserName(username) {
//     const users = await query()
//     const user = users.filter((u) => u.username === username)
//     return user[0]
// }




async function query() {
    var users = await storageService.query(STORAGE_KEY_USERS)
    return users
}










function queryComments(userId) {
    let user = getById(userId)
    return user.comments
}

function getCommentById(userId, commentId) {
    const comments = queryComments(userId)
    return comments.filter(comment => comment._id === commentId)
}



function _createGuest() {
    return {
        _id: utilService.makeId(),
        username: "Guest",
        fullname: "Guest",
        password: "1234",
        userImg: userDefault

    }
}

// function _saveUsers() {
//     utilService.saveToStorage(STORAGE_KEY_USERS, users)
// }

// function _setLoggedinUser(user) {
//     console.log('setLoggedinUser', user)
//     utilService.saveToStorage(STORAGE_KEY_LOGGEDIN_USER, user)
//     return user
// }

