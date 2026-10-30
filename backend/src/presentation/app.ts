import express from "express"
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(helmet())


app.use(cors({
  origin: process.env.URL,
  credentials: true,
}));



export default app;