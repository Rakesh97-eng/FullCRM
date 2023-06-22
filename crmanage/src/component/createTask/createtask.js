import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./createTask.css";
import { useDispatch } from "react-redux";
import { UserTask } from "../../redux/apiservices/authservice";
const CreateTask = () => {
  let location = useLocation();
  let dispatch = useDispatch();
  const [task, setTask] = useState({
    task: "",
    date: "",
    status: "",
    email:''
  });
  const handlechange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const saveTask = (e) => {
    e.preventDefault();
    task.email = location.state.email;  
     UserTask('task','post',task);
     setTask({
      task: "",
      date: "",
      status: "--Status---",
      email:''
    })
  };

  return (
    
      <div className="taskform">
        <form className="form" onSubmit={(e) => saveTask(e)}>
          <label>Task</label>
          <input
            type="text"
            onChange={(e) => handlechange(e)}
            name="task"
            value={task.task}
            placeholder="Enter Task"
          ></input>{" "}
          <br></br>
          <label>Add Date</label>
          <input
            type="Date"
            onChange={(e) => handlechange(e)}
            name="date"
            value={task.date}
          ></input>
          <br></br>
          <label>Status</label>
          <select type="select" name="status" onChange={(e) => handlechange(e)}>
            <option>--Status---</option>
            <option value="progress">In progress</option>
            <option value="completed">Completed</option>
          </select>{" "}
          <br></br>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    
  );
};

export default CreateTask;
