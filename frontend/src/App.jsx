// import "./App.css";
import { Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useState } from "react";
import RefreshHandler from "./utilis/RefreshHandler";
// import Products from "./pages/Products";
import Api from "./pages/Api";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AiChat from "./pages/AiChat";
import Blogs from "./pages/Blogs";
import WriteBlog from "./pages/WriteBlog";
import BlogPage from "./pages/BlogPage";
import MyPosts from "./pages/MyPosts";
// import AuthorizationHandler from "./utilis/authorizationHandler";

function App() {
  const navigate = useNavigate()
  const [isAuthenticated , setIsAuthenticated] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)

const ProtectedRoute = ({element})=>{
  if(isAuthenticated){
    return element
  }

  navigate("/login")
}
// const ProtectedRoute = ({element})=>{
//   return isAuthenticated ? element : <Navigate to="/login"/>
// }

  const PrivateAdminRoute = ({element})=>{
    return isAuthorized ? element : <Navigate to="/admin/login"/>

  }
  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} setIsAuthorized ={setIsAuthorized}/>
    
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/api" element={<Api/>} />
      <Route path="/aichat" element={<ProtectedRoute element={<AiChat/>}/>} />
      <Route path="/blogs" element={<ProtectedRoute element={<Blogs/>} />} />
      <Route path="/write" element={<ProtectedRoute element={<WriteBlog/>} />} />
      <Route path="/blog/:id" element={<ProtectedRoute element={<BlogPage/>} />} />
      <Route path="/myposts" element={<ProtectedRoute element={<MyPosts/>} />} />
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
