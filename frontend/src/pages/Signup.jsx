import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../utilis/toast";
import { useState } from "react";
import axios from "axios";

const Signup = () => {

  const navigate = useNavigate()


  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    // console.log(name , value)
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { name, email, password } = signupInfo;
    if (!name || !email || !password)  return handleError("name or email or password is required");
    
    

    axios
      .post("https://blogify-api-lake.vercel.app/auth/signup", signupInfo)
      .then((result) => {
        console.log(result);
        let { success, msg, error } = result.data;
        if (success) {
         handleSuccess(msg);
          setTimeout(()=>{

             navigate('/login', { replace: true }); 

          },2000)

        } else if (error) {
          return handleError(error.details[0].message);
        } else if (success === false) {
          return handleError(msg);
        }
      })
      .catch((error) => {
        return handleError("Registration Error Please Try Again");
      });
  };

  return (
    <div className="contain">
      <form className="form" onSubmit={handleSubmit}>
        <h2>SignUp</h2>

        <label>Name</label>
        <input
          type="text"
          onChange={handleChange}
          name="name"
          className="input"
        />

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
          Register
        </button>
        <div className="already">
          Already Have An Account
          <Link className="link" to="/login"> Login</Link>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Signup;
