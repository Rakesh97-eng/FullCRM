import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DeleteTask,
  GetUserTask,
  UpdateUserTask,
} from "../redux/apiservices/authservice";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";

const ViewTask = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let userEmail = location.state.email;
  let { userTask } = useSelector((state) => state.task);
  console.log(userTask, "taskdelete");
  const [taskdelete, setTaskdelete] = useState(false);
  useEffect(() => {
    GetUserTask("task", "get", userEmail, dispatch);
  }, [userEmail, taskdelete]);

  const handleDelete = async (mail) => {
    await DeleteTask("task", "delete", mail);
    setTaskdelete(!taskdelete);
  };

  const addtask = () => {
    navigate("/dashboard/createtask", {
      state: { email: location.state.email },
    });
  };
  const changeStatus = (e, data) => {
    let changgedValue = {
      task: e.target.value,
      id: data._id,
    };
    UpdateUserTask("task", "put", changgedValue, dispatch);
  };
  return (
    <>
      <table id="producttable">
        <tr>
          <th>
            Task{" "}
            {/* {location.state.role === "USER" && ( */}
              <span
                style={{  cursor: "pointer" }}
               
                onClick={() => addtask()}
              >
                 <AddIcon/>
              </span>
            {/* )} */}
          </th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        {userTask.length > 0 ? (
          userTask?.map((data) => {
            return (
              <tr key={data._id}>
                <td>{data.task}</td>
                <td>
                  <select onChange={(e) => changeStatus(e, data)}>
                    <option>{data.status}</option>
                    <option value="inprogress"> inprogress</option>
                    <option value="completed">completed</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDelete(data._id)}>Delete</button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>No data found</tr>
        )}
      </table>
    </>
  );
};

export default ViewTask;
