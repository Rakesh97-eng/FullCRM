import mongoose from "mongoose";


const UserAuth = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    roles:[String]
})

 const userAuth = mongoose.model('users',UserAuth);

 export default userAuth;
