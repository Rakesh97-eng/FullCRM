import express from "express";
import userAuth from "../models/authmodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Logincontroller = async (req, res) => {
  let data = req.body;
  try {
    let existinguser = await userAuth.findOne({ email: req.body.email });
    if (!existinguser) {
      throw "please REgister";
    } else {
      let originalpass = bcrypt.compareSync(
        req.body.password,
        existinguser.password
      );
      if (!originalpass) {
        throw "incorrect password";
      } else {
       
        let Token = jwt.sign({ email: data.email, role: existinguser.roles[0] }, "CRM");
        data.token = Token;
        data.roles =  existinguser.roles[0];
        res.send(data);
      }
    }
  } catch (err) {
    res.send(err);
  }
};

export const Registercontroller = async (req, res) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(req.body.password, salt);
  try {
    let data = req.body;
    await new userAuth({
      name: req.body.name,
      email: req.body.email,
      roles: req.body.roles,
      password: hash,
    }).save();
    res.status(200).json(data);
    console.log("dataaa", data);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const GetAllUsers = async (req, res) => {
  let users = await userAuth.find();
  res.send(users);
};


export const DeleteUser = async(req,res)=>{
  userAuth.deleteOne({_id:req.query.email}).then(()=>res.send('Deleted'))
}
const router = express.Router();

router.post("/login", Logincontroller);
router.post("/register", Registercontroller);
router.get("/getall", GetAllUsers);
router.delete('/delete',DeleteUser)

export default router;
