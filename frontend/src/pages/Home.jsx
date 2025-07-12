import {useNavigate } from "react-router-dom";
import { handleSuccess } from "../utilis/toast";
import { ToastContainer } from "react-toastify";
import { Navbar,Nav,Container,Button,Offcanvas} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { PenTool} from "lucide-react";
import HelpfulContent from "../components/HelpfulContent";
import HomeHero from "../components/HomeHero";
import ProblemSolvingSteps from "../components/ProblemSolvingSteps";
import ImpactStats from "../components/ImpactStats";
import SuccessStories from "../components/SuccessStories";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  const postVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

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
    <div className="text-dark"  style={{backgroundColor : "#e6edff"}}>
        <Navbar fixed="top" key='md' expand='md' className="bg-body-tertiary mb-3 px-4">
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
                  <Nav.Link href="/" className="text-primary fw-medium" style={{fontSize:"1.2rem"}}>Home</Nav.Link>
                  <Nav.Link href="/blogs" className="fw-medium" style={{fontSize:"1.2rem"}}>Blogs</Nav.Link>
                  <Nav.Link href="/write" className="fw-medium" style={{fontSize:"1.2rem"}}>Write</Nav.Link>
                  <Nav.Link href="/aichat" className="fw-medium"  style={{fontSize:"1.2rem"}}>AI Chat</Nav.Link>
                  <Nav.Link href="/myposts" className="fw-medium" style={{fontSize:"1.2rem"}}>My Posts</Nav.Link>
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
     
      {/* Hero Section */}
       <motion.div
        initial="hidden"
        animate="visible"
        variants={postVariants}
        transition={{ duration: 0.5 }}
        // className="card mb-5 border-0"
        style={{
          transition: "all 0.3s ease"
        }}
      >
      <HomeHero />
      </motion.div>
      </div>

      
        <HelpfulContent />
      

      <div className="problem_box">
        <ProblemSolvingSteps />
      </div>

      <ImpactStats />

      <SuccessStories />

      <CallToAction />

      <Footer />
        
      

      <ToastContainer />
    </>
  );
};

export default Home;
