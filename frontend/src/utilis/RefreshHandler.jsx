import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated, setIsAuthorized }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("adminToken")
    ) {
      setIsAuthenticated(true);
      setIsAuthorized(true);
     
      // console.log("both")
      if (location.pathname === "/login" || location.pathname === "/signup") {
        navigate("/");
      }
      else if(location.pathname === "/admin/login"){
        navigate("/admin/users")
      }
    } else if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      //  console.log("user")
      if (location.pathname === "/login" || location.pathname === "/signup") {
        navigate("/products");
      }
    } else if (localStorage.getItem("adminToken")) {
      setIsAuthorized(true);
      //  console.log("admin")
      if (location.pathname === "/admin/login") {
        navigate("/admin/users");
      }
    }
  }, [setIsAuthenticated, location, navigate, setIsAuthorized]);

  return null;
};

export default RefreshHandler;
