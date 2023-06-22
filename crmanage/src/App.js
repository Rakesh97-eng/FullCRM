import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./component/Login/login";
import Register from "./component/register/register";
import Header from "./component/home/header";

import { routes } from "./routes";
import { Protected } from "./protected";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NotFound from "./component/My404Component/My404Component";
import { authenticate } from "./redux/taskslice";

function App() {
  // let [token, setToken] = useState({});
  let dispatch = useDispatch()
  let { access } = useSelector((state) => state.task);

  useEffect(() => {
    if(sessionStorage.getItem('Access')){
      let localtoken = sessionStorage.getItem('Access');
      dispatch(authenticate(localtoken))
    }
 
  }, []);

  const userRoutes = (routearr) => {
    return routearr.map((routes) => {

      if (routes.role.includes(access?.role)) {
      return  <Route path={routes.path} element={<routes.component />} />;
      }
     
    });
  };
  return (
    <>
      <BrowserRouter>
  
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        
        <Protected>
          <Header/>
          <Routes>{userRoutes(routes)}</Routes>
        </Protected>
      </BrowserRouter>
    </>
  );
}

export default App;
