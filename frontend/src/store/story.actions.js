import { storyService } from "../services/story.service.local.js";
import { userService } from "../services/user.service.js";
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_STORY, REMOVE_STORY, SET_STORIES, UPDATE_STORY} from "./story.reducer.js";
import { SET_SCORE } from "./user.reducer.js";

// Action Creators:
export function getActionRemoveStory(storyId) {
    return {
        type: REMOVE_STORY,
        storyId
    }
}
export function getActionAddStory(story) {
    return {
        type: ADD_STORY,
        story
    }
}
export function getActionUpdateStory(story) {
    return {
        type: UPDATE_STORY,
        story
    }
}

export async function loadStories() {
    try {
        const stories = await storyService.query()
        console.log('Stories from DB:', stories)
        store.dispatch({
            type: SET_STORIES,
            stories
        })

    } catch (err) {
        console.log('Cannot load stories', err)
        throw err
    }

}

export async function removeStory(storyId) {
    try {
        await storyService.remove(storyId)
        store.dispatch(getActionRemoveStory(storyId))
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addStory(story) {
    try {
        const savedStory = await storyService.save(story)
        console.log('Added Story', savedStory)
        store.dispatch(getActionAddStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export async function updateStory(story, user) {
    try {
   const savedStory= await storyService.save(story, user)
   store.dispatch({type: UPDATE_STORY, story})

            return savedStory
        } catch(err) {
            console.log('Cannot save story', err)
            throw err
        }
}

// export function addToCart(story) {
//     store.dispatch({
//         type: ADD_TO_CART,
//         story
//     })
// }

// export function removeFromCart(storyId) {
//     store.dispatch({
//         type: REMOVE_FROM_CART,
//         storyId
//     })
// }

// export async function checkout(total) {
//     try {
//         const score = await userService.changeScore(-total)
//         store.dispatch({ type: SET_SCORE, score })
//         store.dispatch({ type: CLEAR_CART })
//         return score
//     } catch (err) {
//         console.log('StoryActions: err in checkout', err)
//         throw err
//     }
// }


// export function onRemoveStoryOptimistic(storyId) {
//     store.dispatch({
//         type: REMOVE_STORY,
//         storyId
//     })
//     showSuccessMsg('Story removed')

//     storyService.remove(storyId)
//         .then(() => {
//             console.log('Server Reported - Deleted Succesfully');
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove story')
//             console.log('Cannot load storys', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_STORY,
//             })
//         })
// }


