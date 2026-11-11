import express from 'express'
import helmet from 'helmet'
import { connectDatabase } from '../infrastructure/database/db.js';
import hallRoutes from './routes/hallRoutes.js'
import eventRoutes from './routes/eventRoutes.js'

const app = express();
app.use(express.json())
app.use(helmet())

connectDatabase();

app.use(hallRoutes)
app.use(eventRoutes)

export default app;
