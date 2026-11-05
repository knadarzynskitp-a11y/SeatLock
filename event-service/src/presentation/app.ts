import express from 'express'
import helmet from 'helmet'
import { connectDatabase } from '../infrastructure/database/db.js';
const app = express();
app.use(helmet())

connectDatabase();

export default app;