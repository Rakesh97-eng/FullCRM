import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserRegister } from "../../redux/apiservices/authservice";
import { useDispatch } from "react-redux";

const Register = () => {
    const [show,setShow] = useState(false);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [users,setUser]= useState(
      {  
        name:'',
        email: "",
        password: "",}
   
  
    )

    const handlechange = (e)=>{
     e.preventDefault();
     setUser({...users,[e.target.name]:e.target.value})
    }

    const adduser = ()=>{
      UserRegister('/register',"post",dispatch,users).then(()=>navigate('/dashboard') )
    }

    const showpass=()=>{
       setShow(!show)
    }
return (
    <>
    <div className="tasklogin">
    <label>Name</label>
      <input type="name" placeholder="enter your name" name="name"  onChange={(e)=>handlechange(e)}></input>
      <br></br>
      <label>Email</label>
      <input type="email" placeholder="enter your email" name="email" onChange={(e)=>handlechange(e)}></input>
      <br></br>
      <label>Password</label>
      <input type={show?"text":"password"} placeholder="enter your password" name="password" onChange={(e)=>handlechange(e)}></input>
      <br></br>
      <button className="loginbutton" onClick={()=>adduser()}>Register</button>
      <button className="hide" onClick={()=>showpass()}>Show</button>
     <div>Back to <Link to="/login">Login</Link></div>

    </div>

   
     
     </>
  );
};
export default Register;