import {dbService} from '../../services/db.service.mjs'
import {logger} from '../../services/logger.service.mjs'
import {asyncLocalStorage} from '../../services/als.service.mjs'
import mongodb from 'mongodb'
const {ObjectId} = mongodb

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('message')
        // const reviews = await collection.find(criteria).toArray()
        var messages = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'byUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    localField: 'aboutUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'aboutUser'
                }
            },
            {
                $unwind: '$aboutUser'
            }
        ]).toArray()
        messages = messages.map(message => {
            message.byUser = { _id: message.byUser._id, fullname: message.byUser.fullname }
            message.aboutUser = { _id: message.aboutUser._id, fullname: message.aboutUser.fullname }
            delete message.byUserId
            delete message.aboutUserId
            return message
        })

        return messages
    } catch (err) {
        logger.error('cannot find messages', err)
        throw err
    }

}

async function remove(messageId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('message')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(messageId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const {deletedCount} = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove message ${messageId}`, err)
        throw err
    }
}


async function add(message) {
    try {
        const messageToAdd = {
            byUserId: ObjectId(message.byUserId),
            aboutUserId: ObjectId(message.aboutUserId),
            txt: message.txt
        }
        const collection = await dbService.getCollection('message')
        await collection.insertOne(messageToAdd)
        return messageToAdd
    } catch (err) {
        logger.error('cannot insert message', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
    return criteria
}

export const messageService = {
    query,
    remove,
    add
}


