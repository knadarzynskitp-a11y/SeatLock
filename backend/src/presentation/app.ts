import express from "express"
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDatabase } from "../infrastructure/database/db.js"
import authRoutes from './routes/authRoutes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(helmet())


app.use(cors({
  origin: process.env.URL,
  credentials: true,
}));

connectDatabase();

//routy
app.use("/auth", authRoutes)

export default app;