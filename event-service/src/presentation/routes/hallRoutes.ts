import express from 'express';
import * as Controllers from '../controllers/hallController.js';

const router = express.Router();

router.post('/hall', Controllers.createHallController)

export default router;