import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate,Link} from "react-router-dom";
import { handleError, handleSuccess } from "../../utilis/toast";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import SpinnerComp from "../../components/Spinner";

const AdminUsers = () => {
    const navigate = useNavigate()
    const [allAdminsData,setAllAdminsData] = useState([])
    const [allUsersData,setAllUsersData] = useState([])
    const [userDelete,setUserDelete] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [userId,setUserId] = useState(null)
    const handleLogout = ()=>{
            handleSuccess("Admin Logout Successfully")
            localStorage.removeItem("adminToken")
            localStorage.removeItem("adminName")
            setTimeout(()=>{
                navigate("/admin/login")
            },1000)
        }

    const handleDelete = (id)=>{
      setIsLoading(true)
      setUserId(id)
      axios.post(`http://localhost:3000/admin/users/delete/${id}`)
      .then((result)=>{
         let {success , msg} = result.data
         if(success === false){
            setIsLoading(false)
            return handleError(msg)
         }
         console.log(result.data)
        setIsLoading(false)
         handleSuccess(msg)
         setUserDelete(!userDelete)
         
         
         
      })
      .catch((error)=>{
          setIsLoading(false)
        return handleError("User Not Deleted try again")
      })
    }
       
    const handleAllUsers = ()=>{
      axios.get("http://localhost:3000/admin/users",{
          headers : {
            "authorization" : localStorage.getItem("adminToken")
          }
      })
      .then((result)=>{

        let {success,allUsers,allAdmins} = result.data
        
        if(success){
          setAllAdminsData(allAdmins)
          setAllUsersData(allUsers)
          // console.log(result.data)
        }


       else if(success === false){
          localStorage.removeItem("adminToken")
          localStorage.removeItem("adminName")
          navigate("/admin/login")
        }
       
      })
      .catch((error)=>{
        return handleError("Something Went Wrong")
      })
    }


  useEffect(()=>{

    handleAllUsers()

  },[userDelete])
  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Sidebar */}
      <aside className="bg-white border-end p-3" style={{ width: "250px" }}>
        <h3 className="text-primary mb-4 text-center">📝 BlogAdmin</h3>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/admin/dashboard" className="nav-link text-dark">
              <i className="bi bi-speedometer2 me-2"></i>Dashboard
            </Link> 
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/users" className="nav-link text-dark fw-bold">
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
          <h2 className="fw-bold">User Dashboard</h2>
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

        <div className="card shadow-sm border-0 mb-4">
  <div className="card-header bg-white fw-bold">User List</div>
  <div className="card-body p-0">
    <table className="table table-hover mb-0">
      <thead className="table-light">
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* {[
          { id: 1, name: "john_doe", email: "john@example.com", role: "Author" },
          { id: 2, name: "jane_admin", email: "jane@example.com", role: "Admin" },
          { id: 3, name: "mark_user", email: "mark@example.com", role: "User" },
        ] */}
       { allUsersData[0] && allAdminsData[0] === null ? <h1>No Users Found</h1> 
       :<>
     { allAdminsData.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button className="btn btn-sm btn-outline-primary me-2">
                <i className="bi bi-pencil-fill"></i> Edit
              </button>
              <button className="btn btn-sm btn-outline-warning me-2">
                <i className="bi bi-slash-circle"></i> Block
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDelete(user._id)} >
                
                {userId == user._id ? 
                isLoading ? <SpinnerComp/> : 
                <>
                <i className="bi bi-trash-fill"></i> 
                <span>Delete</span> 
                </>:
                <> <i className="bi bi-trash-fill"></i> 
                <span>Delete</span>
                </>
                }
              </button>
            </td>
          </tr>
        )) }

       

       
     { allUsersData.map((user,index) => (
          <tr key={user._id}>
            <td>{index+allAdminsData.length+1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button className="btn btn-sm btn-outline-primary me-2">
                <i className="bi bi-pencil-fill"></i> Edit
              </button>
              <button className="btn btn-sm btn-outline-warning me-2">
                <i className="bi bi-slash-circle"></i> Block
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDelete(user._id)}>
                {userId == user._id ? 
                isLoading ? <SpinnerComp/> : 
                <>
                <i className="bi bi-trash-fill"></i> 
                <span>Delete</span> 
                </>:
                <> <i className="bi bi-trash-fill"></i> 
                <span>Delete</span>
                </>
                }
              </button>
            </td>
          </tr>
        )) }

        </>
        

}

      </tbody>
    </table>
  </div>
</div>

        {/* Stats Cards */}
        {/* <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-muted">My Posts</h5>
                <h2 className="text-primary">12</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-muted">Comments</h5>
                <h2 className="text-success">85</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-muted">Likes</h5>
                <h2 className="text-danger">240</h2>
              </div>
            </div>
          </div>
        </div> */}

        {/* Two Column Layout */}
        {/* <div className="row"> */}
          {/* Recent Activity */}
          {/* <div className="col-md-6 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white fw-bold">Recent Activity</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <i className="bi bi-pencil-square text-primary me-2"></i> You edited “React Hooks Guide”
                </li>
                <li className="list-group-item">
                  <i className="bi bi-chat-left-text text-success me-2"></i> Commented on “Bootstrap Tips”
                </li>
                <li className="list-group-item">
                  <i className="bi bi-hand-thumbs-up text-danger me-2"></i> Liked “Golang Basics”
                </li>
              </ul>
            </div>
          </div> */}

          {/* Profile Information */}
          {/* <div className="col-md-6 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white fw-bold">Profile Info</div>
              <div className="card-body">
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Email:</strong> john@example.com</p>
                <p><strong>Role:</strong> Blogger</p>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-gear me-1"></i> Edit Profile
                </button>
              </div>
            </div>
          </div> */}
        {/* </div> */}
      </main>
      <ToastContainer />
    </div>
  )
}

export default AdminUsers
