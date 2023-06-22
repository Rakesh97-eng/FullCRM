import mongoose from "mongoose";

let Schema =  mongoose.Schema();

export const TaskSchema =  new mongoose.Schema({
    email:{type:"String"},
    task:{type:"String"},
    desc:{type:"String"},
    status:{type:"String"},
    date:{type:Date}
})

let Taskmodel = mongoose.model('task',TaskSchema)

export default Taskmodel;