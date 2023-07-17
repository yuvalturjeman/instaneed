
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
    getDefaultFilter
}
window.cs = storyService


async function query(filterBy = { txt: '' }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(storyId) {
    return httpService.get(`story/${storyId}`)
}

async function remove(storyId) {
    return httpService.delete(`story/${storyId}`)
}
async function save(story) {
    var savedStory
    if (story._id) {
        savedStory = await httpService.put(`story/${story._id}`, story)

    } else {
        savedStory = await httpService.post('story', story)
    }
    return savedStory
}

async function addStoryMsg(storyId, txt) {
    const savedMsg = await httpService.post(`story/${storyId}/msg`, { txt })
    return savedMsg
}

function getDefaultFilter() {
    return { txt: ''}
}

function getEmptyStory() {



    return {
        _id: utilService.makeId(),
        txt: "",
        imgUrls:"https://images.pexels.com/photos/17243147/pexels-photo-17243147.jpeg?auto=compress&cs=tinysrgb&w=600",
        by:{
          _id: utilService.makeId(),
          fullname: "Guest",
          username: "Guest",
          imgUrl:"https://images.pexels.com/photos/17243147/pexels-photo-17243147.jpeg?auto=compress&cs=tinysrgb&w=600",
  
        },
        comments: [],
        likedBy:[]
    }
  }
 





















// function _createStories() {
//     [
   
//         {
//             "_id": "s101",
//             "txt": "Best trip ever",
//             "imgUrls":"https://images.pexels.com/photos/17239929/pexels-photo-17239929.jpeg?auto=compress&cs=tinysrgb&w=600" ,
//             "by": {
//                 "_id": "u101",
//                 "fullName": "Dudi Udi",
//                 "userName": "Dudiu",
//                 "imgUrl": "https://images.pexels.com/photos/17239929/pexels-photo-17239929.jpeg?auto=compress&cs=tinysrgb&w=600"
//             },
//               "comments": [
//                 {
//                   "id": "c1001",
//                   "by": {
//                     "_id": "u105",
//                     "fullName": "Bobo Ubo",
//                     "userName": "bubuou",
//                     "imgUrl": "https://images.pexels.com/photos/17153146/pexels-photo-17153146.jpeg?auto=compress&cs=tinysrgb&w=100"
//                   },
//                   "txt": "picture to profileeeeee!!!!",
//                   "likedBy": [ 
//                     {
//                       "_id": "u105",
//                       "fullName": "Bobo Ubo",
//                       "userName": "bubuou",
//                       "imgUrl": "https://images.pexels.com/photos/17153146/pexels-photo-17153146.jpeg?auto=compress&cs=tinysrgb&w=100"
//                     }
//                   ]
//                 },
//                 {
//                   "id": "c1002",
//                   "by": {
//                     "_id": "u106",
//                     "fullName": "Guko_gok",
//                     "userName": "gukoG",
//                     "imgUrl": "https://images.pexels.com/photos/17239929/pexels-photo-17239929.jpeg?auto=compress&cs=tinysrgb&w=600"
//                   },
//                   "txt": "not good!"
//                 },
//                 {
//                   "id": "c1003",
//                   "by": {
//                     "_id": "u107",
//                     "fullName": "alby_baba",
//                     "userName": "albyba",
//                     "imgUrl": "https://images.pexels.com/photos/17239929/pexels-photo-17239929.jpeg?auto=compress&cs=tinysrgb&w=600"
//                   },
//                   "txt": "great nature!",
//                   "likedBy": [ 
//                     {
//                       "_id ": "u105",
//                       "fullName": "Bobo Ubo",
//                       "userName": "bubuou",
//                       "imgUrl": "https://images.pexels.com/photos/17153146/pexels-photo-17153146.jpeg?auto=compress&cs=tinysrgb&w=100"
//                     }
//                   ]
//                 }
//               ],
//               "likedBy": [
//                 {
//                   "_id": "u105",
//                   "fullName": "Bobo Ubo",
//                   "userName": "bubuou",
//                   "imgUrl": "https://images.pexels.com/photos/17153146/pexels-photo-17153146.jpeg?auto=compress&cs=tinysrgb&w=100"
//                 },
//                 {
//                   "_id": "u106",
//                   "fullName": "Guko_gok",
//                   "userName": "gukoG",
//                   "imgUrl": "https://images.pexels.com/photos/17239929/pexels-photo-17239929.jpeg?auto=compress&cs=tinysrgb&w=600"
//                 }
//               ],
//               "tags": ["fun", "romantic"]
//             },
       
//         {
//             "_id": "s102",
//             "txt": "Travelling around the world",
//             "imgUrls":"https://images.pexels.com/photos/17243147/pexels-photo-17243147.jpeg?auto=compress&cs=tinysrgb&w=600",
      
//             "by": {
//                 "_id": "u112",
//                 "fullName": "Davit Pok",
//                 "userName": "davitp",
//                 "imgUrl": "https://images.pexels.com/photos/17243147/pexels-photo-17243147.jpeg?auto=compress&cs=tinysrgb&w=600"
//             },
//               "comments": [
//                 {
//                   "id": "c1004",
//                   "by": {
//                     "_id": "u109",
//                     "fullName": "Laura Laoren",
//                     "userName": "laura_len",
//                     "imgUrl": "https://images.pexels.com/photos/17239929/pexels-photo-17239929.jpeg?auto=compress&cs=tinysrgb&w=600"
//                   },
//                   "txt": "amazing mountains, how was the weather?",
//                   "likedBy": [ 
//                     {
//                       "_id": "u105",
//                       "fullName": "Bobo Ubo",
//                       "userName": "bubuou",
//                       "imgUrl": "https://images.pexels.com/photos/17153146/pexels-photo-17153146.jpeg?auto=compress&cs=tinysrgb&w=100"
//                     }
//                   ]
//                 },
//                 {
//                   "id": "c1005",
//                   "by": {
//                     "_id": "u106",
//                     "fullName": "Guko_gok",
//                     "userName": "gukoG",
//                     "imgUrl": "https://images.pexels.com/photos/17239929/pexels-photo-17239929.jpeg?auto=compress&cs=tinysrgb&w=600"
//                   },
//                   "txt": "amazing picture, seems like a very nice place!"
//                 }
//               ],
//               "likedBy": [
//                 {
//                   "_id": "u105",
//                   "fullName": "Bobo Ubo",
//                   "imgUrl": "https://images.pexels.com/photos/17153146/pexels-photo-17153146.jpeg?auto=compress&cs=tinysrgb&w=100"
//                 },
//                 {
//                   "_id": "u106",
//                   "fullName": "Guko_gok",
//                   "userName": "bubuou",
//                   "imgUrl": "https://images.pexels.com/photos/17239929/pexels-photo-17239929.jpeg?auto=compress&cs=tinysrgb&w=600"
//                 }
//               ],
//               "tags": ["fun", "romantic"]
//             },
      
//         {
//             "_id": "s103",
//             "txt": "Best friend ever",
//             "imgUrls":"https://images.pexels.com/photos/17153146/pexels-photo-17153146.jpeg?auto=compress&cs=tinysrgb&w=600",
           
//             "by": {
//                 "_id": "u115",
//                 "fullName": "Uki Muki",
//                 "imgUrl": "https://images.pexels.com/photos/17153146/pexels-photo-17153146.jpeg?auto=compress&cs=tinysrgb&w=100"
//             },
    
//               "comments": [
//                 {
//                   "id": "c1006",
//                   "by": {
//                     "_id": "u105",
//                     "fullName": "Bobo Ubo",
//                     "userName": "bubuou",
//                     "imgUrl": "https://images.pexels.com/photos/17153146/pexels-photo-17153146.jpeg?auto=compress&cs=tinysrgb&w=100"
//                   },
//                   "txt": "we should do it again!",
//                   "likedBy": [
//                     {
//                       "_id": "u105",
//                       "fullName": "Bobo Ubo",
//                       "userName": "bubuou",
//                       "imgUrl": "https://images.pexels.com/photos/17153146/pexels-photo-17153146.jpeg?auto=compress&cs=tinysrgb&w=100"
//                     }
//                   ]
//                 },
//                 {
//                   "id": "c1007",
//                   "by": {
//                     "_id": "u106",
//                     "fullName": "Guko_gok",
//                     "userName": "gukoG",
//                     "imgUrl": "https://images.pexels.com/photos/17239929/pexels-photo-17239929.jpeg?auto=compress&cs=tinysrgb&w=600"
//                   },
//                   "txt": "miss you already girls!!!"
//                 }
//               ],
//               "likedBy": [
//                 {
//                   "_id": "u105",
//                   "fullName": "Bobo Ubo",
//                   "imgUrl": "https://images.pexels.com/photos/17153146/pexels-photo-17153146.jpeg?auto=compress&cs=tinysrgb&w=100"
//                 },
//                 {
//                   "_id": "u106",
//                   "fullName": "Guko_gok",
//                   "userName": "bubuou",
//                   "imgUrl": "https://images.pexels.com/photos/17239929/pexels-photo-17239929.jpeg?auto=compress&cs=tinysrgb&w=600"
//                 },
//                 {
//                   "id": "c1008",
//                   "by": {
//                     "_id": "u101",
//                     "fullName": "Dudi Udi",
//                     "userName": "Dudiu",
//                     "imgUrl": "https://images.pexels.com/photos/17239929/pexels-photo-17239929.jpeg?auto=compress&cs=tinysrgb&w=600"
//                   },
//                   "txt": "me toooooooo!!! lets do something this weekend!"
//                 }
//               ],
//               "tags": ["fun", "romantic"]
//             }
//     ]
//     storageService._save(STORAGE_KEY, story)
//   }



