import express from 'express';
import * as Controllers from '../controllers/hallController.js';
import { checkLogged } from '../middleware/checkLogged.js';

const router = express.Router();

router.post('/hall', checkLogged, Controllers.createHallController)

export default router;
