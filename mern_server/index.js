import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Articlerouter from './Routes/ArticleRouter.js'

//server create
const server= express();

//router set up
import AuthRouter from './Routes/AuthRouter.js';


//middleware setup
server.use(express.json());
server.use(express.urlencoded());
server.use(cors({origin:"http://localhost:5173", credentials:true}));
server.use(cookieParser())
dotenv.config();

//db connect
mongoose.connect('mongodb://127.0.0.1:27017/mern_blogging')
.then(()=>console.log("DataBase Connection Success"))
.catch((err)=> console.log("Database error is "+err))



server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });

  server.use("/api",AuthRouter)
  server.use('/api/article',Articlerouter)

server.use((err,req,res,next)=>{
    err.status = err.status || 404;
    res.status(err.status).json({
        con: false,
        msg: err.message
    }) 
})

server.listen(process.env.PORT, ()=>console.log(`server is running at port ${process.env.PORT}`));

