import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "../utilis/toast";
import { ToastContainer } from "react-toastify";
import { Navbar,Nav,Container,Button,Offcanvas} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { PenTool} from "lucide-react";

const Home = () => {
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
    <div className="text-dark"  style={{backgroundColor : "#e6edff"}}>
        <Navbar fixed="top" key='md' expand='md' className="bg-body-tertiary mb-3 px-4">
          <Container fluid>
            <PenTool className="me-2 text-primary" size="30px"/><Navbar.Brand href="#" className="fs-3">Blogify</Navbar.Brand>
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
                  <Nav.Link href="/products" className="fw-medium" style={{fontSize:"1.2rem"}}>Blogs</Nav.Link>
                  <Nav.Link href="/" className="fw-medium"  style={{fontSize:"1.2rem"}}>Services</Nav.Link>
                  <Nav.Link href="/" className="fw-medium" style={{fontSize:"1.2rem"}}>Contact Us</Nav.Link>
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
      <div className="container text-center mt-5 px-2" style={{padding: "6rem 0"}} >
        <div className="mb-4 text-center d-flex justify-content-center">
          <span className="fs-1 text-primary"><PenTool className="text-primary" size="4rem"/></span>
        </div>
        <h1 className="fw-bold display-5 display-md-4 "style={{fontSize: "3rem"}}>
          Write Blogs That <br />
          <span className="text-primary" style={{fontSize: "3rem"}}>Solve Real Problems</span>
        </h1>
        <p className="lead mt-4 mx-auto fw-normal" style={{ maxWidth: "720px", color : "#4b5563",fontWeight:"300" }}>
          Join thousands of bloggers creating helpful content that makes a
          difference. Our platform helps you craft problem-solving articles that
          genuinely help your readers overcome challenges and achieve their
          goals.
        </p>
        <div className="mt-4 d-flex flex-column flex-sm-row justify-content-center gap-3">
          <button className="btn btn-dark btn-lg">
            Start Writing Today →
          </button>
          <button className="btn btn-outline-secondary btn-lg">
            Explore Success Stories
          </button>
        </div>
        <p className="mt-4 text-muted small">
          Join 50,000+ bloggers • No credit card required • Free forever plan
        </p>
      </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Home;

//  <header classNameName="p-3 bg-dark text-white">
//     <div classNameName="container">
//       <div classNameName="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
//         <a href="/" classNameName="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
//           <span classNameName="fs-4 text-white">AshCode</span>
//         </a>

//         <ul classNameName="nav col-12 col-lg-auto me-lg-auto mb-2 align-items-center justify-content-center mb-md-0">
//           <li><Link to="/" classNameName="nav-link px-2 text-secondary">Home</Link></li>
//           <li><Link to="/products" classNameName="nav-link px-2 text-white">Products</Link></li>
//           <li><Link to="#" classNameName="nav-link px-2 text-white">Pricing</Link></li>
//           <li><Link to="#" classNameName="nav-link px-2 text-white">FAQs</Link></li>
//           <li><Link to="#" classNameName="nav-link px-2 text-white">About</Link></li>
//         </ul>

//         {
//           (localStorage.getItem("token")) ?
//           <div classNameName="text-end">
//           {/* <button type="button" classNameName="btn btn-outline-light me-2">Login</button> */}
//           <button onClick={handleLogout} type="button" classNameName="btn btn-warning">Logout</button>
//         </div>
//            :
//           <div classNameName="text-end">
//           <button type="button" classNameName="btn btn-outline-light me-2" onClick={()=>navigate("/login")}>Login</button>
//           <button type="button" classNameName="btn btn-warning" onClick={()=>navigate("/signup")}>Sign-up</button>
//         </div>

//         }

//       </div>
//     </div>

//   </header>

//    <nav classNameName="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
//   <div classNameName="container-fluid px-3 px-lg-5">
//     {/* Logo */}
//     <a classNameName="navbar-brand fw-bold d-flex align-items-center" href="#">
//       <span classNameName="text-primary fs-3 me-2">🖋️</span> BlogHelper
//     </a>

//     {/* Mobile Toggle */}
//     <button
//       classNameName="navbar-toggler"
//       type="button"
//       data-bs-toggle="collapse"
//       data-bs-target="#navbarNav"
//       aria-controls="navbarNav"
//       aria-expanded="false"
//       aria-label="Toggle navigation"
//     >
//       <span classNameName="navbar-toggler-icon"></span>
//     </button>

//     {/* Collapsible Navbar Content */}
//     <div classNameName="collapse navbar-collapse justify-content-between" id="navbarNav">
//       {/* Center Nav Links */}
//       <ul classNameName="navbar-nav mx-auto mb-2 mb-lg-0">
//         <li classNameName="nav-item px-2">
//           <a classNameName="nav-link" href="#">Features</a>
//         </li>
//         <li classNameName="nav-item px-2">
//           <a classNameName="nav-link" href="#">How It Works</a>
//         </li>
//         <li classNameName="nav-item px-2">
//           <a classNameName="nav-link" href="#">Success Stories</a>
//         </li>
//         <li classNameName="nav-item px-2">
//           <a classNameName="nav-link" href="#">Pricing</a>
//         </li>
//         <li classNameName="nav-item px-2">
//           <a classNameName="nav-link" href="#">Blog</a>
//         </li>
//       </ul>

//       {/* Buttons aligned to right */}
//       <div classNameName="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
//         <button classNameName="btn btn-outline-dark w-100 w-lg-auto">Sign In</button>
//         <button classNameName="btn btn-dark w-100 w-lg-auto">Get Started</button>
//       </div>
//     </div>
//   </div>
// </nav>
