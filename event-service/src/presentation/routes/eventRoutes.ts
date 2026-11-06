import express from 'express';
import * as Controllers from '../controllers/eventController.js';

const router = express.Router();

router.get('/getEvents', Controllers.getEvents)

export default router;