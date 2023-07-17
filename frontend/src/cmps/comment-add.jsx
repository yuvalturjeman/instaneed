import { useRef } from 'react'
import { storyService } from '../services/story.service.local'
import { updateStory } from '../store/story.actions'
import { STORAGE_KEY_LOGGEDIN_USER, userService } from '../services/user.service'


export function CommentAdd({ story }) {
    const newComment = useRef(storyService.getEmptyComment())

    function handleChange({ target }) {
        newComment.current = { ...newComment.current, txt: target.value }
        console.log('newComment.current', newComment);
    
    }

    async function onSaveComment(ev) {
        ev.preventDefault()

        if (!newComment.current.txt) return

        newComment.current = { ...newComment.current, CreatedAt: Date.now() }
        console.log(newComment.current);
        console.log('addcomment', newComment.current);
        story.comments.push(newComment.current)
        newComment.current = storyService.getEmptyComment()
        ev.target.comment.value = ''
        try {
            const savedStory = await updateStory(story)
            console.log('savedStory', savedStory);
        }
        catch (err) {
            console.log('cant add comment', err);
        }
        finally {
            console.log('done');
        }
    }

    return (
        <form className="comment-add flex row space-between" onSubmit={onSaveComment}>
            <input className="comment-input" onChange={handleChange} type="text" name="comment" placeholder="Add a comment..." value={newComment.txt} />
            {/* <button id="post-btn" className="post-btn">Post</button> */}
        </form>
    )
} 