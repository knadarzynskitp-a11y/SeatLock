import express from 'express'
import { createEventController, takeEventsController } from '../controllers/eventController.js'
import { checkLogged } from '../middleware/checkLogged.js'

const router = express.Router()

router.get('/', takeEventsController)
router.post('/event', checkLogged, createEventController)

export default router
