import { useEffect, useState } from "react";
import { DeleteTask, GetallUsers, UpdateUserTask } from "../../redux/apiservices/authservice";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import './admin.css'
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [update,setUpdate]=useState(true)
  let { allusers } = useSelector((state) => state.task);
  console.log("allusers", allusers);
  useEffect(() => {
    console.log("iii");
    GetallUsers("/getall", "get", dispatch);
  },[update]);
  const changeStatus = (e,data)=>{
    let changgedValue = {
      role:e.target.value,
      id:data._id
    }
    UpdateUserTask('task',"put",changgedValue,dispatch)
  }

  const handleDelete = async (id)=>{
  await DeleteTask("auth/delete", "delete", id );
   setUpdate(!update)

  }
  return (
    <>
       <button className="dash_user_btn" onClick={()=>navigate('/register')}>Add User</button>
      <table id="producttable">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Tasks Assigned</th>
          <th>Actions</th>
        </tr>
        {allusers.map((data) => {
         return <tr key={data._id}>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>
            <select onChange={(e)=>changeStatus(e,data)}>
              <option>{data.roles}</option>
              <option value="USER">"USER"</option>
              <option value="ADMIN">"ADMIN"</option>
            </select>
            </td>
            <td>
            <Link to={'/view/task'} state={{email:data.email}}>
              <button id="tablebutton">View</button>
              </Link>
            </td>
            
            <td style={{"display":'flex',justifyContent:'space-between'}}>
              <Link to={'/dashboard/createtask'} state={{email:data.email}}>
              <button id="tablebutton">Add</button>
              </Link>
              <div style={{'height':"5px",cursor:'pointer'}} onClick={()=>handleDelete(data._id)}>
              <DeleteOutlinedIcon /> 
              </div>
             
            </td>

          </tr>;
        })}
      </table>
    </>
  );
};

export default Admin;
