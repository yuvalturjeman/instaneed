import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

const PAGE_SIZE = 3


async function query(filterBy) {
    try {
        //todo : build criteria
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('story')
        var storyCursor = await collection.find()


        const stories = storyCursor.toArray()
        return stories
    } catch (err) {
        logger.error('cannot find stories', err)
        throw err
    }
}

// function _buildCriteria(filterBy) {
//     var criteria = {}

//     if (filterBy.username) {
//         const regex = new RegExp(filterBy.username, 'i')
//         criteria.$or = [
//             { 'user.username': { $regex: regex } },
            
//         ];
//     }
//     return criteria
// }

async function getById(storyId) {
    try {
        // const pipeLine = _aggregationPipeLine(storyId)
        const collection = await dbService.getCollection('story')
        const story = await collection.findOne({_id: ObjectId(storyId)})
        return story
    } catch (err) {
        logger.error(`while finding story ${storyId}`, err)
        throw err
    }
}

// function _aggregationPipeLine(storyId) {
//     return [
//         { $match: { _id: storyId } },
//         {
//             $lookup: {
//                 from: 'user',
//                 foreignField: '_id',
//                 localField: 'host',
//                 as: 'host',
//             },
//         },
//         {
//             $addFields: {
//                 host: { $arrayElemAt: ['$host', 0] }
//             }
//         },
//         {
//             $project: {
//                 'host.password': 0
//             }
//         },
//         {
//             $lookup: {
//                 from: 'review',
//                 foreignField: '_id',
//                 localField: 'reviews',
//                 as: 'reviews',
//             },
//         },
//     ]
// }

async function remove(storyId) {
    try {
        const collection = await dbService.getCollection('story')
        await collection.deleteOne({ _id: storyId })
        return storyId
    } catch (err) {
        logger.error(`cannot remove story ${storyId}`, err)
        throw err
    }
}

async function add(story) {
    try {
        const collection = await dbService.getCollection('story')
        await collection.insertOne(story)
        return story
    } catch (err) {
        logger.error('cannot insert story', err)
        throw err
    }
}

async function update(story) {
    try {
        const storyToSave = {
            txt: story.txt,
            imgUrls: story.imgUrls
        }
        const collection = await dbService.getCollection('story')
        await collection.updateOne({ _id: story._id }, { $set: storyToSave })
        return story
    } catch (err) {
        logger.error(`cannot update stay ${story.id}`, err)
        throw err
    }
}

async function addStoryComment(storyId, comment) {
    try {
        const collection = await dbService.getCollection('story')
        await collection.updateOne({ _id: ObjectId(storyId) }, { $push: { comments: comment } })
        return comment
    } catch (err) {
        logger.error(`cannot add story comment ${storyId}`, err)
        throw err
    }
}

async function removeStoryComment(storyId, commentId) {
    try {
        const collection = await dbService.getCollection('story')
        await collection.updateOne({ _id: ObjectId(storyId) }, { $pull: { comments: { id: commentId } } })
        return commentId
    } catch (err) {
        logger.error(`cannot add story comment ${storyId}`, err)
        throw err
    }
}


export const storyService = {
    remove,
    query,
    getById,
    add,
    update,
    removeStoryComment,
    addStoryComment
    // addStayMsg,
    // removeStayMsg
}