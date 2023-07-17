import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'
import { getStories, getStoryById, addStory, updateStory, removeStory, addStoryComment, removeStoryComment } from './story.controller.mjs'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', log, getStories)
router.get('/:id', getStoryById)
router.post('/', requireAuth, addStory)
router.put('/:id', requireAuth, updateStory)
router.delete('/:id', requireAuth, removeStory)


router.post('/:id/comment', requireAuth, addStoryComment)
router.delete('/:id/comment/:commentId', requireAuth, removeStoryComment)

export const storyRoutes = router