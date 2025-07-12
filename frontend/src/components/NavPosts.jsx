import {useNavigate } from "react-router-dom";
import { handleSuccess } from "../utilis/toast";
import { ToastContainer } from "react-toastify";
import { Navbar,Nav,Container,Button,Offcanvas} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { PenTool} from "lucide-react";
import Footer from "./Footer";

const NavPosts = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logout Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <>

     <Navbar key='md' expand='md' className="bg-body-tertiary px-4">
          <Container fluid>
            <PenTool className="me-2 text-primary" size="30px"/><Navbar.Brand href="/" className="fs-3">Blogify</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-'md'`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-'md'`}
              aria-labelledby={`offcanvasNavbarLabel-expand-'md'`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-'md'`} className="fw-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Blogify
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1">
                  <Nav.Link href="/" className=" fw-medium" style={{fontSize:"1.2rem"}}>Home</Nav.Link>
                  <Nav.Link href="/blogs" className="fw-medium" style={{fontSize:"1.2rem"}}>Blogs</Nav.Link>
                  <Nav.Link href="/write" className="fw-medium" style={{fontSize:"1.2rem"}}>Write</Nav.Link>
                  <Nav.Link href="/aichat" className="fw-medium"  style={{fontSize:"1.2rem"}}>AI Chat</Nav.Link>
                  <Nav.Link href="/myposts" className="text-primary fw-medium" style={{fontSize:"1.2rem"}}>My Posts</Nav.Link>
                </Nav>
                {
                  localStorage.getItem("token") ? <Button variant="dark" onClick={handleLogout}>Logout</Button>    
               : <>
                <Button variant="outline-dark" className="me-3" onClick={()=>navigate("/login")}>Login</Button>
               <Button variant="dark" onClick={()=>navigate("/signup")}>Get Started</Button>
               </> 
                }
              
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    {/* <div className="text-dark"  style={{backgroundColor : "#e6edff"}}> */}
       
     
      {/* Hero Section */}
      {/* <HomeHero /> */}
      {/* </div> */}
        
      

      <ToastContainer />
    </>
  );
};

export default NavPosts;
