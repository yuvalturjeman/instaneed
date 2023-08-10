import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import users from '../data/backup-users.json'

export const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
const STORAGE_KEY_USERS = 'users'
const STORAGE_KEY_GUEST = 'guest'

// const STORAGE_KEY = 'userDB'

_createUsers()

export const userService = {
    login,
    logout,
    signup,
    query,
    getById,
    // save,
    remove,
    getLoggedinUser,
    getEmptyUser,
    // getUsers,
    queryComments,
    getCommentById,
    getEmptyCredentials,
    getEmptyComment,
    getShortUserInfo,
    _createGuest,
    saveUser,
    getByUserName
}

window.cs = userService



async function saveUser(user) {
    var savedUser
    if (user._id) {
        savedUser = await storageService.put(STORAGE_KEY_USERS, user)
    } else {
        savedUser = await storageService.post(STORAGE_KEY_USERS, user)
    }
    return savedUser
}


async function login({ username, password }) {
    const user = await getByUserName(username)
    // const user = users.find(user => user.username === userCred.username)
    console.log('user.password', user.password)
    console.log('password', password)
    if (user.password === password) {
        console.log('username', user)
        _setLoggedinUser(user)
        return user
    }

}

async function getByUserName(username) {
    const users = await query()
    const user = users.filter((u) => username === u.username)
    return user[0]
}

async function logout() {
    storageService.removeUserFromLocalStorage()

}

function signup(user) {

    return storageService.post(STORAGE_KEY_USERS, user)
        .then(_setLoggedinUser)
}

async function query(filterBy = { fullName: '', username: '' }) {
    var users = await storageService.query(STORAGE_KEY_USERS).then(users => users)
    if (filterBy.username) {
        const regExp = new RegExp(filterBy.username, 'i')
        users = users.filter(user => regExp.test(user.username))
    }
    if (filterBy.fullName) {
        const regExp = new RegExp(filterBy.fullName, 'i')
        users = users.filter(user => regExp.test(user.fullName))
    }
    return users
}

function getById(userId) {
    return storageService.get(STORAGE_KEY_USERS, userId)
}

async function remove(userId) {
    await storageService.remove(STORAGE_KEY_USERS, userId)
}

function getLoggedinUser() {
    return utilService.loadFromStorage(STORAGE_KEY_LOGGEDIN_USER)
    // return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyUser() {
    console.log('from user local ');
    return {
        fullName: "",
        username: "",
        password: "",
        userImg: 'https://res.cloudinary.com/duxmabf4n/image/upload/v1686594941/p5igjah3vvmmfpdhs2e5.jpg',
        userStories: [],
        savedStories: [],
        taggedStories: [],

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

function getEmptyComment() {
    return {
        by: users[0],
        txt: "",
        likedBy: []
    }
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullName: ''
    }
}

async function getShortUserInfo(userId) {
    const shortUserInfo = await getById(userId)
    return {
        _id: shortUserInfo._id,
        userImg: shortUserInfo.userImg,
        username: shortUserInfo.username
    }
}


////////////////////

function _createUsers() {
    const storedUsers = utilService.loadFromStorage(STORAGE_KEY_USERS)
    if (storedUsers?.length > 0) return

    _saveUsers(STORAGE_KEY_USERS, users)
}

function _createGuest() {
    const storedGuest = utilService.loadFromStorage(STORAGE_KEY_GUEST)
    if (storedGuest?.length > 0) {
        return
    }
    const guestUser = users.filter((u) => u._id === 'Guest')
    _saveUsers(STORAGE_KEY_LOGGEDIN_USER, guestUser[0])
}

function _saveUsers(userType, users) {
    utilService.saveToStorage(userType, users)
}

function _setLoggedinUser(user) {
    // if (getLoggedinUser()) {
    //     logout()
    // }
    console.log('asdasd', user)
    utilService.saveToStorage(STORAGE_KEY_LOGGEDIN_USER, user)
    return user
}