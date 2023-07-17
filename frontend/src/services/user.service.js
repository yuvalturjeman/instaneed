import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import users from '../data/backup-users.json'
import userDefault from '../assets/img/user-default.jpg'
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
    getShortUserInfo,
    _createGuest,
    saveUser,
    // saveLocalUser,
    getByUserName
}

window.cs = userService

async function update(userToUpdate) {
    // const user = await storageService.get('user', _id)
    // await storageService.put('user', user)

    const user = await storageService.put(`/user/${userToUpdate._id}`, userToUpdate)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}
function saveLocalUser(user) {
    // user = {_id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score}
    // sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    // return user
    localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
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

function getUsers() {
    return storageService.query(STORAGE_KEY_USERS, users)
    // return httpService.get(`user`)
}


async function login({ username, password }) {
    const user = await getByUserName(username)
    
    // const user = users.find(user => user.userName === userCred.userName)
    console.log('user.password', user.password)
    console.log('password', password)
    if (user.password === password) {
        console.log('username', user)
        _setLoggedinUser(user)
        return user
    }
    // const user = await httpService.post('auth/login', userCred)
    // if (user) {
    //     socketService.login(user._id)
    //     return saveLocalUser(user)
    // }
}

async function getByUserName(username) {
    const users = await query()
    const user = users.filter((u) => u.username === username)
    return user[0]
}

async function logout() {
    storageService.removeUserFromLocalStorage()
    // storageService.remove(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

function signup(user) {
    // user = { userName, password, fullName, imgUrl }
    return storageService.post(STORAGE_KEY_USERS, user)
        .then(_setLoggedinUser)
}

async function query() {
    var users = await storageService.query(STORAGE_KEY_USERS)
    return users
}

// async function query(filterBy = { fullName: '', userName: '' }) {
//     var users = await storageService.query(STORAGE_KEY_USERS).then(users => users)
//     if (filterBy.userName) {
//         const regExp = new RegExp(filterBy.userName, 'i')
//         users = users.filter(user => regExp.test(user.userName))
//     }
//     if (filterBy.fullName) {
//         const regExp = new RegExp(filterBy.fullName, 'i')
//         users = users.filter(user => regExp.test(user.fullName))
//     }
//     return users

    // var users = await storageService.query('user').then(users => users)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     users = users.filter(user => {
    //         return regex.test(user.username)
    //     })
    //     // users = users.filter(user => regex.test(user.unername) || regex.test(car.description))
    // }
    // return users
    // console.log('get logged in user', storageService.query(STORAGE_KEY_LOGGEDIN_USER))
    // return httpService.get(`user`)
// }

function getById(userId) {
    return storageService.get(STORAGE_KEY_USERS, userId)
}

async function remove(userId) {
    await storageService.remove(STORAGE_KEY_USERS, userId)
}

// async function save(user) {
//     var savedUser
//     if (user._id) {
//         savedUser = await storageService.put(STORAGE_KEY_LOGGEDIN_USER, user)
//     } else {
//         savedUser = await storageService.post(STORAGE_KEY_LOGGEDIN_USER, user)
//     }
//     return savedUser
// }

function getLoggedinUser() {
    return utilService.loadFromStorage(STORAGE_KEY_LOGGEDIN_USER)
    // return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyUser() {
    return {
        fullname: "",
        username: "",
        password: "",
        userImg: { url: 'https://res.cloudinary.com/duxmabf4n/image/upload/v1686594941/p5igjah3vvmmfpdhs2e5.jpg', style: { filter: 'none' } },
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

// function getEmptyComment() {
//     return {
//         by: users[0],
//         txt: "",
//         likedBy: []
//     }
// }

function getEmptyCredentials() {
    return {
        // _id: utilService.makeId(),
        username: '',
        password: '',
        fullname: ''
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


