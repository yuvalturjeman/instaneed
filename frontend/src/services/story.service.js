
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    getEmptyStory,
    addStoryMsg,
    addStoryComment,
    removeStoryComment
    // getDefaultFilter
}
window.cs = storyService


async function query(filterBy = { txt: '' }) {
    return httpService.get('story/', filterBy)
}

function getById(storyId) {
    return httpService.get(`story/${storyId}`)
}

async function remove(storyId) {
    return httpService.delete(`story/${storyId}`)
}
async function save(story, loggedinUser) {
    var savedStory
    if (story._id) {
        savedStory = await httpService.put(`story/${story._id}`, {story, loggedinUser})

    } else {
        savedStory = await httpService.post('story', {story, loggedinUser})
    }
    return savedStory
}

async function addStoryMsg(storyId, txt) {
    const savedMsg = await httpService.post(`story/${storyId}/msg`, { txt })
    return savedMsg
}


// added
async function addStoryComment(storyId, txt) {
    const savedComment = await httpService.post(`story/${storyId}/comment`, { txt })
    return savedComment
}

async function removeStoryComment(storyId, commentId) {
    const savedComment = await httpService.post(`story/${storyId}/comment/${commentId}`)
    return savedComment
}

// function getDefaultFilter() {
//     return { txt: ''}
// }

// function getEmptyStory() {



//     return {
//         _id: utilService.makeId(),
//         txt: "",
//         imgUrls:"https://images.pexels.com/photos/17243147/pexels-photo-17243147.jpeg?auto=compress&cs=tinysrgb&w=600",
//         by:{
//           _id: utilService.makeId(),
//           fullname: "Guest",
//           username: "Guest",
//           userImg:"https://images.pexels.com/photos/17243147/pexels-photo-17243147.jpeg?auto=compress&cs=tinysrgb&w=600",
  
//         },
//         comments: [],
//         likedBy:[]
//     }
//   }
 
  
function getEmptyStory() {
    return {
        txt: '',
        imgUrls: '',
        comments: [],
        likedBy: [],
      
    }
}