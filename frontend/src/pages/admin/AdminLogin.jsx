import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utilis/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    background: '#ffffff',
    padding: '40px 30px',
    borderRadius: '15px',
    boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  wrapper: {
    background: 'linear-gradient(135deg, #4b6cb7, #182848)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  title: {
    fontSize: '28px',
    color: '#333',
    marginBottom: '10px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '25px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '10px',
    transition: 'border 0.3s',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#4b6cb7',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#3a539b',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '14px',
  },
  link: {
    color: '#4b6cb7',
    textDecoration: 'none',
    margin: '0 5px',
    cursor: 'pointer',
  },
};

const AdminLogin = () => {

  const navigate = useNavigate()

  const [hover, setHover] = useState(false);
  const [adminLoginInfo , setAdminLoginInfo] = useState({
    email : "",
    password : ""
  })

  const handleChange=(e)=>{
   let {name , value} = e.target
  //  console.log(name , value)
   const copyAdminLogin = {...adminLoginInfo}
   copyAdminLogin[name] = value
   setAdminLoginInfo(copyAdminLogin)
  //  console.log(adminLoginInfo)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    let {email , password} = adminLoginInfo
    if(!email || !password){
      return handleError("Email or Password is Required")
    }
      axios.post("http://localhost:3000/auth/admin/login",adminLoginInfo)
      .then((result)=> {
        // console.log(result.data)
        let {success , msg , error , adminToken , adminDetail} = result.data
        
        if(success){
          handleSuccess(msg)
          localStorage.setItem("adminToken",adminToken)
          localStorage.setItem("adminName",adminDetail.name)
          setTimeout(()=>{

             navigate("/admin/dashboard")

          },2000)
        }
         else if(error){
          let {message} = error.details[0]
          return handleError(message)
        }
        else if (success === false){
          return handleError(msg)
        }
       

      })
      .catch((err)=>{
        return handleError("Something went wrong")
      })
      
  }

  return (
    <div style={styles.wrapper}>
      <form style={styles.container} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Welcome Admin</h2>
        <p style={styles.subtitle}>Please login to your Admin account</p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          style={styles.input}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          style={styles.input}
          onChange={handleChange}
        />

        <button
          type="submit"
          style={hover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Login
        </button>

        {/* <div style={styles.footer}>
          <a style={styles.link} href="#">Forgot Password?</a>
          <span> | </span>
          <a style={styles.link} href="#">Create Account</a>
        </div> */}
      </form>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
