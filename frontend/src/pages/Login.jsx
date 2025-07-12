import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../utilis/toast";
import { useState } from "react";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate()


  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = loginInfo;
    if ( !email || !password) {
     return handleError("email or password is required");
    }

    axios
      .post("http://localhost:3000/auth/login", loginInfo)
      .then((result) => {
        let { success, msg, error,token,loggedInUser } = result.data;
        if (success) {
         handleSuccess(msg);
         localStorage.setItem("token",token)
         localStorage.setItem("loggedInUser",loggedInUser.name)
          setTimeout(()=>{

             navigate('/', { replace: true }); 

          },2000)

        } else if (error) {
          return handleError(error.details[0].message);
        } else if (success === false) {
          return handleError(msg);
        }
      })
      
      .catch((error) => {
        return handleError("login Error Please Try Again");
      });
  };

  return (
    <div className="contain">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          onChange={handleChange}
          name="email"
          className="input"
        />

        <label>Password</label>
        <input
          type="password"
          onChange={handleChange}
          name="password"
          className="input"
        />

        <button type="submit" className="button">
          Login
        </button>
        <div className="already">
          Create an account
          <Link className="link" to="/signup"> SignUp</Link>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
