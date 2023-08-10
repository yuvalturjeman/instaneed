
import { storageService } from './async-storage.service.js'
import stories from '../data/backup-stories.json'
import { utilService } from './util.service.js'
import { STORAGE_KEY_LOGGEDIN_USER, userService } from './user.service.js'


const STORAGE_KEY = 'story'
let gStories
_createStories()

export const storyService = {
  query,
  getById,
  save,
  remove,
  getEmptyStory,
  addStoryMsg,
  getDefaultFilter,
  getEmptyComment,
}
window.cs = storyService



async function query() {
  var stories = await storageService.query(STORAGE_KEY)
  return stories
 
}



function getById(storyId) {
  try {
    return storageService.get(STORAGE_KEY, storyId)
  } catch (error) {
    console.log(`could not get story with ${storyId}`)
}

}

async function remove(storyId) {
  
  await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
  var savedStory
  if (story._id) {
    savedStory = await storageService.put(STORAGE_KEY, story)
  } else {
    savedStory = await storageService.post(STORAGE_KEY, story)
  }
  return savedStory
}

function getEmptyStory() {
  const user = userService.getLoggedinUser() ? userService.getLoggedinUser() : userService._createGuest()
  return {
      txt: "",
    imgUrls: "",
    by: userService.getLoggedinUser(),
        comments: [],
        likes:[]
    }

    
    // comments: [],
    // likedBy:[]
  }


async function addStoryMsg(storyId, txt) {
  // Later, this is all done by the backend
  const story = await getById(storyId)
  if (!story.msgs) story.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser().username,

  }
  story.msgs.push(msg)
  await storageService.put(STORAGE_KEY, story)

  return msg
}

function getDefaultFilter() {
  return { txt: '', location: '', tags: '' }
}

function getEmptyComment() {

  return {
    _id: utilService.makeId(),
    by: {
      username: userService.getLoggedinUser().username,
      userImg:  userService.getLoggedinUser().userImg
    },
    txt: "",
    likedBy: []
  }
}

function _createStories() {
  gStories = utilService.loadFromStorage(STORAGE_KEY)
  if (gStories && gStories.length > 0) return
  gStories = stories
  _saveStories()
}

function _saveStories() {
  utilService.saveToStorage(STORAGE_KEY, gStories)
}
