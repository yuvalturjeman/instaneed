import { storyService } from "../services/story.service.local"

export const SET_STORIES = 'SET_STORIES'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const ADD_TO_CART = 'ADD_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const UNDO_REMOVE_STORY = 'UNDO_REMOVE_STORY'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const FILTER_BY = 'FILTER_BY'
export const ADD_COMMENT = 'ADD_COMMENT'
export const TOGGLE_LIKE = 'TOGGLE_LIKE'

const initialState = {
    stories: [],
    // filterBy: storyService.getDefaultFilter(),
}

export function storyReducer(state = initialState, action) {
    // console.log(state)
    var newState = state
    var stories

    switch (action.type) {
        case SET_STORIES:
            newState = { ...state, stories: action.stories }
            break
        case REMOVE_STORY:
            const lastRemovedStory = state.stories.find(story => story._id === action.storyId)
            stories = state.stories.filter(story => story._id !== action.storyId)
            newState = { ...state, stories, lastRemovedStory }
            break
        case ADD_STORY:
            newState = { ...state, stories: [...state.stories, action.story] }
            break
        case UPDATE_STORY:
            stories = state.stories.map(story => (story._id === action.story._id) ? action.story : story)
            newState = { ...state, stories }
            break
     
        case FILTER_BY:
            newState = { ...state, filterBy: action.filterToEdit }
            break
            case TOGGLE_LIKE:
            const user = action.payload.user
            const story = action.payload.story
            
            const storyIndex = state.stories.findIndex((s) => s._id === story._id)
            const currentLikes = story.likedBy
            const isLiked = currentLikes.some((u) => u._id === user._id)
            const likedBy = isLiked ? currentLikes.filter((u) => u._id !== user._id) : [...currentLikes, user]
            const newStory = { ...story, likedBy }
            newState = {
                ...state,
                stories: [
                    ...state.stories.slice(0, storyIndex),
                    newStory,
                    ...state.stories.slice(storyIndex + 1)
                ]
            }
            break

        default:
    }
    return newState
}
