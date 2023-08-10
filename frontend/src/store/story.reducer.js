import { storyService } from "../services/story.service.local"

export const SET_STORIES = 'SET_STORIES'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
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

        default:
    }
    return newState
}
