// import "./App.css";
import { Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useState } from "react";
import RefreshHandler from "./utilis/refreshHandler";
import Products from "./pages/Products";
import Api from "./pages/Api";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
// import AuthorizationHandler from "./utilis/authorizationHandler";

function App() {
  // const navigate = useNavigate()
  const [isAuthenticated , setIsAuthenticated] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)

  const PrivateRoute = ({element})=>{

    return isAuthenticated ? element : <Navigate to="/login" />

  }

  const PrivateAdminRoute = ({element})=>{
    return isAuthorized ? element : <Navigate to="/admin/login"/>

  }

  
  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} setIsAuthorized ={setIsAuthorized}/>
    
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/api" element={<Api/>} />
      <Route path="/products" element={<PrivateRoute element={<Products/>}/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/Dashboard" element={<PrivateAdminRoute element={<AdminDashboard />}/>} />
      <Route path="/admin/users" element={<PrivateAdminRoute element={<AdminUsers />}/>} />
      
    </Routes>

    {/* <AuthorizationHandler setIsAuthorized ={setIsAuthorized} /> */}


    
    </>
  );
}

export default App;
