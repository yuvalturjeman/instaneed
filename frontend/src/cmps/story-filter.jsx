// import { useEffect, useRef, useState } from "react"
// import { useSelector } from "react-redux"

// import { utilService } from "../services/util.service"
// import { useForm } from "../customHooks/useForm"
// import { useSearchParams } from "react-router-dom"
// import { storyService } from "../services/story.service.local"




// export function StoryFilter({ onSetFilter, onSetSort }) {
//   onSetFilter = useRef(utilService.debounce(onSetFilter))


//   const [filterByToEdit, setFilterByToEdit, handleChange] =
//     // useForm(useSelector((storeState) => storeState.storyModule.filterBy), onSetFilter.current)
//     useForm(storyService.getDefaultFilter(), onSetFilter.current)
//   const [searchParams, setSearchParams] = useSearchParams()



//   const elInputRef = useRef(null)

//   useEffect(() => {
//     elInputRef.current && elInputRef.current.focus()
//   }, [])
//   function onSubmitFilter(ev) {
//     // update father cmp that filters change on submit
//     ev.preventDefault()
//     onSetFilter(filterByToEdit)
// }

//   return (
//     <section className="filter-header-section">
//       <form onSubmit={onSubmitFilter}>
//         <label htmlFor="txt">Search</label>
//         <input type="text"
//           id="txt"
//           name="txt"
//           placeholder="Search"
//           value={filterByToEdit.txt}
//           onChange={handleChange}
//         />
//       </form>

//     </section>
//   )

 

// }


import { useEffect, useRef, useState } from "react"
import { storyService } from "../services/story.service.js"
import { utilService } from "../services/util.service.js"
import { useForm } from "../customHooks/useForm.js"

export function StoryFilter({ onSetFilter }) {


    onSetFilter = useRef(utilService.debounce(onSetFilter))
    const [filterByToEdit, setFilterByToEdit, handleChange] = useForm(storyService.getDefaultFilter(), onSetFilter.current)

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])



    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }


    return <section className="story-filter full main-layout">

        <form onSubmit={onSubmitFilter}>
            <label htmlFor="txt">text:</label>
            <input type="text"
                id="txt"
                name="txt"
                placeholder="search"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />

          
            <button hidden>Filter</button>
        </form>

    </section>

}