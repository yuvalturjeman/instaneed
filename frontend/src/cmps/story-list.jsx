import { StoryPreview } from "./story-preview"
import { addStory } from "../store/story.actions";
import { userService } from "../services/user.service";
import { CarouselComponent } from "./img-preview-carousel";


export function StoryList({ stories }) {
    
    if (!stories) return <h1>no storys available</h1>
    console.log('stories', stories);


    return (
    <section className="stories">
       
    {stories.map(story => <div
        className="story"
        key={story._id}>
        <StoryPreview story={story} 
        />
    </div>)}
</section>
    )
}




