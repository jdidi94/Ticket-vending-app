import express from 'express';
import {json} from 'body-parser'
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from "./middleware/error-handler";
import {NotFoundError} from "./errors/not-found-error";
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import  Mongoose   from 'mongoose';
const app = express()
app.use(json())
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
            

app.get('*',async()=>{
    throw new NotFoundError()
})

const start =  async () =>{
try{await Mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
console.log("connected to mongodb")
}catch(err){
    console.error(err)
}
}

app.listen(3000,()=>{
    console.log(' hi listening on 3000')
  
})
start()