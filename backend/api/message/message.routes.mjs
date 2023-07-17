import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'

import {addMessage, getMessages, deleteMessage} from './message.controller.mjs'
const router = express.Router()

router.get('/', log, getMessages)
router.post('/',  log, requireAuth, addMessage)
router.delete('/:id',  requireAuth, deleteMessage)

export const messageRoutes = router

