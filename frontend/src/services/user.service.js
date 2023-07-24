import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import users from '../data/backup-users.json'
import userDefault from '../assets/img/user-default.jpg'
import { httpService } from './http.service.js'
import { socketService } from './socket.service.js'
export const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
const STORAGE_KEY_USERS = 'users'
const STORAGE_KEY_GUEST = 'guest'
let gUsers
// const STORAGE_KEY = 'userDB'

_createUsers()

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
    getEmptyCredentials,
    // getShortUserInfo,
    _createGuest,
    saveUser,
    // saveLocalUser,
    getByUserName
}

window.cs = userService

// async function update(userToUpdate) {
//     // const user = await storageService.get('user', _id)
//     // await storageService.put('user', user)

//     const user = await storageService.put(`/user/${userToUpdate._id}`, userToUpdate)
//     // Handle case in which admin updates other user's details
//     if (getLoggedinUser()._id === user._id) saveLocalUser(user)
//     return user
// }


// changed with the above
async function update({ _id, user }) {
    const updatedUser = await httpService.put(`user/${_id}`, { _id, user })
    if (getLoggedinUser()._id === updatedUser._id) saveLocalUser(updatedUser)
    return updatedUser
}

function saveLocalUser(user) {
    localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

// changed with the above
// function saveLocalUser(user) {
//     user = { _id: user._id, username: user.username, imgUrl: user.imgUrl }
//     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
//     return user
// }




async function saveUser(user) {
    var savedUser
    if (user._id) {
        savedUser = await storageService.put(STORAGE_KEY_USERS, user)
    } else {
        savedUser = await storageService.post(STORAGE_KEY_USERS, user)
    }
    return savedUser
}

function getUsers() {
    return storageService.query(STORAGE_KEY_USERS, users)
}

// changed with the above
// async function getUsers(filterBy = { txt: '' }) {
//     return httpService.get(`user`, filterBy)
// }

async function login({ username, password }) {
    const user = await getByUserName(username)
    console.log('user.password', user.password)
    console.log('password', password)
    if (user.password === password) {
        console.log('username', user)
        _setLoggedinUser(user)
        return user
    }
}

// changed with the above
// async function login(userCred) {
//  const user = await httpService.post('auth/login', userCred)
//     if (user) {
//         return saveLocalUser(user)
//     }
// }

function signup(user) {
    return storageService.post(STORAGE_KEY_USERS, user)
        .then(_setLoggedinUser)
}

// changed with the above
// async function signup(userCred) {
//     const user = await httpService.post('auth/signup', userCred)
//     // socketService.login(user._id)
//     return saveLocalUser(user)
// }

async function getByUserName(username) {
    const users = await query()
    const user = users.filter((u) => u.username === username)
    return user[0]
}

async function logout() {
    storageService.removeUserFromLocalStorage()
}

// changed with the above
// async function logout() {
//     socketService.logout()
//     return await httpService.post('auth/logout')
// }


async function query() {
    var users = await storageService.query(STORAGE_KEY_USERS)
    return users
}



function getById(userId) {
    return storageService.get(STORAGE_KEY_USERS, userId)
}


// changed with the above
// async function getById(userId) {
//     const user = await httpService.get(`user/${userId}`)
//     return user
// }

async function remove(userId) {
    await storageService.remove(STORAGE_KEY_USERS, userId)
}

// changed with the above
// function remove(userId) {
//     return httpService.delete(`user/${userId}`)
// }


function getLoggedinUser() {
    return utilService.loadFromStorage(STORAGE_KEY_LOGGEDIN_USER)
}

function getEmptyUser() {
    return {
        fullname: "",
        username: "",
        password: "",
        imgUrl:  'https://res.cloudinary.com/duxmabf4n/image/upload/v1686594941/p5igjah3vvmmfpdhs2e5.jpg',
    }
}


function queryComments(userId) {
    let user = getById(userId)
    return user.comments
}

function getCommentById(userId, commentId) {
    const comments = queryComments(userId)
    return comments.filter(comment => comment._id === commentId)
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
        
    }
}




function _createUsers() {
    gUsers = utilService.loadFromStorage(STORAGE_KEY_USERS)
    console.log('storedUsers',gUsers);
    if (gUsers && gUsers.length > 0) return
    gUsers = users

    _saveUsers(STORAGE_KEY_USERS, users)
}

function _createGuest() {
    return {
            _id: utilService.makeId(),
            username: "Guest",
            fullname: "Guest",
            password: "1234",
            imgUrl: userDefault

        }   
}

function _saveUsers() {
    utilService.saveToStorage(STORAGE_KEY_USERS, users)
}

function _setLoggedinUser(user) {
    console.log('setLoggedinUser', user)
    utilService.saveToStorage(STORAGE_KEY_LOGGEDIN_USER, user)
    return user
}


