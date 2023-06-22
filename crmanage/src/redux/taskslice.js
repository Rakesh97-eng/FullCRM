import { createSlice } from "@reduxjs/toolkit";
import { UserLogin } from "./apiservices/authservice";
import jwt_decode from "jwt-decode";

let intialvalue = {
  resdata: "",
  allusers:[],
  userTask:[],
  access:null
};

export const Taskslice = createSlice({
  name: "task",
  initialState: intialvalue,
  reducers: {
    login: (state,{payload})=>{
      state.resdata = payload;
      return state;
    },
    authenticate:(state,{payload})=>{
       let decode = jwt_decode(payload)
        state.access = decode;
        return state
    },
    getallstore:(state,{payload})=>{
      state.allusers = payload;
    },
    getTask:(state,{payload})=>{
      state.userTask = payload;
    },
    updateTask:(state,{payload})=>{
      state.userTask = payload
    }
    
  },
});

export const { login,authenticate,getallstore,getTask,updateTask } = Taskslice.actions;

export default Taskslice.reducer;

// export const data = useSelector((state) => state.task);

