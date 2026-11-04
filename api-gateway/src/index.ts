import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { authProxy } from './proxy/authProxy.js'
import { authLimiter } from "./middleware/rateLimit.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(helmet())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use('/auth', authLimiter, authProxy)

app.listen(PORT, () => {
    console.log(`Server api-getaway is running on port ${PORT}`)
});