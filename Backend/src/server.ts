import {Server} from 'http'
import mongoose from 'mongoose';
import app from './app';
import { envVars } from './config/env';

let server: Server;

const startServer = async ()=>{
    try{
        console.log(envVars.NODE_ENV);
        await mongoose.connect(envVars.DB_URI);
        console.log("Connected to DB");

        server = app.listen(envVars.PORT, ()=>{
            console.log(`Server is listenning to ${envVars.PORT}`)
        })
        
    }catch(error){
        console.log(error);
    }
}

(()=>{
    startServer()
})()


process.on("unhandledRejection", (err)=>{
    console.log("Unhanlded Rejection detect. Server Shuting down", err)
    if(server){
        server.close(()=>{
            process.exit(1);
        });
    }
    process.exit(1);
})

// unhandle rejection error
// promise.rejection(new Error("I forgot to catch this error"))

process.on("uncaughtException", (err)=>{
    console.log("Uncaught Exception detect. Server Shuting down", err)
    if(server){
        server.close(()=>{
            process.exit(1);
        });
    }
    process.exit(1);
})

// uncaught exception error
// throw new Error("I forgot to handle local error")


process.on("SIGTERM", ()=>{
    console.log("Sigterm signal recieved. Server Shuting down")
    if(server){
        server.close(()=>{
            process.exit(1);
        });
    }
    process.exit(1);
})


process.on("SIGINT", ()=>{
    console.log("SIGINT signal recieved. Server Shuting down")
    if(server){
        server.close(()=>{
            process.exit(1);
        });
    }
    process.exit(1);
})


