import NotFound from "./component/My404Component/My404Component";
import CreateTask from "./component/createTask/createtask";
import Dashboard from "./component/dashborad/dashboard";
import Profile from "./component/profile/profile";
import Register from "./component/register/register";
import ViewTask from "./viewTask/viewtask";

export const routes = [
   
    {
        path:'/dashboard',
        component:Dashboard,
        role:["ADMIN"]
        
    },
    {
        path:'/profile',
        component:Profile,
        role:["USER"]
        
    },{
        path:'/dashboard/createtask',
        component:CreateTask,
        role:["ADMIN","USER"]
    },
    {
        path:'/view/task',
        component:ViewTask,
        role:["ADMIN","USER"]
    },
    {
        path:'/register',
        component:Register,
        role:["ADMIN"]
    },
    {
        path:'*',
        component:NotFound,
        role:["ADMIN","USER"]
    }
]