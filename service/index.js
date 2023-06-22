import express from "express";
import task from "./router/routes.js";
import auth from './router/auth.js';
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv'

const app =express();
app.use(express.json());
app.use(dotenv.config())
app.use(cors())
app.use('/',task);
app.use('/auth',auth)

mongoose.connect(process.env.MONGO_URL)

app.listen('5050',()=>{
    console.log("Server Started");
})