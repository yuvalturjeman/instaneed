import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStories } from '../store/story.actions.js'
import { loadUsers } from '../store/user.actions.js'
// import { STORAGE_KEY } from '../'

// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { storyService } from '../services/story.service.local.js'
import { userService } from '../services/user.service.js'


import { FILTER_BY } from '../store/story.reducer.js'
import { StoryList } from '../cmps/story-list.jsx'
import { useSearchParams } from 'react-router-dom'
import { useForm } from '../customHooks/useForm.js'
import { SideBar } from '../cmps/side-bar.jsx'
import { Suggested } from '../cmps/suggested.jsx'
import { AppHeader } from '../cmps/app-header.jsx'
import { storageService } from '../services/async-storage.service.js'


export function StoryIndex() {
    const dispatch = useDispatch()
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const users = useSelector(storeState => storeState.userModule.users)
    
    console.log('story index users', users);


    const [searchParams, setSearchParams] = useSearchParams()

    const [filterByToEdit, setFilterByToEdit, handleChange] =
        useForm(useSelector((storeState) => storeState.storyModule.filterBy), onSetFilter)

    const filterBy = useSelector((storeState) => storeState.storyModule.filterBy)

    useEffect(() => {
        const paramsMap = searchParams.entries()
        const filterBy = storyService.getDefaultFilter()
        for (const [key, value] of paramsMap) {
            filterBy[key] = value
        }
        setFilterByToEdit(filterBy)
    }, [])

    useEffect(() => {
        loadStories(filterBy)
        loadUsers()
    }, [filterBy])


    function onSetFilter(filterToEdit) {
        dispatch({ type: FILTER_BY, filterToEdit })
    }
  

    return (
        <div className="story-index-container">

            <div className="side-bar">
            <SideBar 
            stories={stories}
            users={users}
            />
            </div>
            
            <div className="main-content">
            {/* <AppHeader/> */}
                <StoryList
                    stories={stories}
                />
            </div>

            <div className="suggested">
                <Suggested
                    users={users}
                />   
            </div>

        </div>
    )
}