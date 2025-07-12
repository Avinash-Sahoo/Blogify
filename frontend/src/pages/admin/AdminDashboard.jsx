import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { handleError, handleSuccess } from "../../utilis/toast";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

const AdminDashboard = () => {

    const navigate = useNavigate()

    const handleLogout = ()=>{
        handleSuccess("Admin Logout Successfully")
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminName")
        setTimeout(()=>{
            navigate("/admin/login")
        },1000)
    }
    const handleBackend = ()=>{
     
        axios.get("https://blogify-api-lake.vercel.app/admin/dashboard",{
            headers : {
                "authorization" : localStorage.getItem("adminToken")
            }
        })
        .then((response)=>{
  
           let {success} = response.data

           if(success === false){
            localStorage.removeItem("adminToken")
            localStorage.removeItem("adminName")
            navigate("/admin/login")
           }

          //  console.log(response.data)
        
        })
        .catch((error)=> {
            return handleError("Something Went Wrong")
        })
    }
    
    useEffect(()=>{
        handleBackend()
    },[])
  return (
    <>
    {/* <header className="p-3 bg-dark text-white">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <span className="fs-4 text-white">AshCode</span>
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 align-items-center justify-content-center mb-md-0">
          <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
          <li><Link to="/products" className="nav-link px-2 text-white">Products</Link></li>
          <li><Link to="#" className="nav-link px-2 text-white">Pricing</Link></li>
          <li><Link to="#" className="nav-link px-2 text-white">FAQs</Link></li>
          <li><Link to="#" className="nav-link px-2 text-white">About</Link></li>
        </ul>

       
        <div className="text-end">
          <button onClick={handleLogout} type="button" className="btn btn-warning">Logout</button>
        </div>
           

        
      </div>
    </div>
  </header> */}

  <div className="d-flex" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Sidebar */}
      <aside className="bg-white border-end p-3" style={{ width: "250px" }}>
        <h3 className="text-primary mb-4 text-center">📝 BlogAdmin</h3>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/admin/dashboard" className="nav-link text-dark fw-bold">
              <i className="bi bi-speedometer2 me-2"></i>Dashboard
            </Link> 
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/users" className="nav-link text-dark">
              <i className="bi bi-people me-2"></i>Users
            </Link>
          </li>
          {/* <li className="nav-item mb-2">
            <Link to="#" className="nav-link text-dark">
              <i className="bi bi-pencil-square me-2"></i>Posts
            </Link>
          </li> */}
          {/* <li className="nav-item mb-2">
            <Link to="#" className="nav-link text-dark">
              <i className="bi bi-tags me-2"></i>Categories
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="#" className="nav-link text-dark">
              <i className="bi bi-chat-dots me-2"></i>Comments
            </Link>
          </li> */}
          <li className="nav-item mt-4" onClick={handleLogout}>
            <Link className="nav-link text-danger">
              <i className="bi bi-box-arrow-right me-2"></i>Logout
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        {/* Top Navbar */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Dashboard</h2>
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-bell-fill fs-5 position-relative">
              <span
                className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
                style={{ width: "8px", height: "8px" }}
              ></span>
            </i>
            <img
              src="/images/adminPic.avif"
              alt="User"
              className="rounded-circle border"
              width="40"
              height="40"
            />
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-muted">Total Posts</h5>
                <h2 className="text-primary">320</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-muted">Comments</h5>
                <h2 className="text-success">1,200</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-muted">Users</h5>
                <h2 className="text-danger">180</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Posts Table */}
        {/* <div className="card shadow-sm border-0">
          <div className="card-header bg-white fw-bold">Latest Posts</div>
          <div className="card-body p-0">
            <table className="table table-hover m-0">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { title: "Intro to React", author: "John", status: "Published", date: "2025-06-10" },
                  { title: "Using Bootstrap 5", author: "Alice", status: "Draft", date: "2025-06-09" },
                  { title: "SEO Basics", author: "Mark", status: "Published", date: "2025-06-08" },
                ].map((post, idx) => (
                  <tr key={idx}>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>
                      <span
                        className={`badge ${
                          post.status === "Published" ? "bg-success" : "bg-warning text-dark"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td>{post.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}
      </main>
    </div>

    
      {/* <h1 className="admin-heading">Welcome to Admin Page</h1> */}
      <ToastContainer />
    </>
  );
};

export default AdminDashboard;
