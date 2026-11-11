import express from 'express'
import { createEventController } from '../controllers/eventController.js'
import { checkLogged } from '../middleware/checkLogged.js'

const router = express.Router()

router.post('/event', checkLogged, createEventController)

export default router
