import 'dotenv/config'
import express from 'express'
import { createProxyMiddleware } from "http-proxy-middleware";

const PORT = process.env.PORT || 3000;

const app = express();


app.listen(PORT, () => {
    console.log(`Server api-getaway is running on port ${PORT}`)
});