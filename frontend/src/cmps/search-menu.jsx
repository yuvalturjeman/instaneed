import { useDispatch } from "react-redux";

import { StoryFilter } from "./story-filter";
import { FILTER_BY } from "../store/story.reducer";

export function SearchMenu({}) {

    const dispatch = useDispatch()

    function onSetFilter(filterToEdit) {
        dispatch({ type: FILTER_BY, filterToEdit })
    }

    return (
        <div className="search-form-menu-btn-container">
            <StoryFilter onSetFilter={onSetFilter} />
        </div>
    )
}
