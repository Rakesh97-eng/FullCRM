import express from "express";
import task from "./router/routes.js";
import auth from './router/auth.js';
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv'

const app =express();
app.use(express.json());
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
app.use(cors())
app.use('/',task);
app.use('/auth',auth)

mongoose.connect("mongodb+srv://rakeshraj2097:Rakesh2097@reactdev.pct0kxk.mongodb.net/")

app.listen('5050',()=>{
    console.log("Server Started");
})