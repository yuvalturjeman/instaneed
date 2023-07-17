import {logger} from '../../services/logger.service.mjs'
import {socketService} from '../../services/socket.service.mjs'
import {userService} from '../user/user.service.mjs'
import {authService} from '../auth/auth.service.mjs'
import {messageService} from './message.service.mjs'

export async function getMessages(req, res) {
    try {
        const messages = await messageService.query(req.query)
        res.send(messages)
    } catch (err) {
        logger.error('Cannot get messages', err)
        res.status(400).send({ err: 'Failed to get messages' })
    }
}

export async function deleteMessage(req, res) {
    try {
        const deletedCount = await messageService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove message' })
        }
    } catch (err) {
        logger.error('Failed to delete message', err)
        res.status(400).send({ err: 'Failed to delete message' })
    }
}


export async function addMessage(req, res) {
    
    var {loggedinUser} = req
 
    try {
        var message = req.body
        message.byUserId = loggedinUser._id
        message = await messageService.add(message)
        
        // prepare the updated review for sending out
        message.aboutUser = await userService.getById(message.aboutUserId)
        
        // Give the user credit for adding a review
        // var user = await userService.getById(review.byUserId)
        // user.score += 10
        loggedinUser.score += 10

        loggedinUser = await userService.update(loggedinUser)
        message.byUser = loggedinUser

        // User info is saved also in the login-token, update it
        const loginToken = authService.getLoginToken(loggedinUser)
        res.cookie('loginToken', loginToken)

        delete message.aboutUserId
        delete message.byUserId

        socketService.broadcast({type: 'message-added', data: message, userId: loggedinUser._id})
        socketService.emitToUser({type: 'message-about-you', data: message, userId: message.aboutUser._id})
        
        const fullUser = await userService.getById(loggedinUser._id)
        socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})

        res.send(message)

    } catch (err) {
        logger.error('Failed to add message', err)
        res.status(400).send({ err: 'Failed to add message' })
    }
}

