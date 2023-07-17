// import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'


export const messageService = {
  add,
  query,
  remove
}

function query(filterBy) {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`review${queryStr}`)
  return storageService.query('message')
}

async function remove(messageId) {
  // await httpService.delete(`review/${reviewId}`)
  await storageService.remove('message', messageId)
}

async function add({txt, aboutUserId}) {
  // const addedReview = await httpService.post(`review`, {txt, aboutUserId})
  
  const aboutUser = await userService.getById(aboutUserId)

  const messageToAdd = {
    txt,
    byUser: userService.getLoggedinUser(),
    aboutUser: {
      _id: aboutUser._id,
      fullname: aboutUser.fullname,
      imgUrl: aboutUser.imgUrl
    }
  }

  messageToAdd.byUser.score += 10
  await userService.update(messageToAdd.byUser)
  const addedMessage = await storageService.post('message', messageToAdd)
  return addedMessage
}