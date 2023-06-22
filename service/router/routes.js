import express from "express";
import Taskmodel from "../models/taskmodel.js";
import userAuth from "../models/authmodel.js";

const task = express();

task.route("/task")
    .get(async(req, res) => {
        let existinguser =await Taskmodel.find({email:req.query.email});
        res.send(existinguser);
        })

    .post(async(req,res)=>{
        let data = req.body;
       let task =  await new Taskmodel({
          "task":data.task,
          "desc":data.desc,
          "status":data.status,
          "email":data.email
        }).save();
        res.send(task)

    })
    .delete(async(req, res) => {
       Taskmodel.deleteOne({_id:req.query.email}).then(()=>res.send('Deleted'))
        })

     .put((req,res)=>{
        if(req.body.task){
        Taskmodel.updateOne({_id:req.body.id},{$set:{status:req.body.task}}).then((response)=>console.log(response))
        }
        else{
            userAuth.updateOne({_id:req.body.id},{$set:{roles:req.body.role}}).then((response)=>console.log(response))

        }
       }) 

export default task;
