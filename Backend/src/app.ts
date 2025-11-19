import { Application, Request, Response, RequestHandler } from "express";
import express from 'express'
import cors from 'cors'
import { router } from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import cookieParser from 'cookie-parser';

import notFound from "./middlewares/notFound";

const app:Application = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser() as RequestHandler);
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))

app.use('/api/v1', router)

app.get('/', (req:Request, res:Response)=>{
    res.status(200).json({
        message:"Welcome to CampusLoop Backend Server"
    })
})

app.use(globalErrorHandler)
app.use(notFound)

export default app;