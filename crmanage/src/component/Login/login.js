import { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserLogin } from "../../redux/apiservices/authservice";
import { authenticate, login } from "../../redux/taskslice";

const Login = () => {
  const [show, setShow] = useState(false);
  const [logaccess,setLogaccess] =useState(true)
  let dispatch = useDispatch();
  let data = useSelector((state) => state.task);
  let navigate = useNavigate();
  const showpass = () => {
    setShow(!show);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters long")
        .required("Required"),
    }),

    onSubmit: (values) => {
      UserLogin("/login", "post", dispatch, values).then(async(res) => {
        
        sessionStorage.setItem("Access", res.data.token);
        dispatch(login(res.data));
        dispatch(authenticate(res.data.token));
        setLogaccess(!logaccess)
       await res.data.roles === "ADMIN"
          ? navigate("/dashboard")
          : navigate("/view/task", {
              state: { email: res.data.email, role: res.data.roles },
            });
      });
    },
  });

  // useEffect(() => {
  //   let Tokendata = data?.access;
  //   if (Tokendata?.roles) {
  //     Tokendata?.roles === "ADMIN"
  //     ? navigate("/dashboard")
  //     : navigate("/view/task", {
  //         state: { email: Tokendata.email, role: Tokendata.roles },
  //       });
  //   }
  // }, [data?.access]);
  return (
    <>
      <div className="tasklogin">
        <form className="tasklogin" onSubmit={formik.handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="enter your email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          ></input>
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          <br></br>
          <label>Password</label>
          <input
            type={show ? "text" : "password"}
            placeholder="enter your password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          ></input>

          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          <br></br>
          <button className="loginbutton" type="submit">
            Login
          </button>
        </form>
        <button className="hide" onClick={() => showpass()}>
          Show
        </button>
        <div>
          if not Registered, <Link to="/register">Register</Link>
        </div>
      </div>
    </>
  );
};
export default Login;
