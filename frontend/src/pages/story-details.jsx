import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { showErrorMsg } from "../services/event-bus.service"
import { storyService } from "../services/story.service.local"  
import { DetailsGallery } from "../cmps/details-gallery"
import { DetailsHeader } from "../cmps/details-header"




export function StoryDetails() {

    const [story, setStory] = useState(null)
    const { storyId } = useParams()

    const navigate = useNavigate()


    useEffect(() => {
        loadStory()
    }, [])

    function loadStory() {
        storyService.getById(storyId)
            .then((story) => setStory(story))
            .catch((err) => {
                console.log('Had issues in story details', err)
                showErrorMsg('Cannot load story')
                navigate('/')
            })
    }

    if (!story) return <h1>loadings....</h1>

    return <div className='story-details'>
        <DetailsHeader story={story} />
        <DetailsGallery story={story} />








        <Link className="btn" to="/">Back</Link>
    </div>
}
