import { Application, Request, Response } from "express";
import express from 'express'
import cors from 'cors'
import { router } from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";

const app:Application = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:["http://localhost:5173"]
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