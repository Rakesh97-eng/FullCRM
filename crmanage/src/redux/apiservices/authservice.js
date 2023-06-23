import axios from "axios";
import { login,authenticate, getallstore, getTask, updateTask } from "../taskslice";
//http://localhost:5050   
//http://localhost:5050/
export const UserLogin = async (url, method, dispatch, data) => {
  let logindata = await axios({
    method: method,
    url: `http://localhost:5050/auth/${url}`,
    data: data,
  });
  //  dispatch(login(logindata.data));
  //  dispatch(authenticate(logindata.data.token));
   return logindata
}

export const UserRegister = async (url, method, dispatch, data) => {
  let logindata = await axios({
    method: method,
    url: `http://localhost:5050/auth/${url}`,
    data: data,
  });
  //  dispatch(login(logindata.data));
  //  dispatch(authenticate(logindata.data.token));
   return logindata
}

export const GetallUsers = async(url,method,dispatch)=>{
  let Allusers = await axios({
    method:method,url: `http://localhost:5050/auth/${url}`
  });
  dispatch(getallstore(Allusers.data))
}

export const UserTask = async(url,method,data)=>{
  let Tasks = await axios({
    method:method,url: `http://localhost:5050/${url}`,data: data
  }).then((res)=>console.log(res.data))
}

export const GetUserTask =async(url,method,data,dispatch)=>{
 await axios({
    method:method,url: `http://localhost:5050/${url}?email=${data}`
  }).then((res)=>dispatch(getTask(res.data)))
}



export const UpdateUserTask =async(url,method,data,dispatch)=>{
  console.log(data,"fromtendupdate");
  await axios({
     method:method,url: `http://localhost:5050/${url}`,data:data
   }).then((res)=>{
    console.log(res,"updated")
    dispatch(updateTask(res.data))
   })
  
 }

export const DeleteTask = async(url,method,data)=>{
  console.log(url,method,data);
  await axios({
    method:method,url: `http://localhost:5050/${url}?email=${data}`
  }).then((res)=>console.log(res.data))
}