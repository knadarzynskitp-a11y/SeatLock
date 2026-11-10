import express from 'express'
import helmet from 'helmet'
import { connectDatabase } from '../infrastructure/database/db.js';
import hallRoutes from './routes/hallRoutes.js'

const app = express();
app.use(express.json())
app.use(helmet())

connectDatabase();

app.use(hallRoutes)

export default app;