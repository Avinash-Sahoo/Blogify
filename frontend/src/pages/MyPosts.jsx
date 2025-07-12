import React, { useState,useEffect } from 'react';
import { FaEdit, FaTrash, FaComments, FaCalendarAlt, FaEye, FaHeart, FaFileAlt, FaEllipsisV } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavPosts from '../components/NavPosts';
import axios from "axios"
import { format } from "date-fns";
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess,handleError } from '../utilis/toast';


const MyPosts = () => {
  const [mobileView, setMobileView] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [myPost, setMyPost] = useState([]);
  const [postDelete, setPostDelete] = useState(false);

  const posts = [
    {
      id: 1,
      title: "The Future of Web Development: What's Coming in 2024",
      status: "Published",
      publishedDate: "Jan 15, 2024",
      views: 1250,
      likes: 124,
      comments: 23
    },
    {
      id: 2,
      title: "Building Scalable React Applications: Best Practices",
      status: "Published",
      publishedDate: "Jan 12, 2024",
      views: 890,
      likes: 89,
      comments: 17
    }
  ];

  const allPosts = ()=>{
    axios.get(`http://localhost:3000/mypost`,{
      headers:{
        "authentication" : localStorage.getItem("token")
      }}).then((response)=>{
        let {success,msg,error,myPosts} = response.data
 
        if(success === false){
           localStorage.removeItem("token")
           localStorage.removeItem("loggedInUser")
           navigate("/login")
        }
        else if(error){
            return handleError(msg)
        }
        
        setMyPost(myPosts)

      }).catch((err)=>{
        return handleError("Something Went Wrong !")
      })
  }

  // Check window size on render and resize
  useEffect(() => {
    allPosts()
    const handleResize = () => {
      setMobileView(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [postDelete]);


  const handleDelete = (id)=>{
    axios.post(`http://localhost:3000/mypost/delete/${id}`)
    .then((response)=>{
            let {success,msg,error} = response.data
            console.log(response.data)

           if(error){
                return handleError(msg)
            }
           handleSuccess(msg)
           setPostDelete(!postDelete)
           
    
          }).catch((err)=>{
            return handleError("Something Went Wrong !")
          })
  }
//   console.log(postDelete)
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      Published: "bg-success bg-opacity-10 text-success",
      Draft: "bg-secondary bg-opacity-10 text-secondary"
    };

    return (
      <span className={`badge ${statusStyles[status]} px-3 py-2 rounded-pill fw-medium`}>
        {status}
      </span>
    );
  };

  const toggleDropdown = (postId) => {
    setActiveDropdown(activeDropdown === postId ? null : postId);
  };

  return (
    <>

    <NavPosts/> 
    
    <div className="container py-3 py-md-5">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {/* Header */}
        <motion.div variants={item} className="mb-4">
          <h1 className="fw-bold display-5 mb-2">My Posts</h1>
          <p className="text-muted fs-5">Manage your blog posts</p>
        </motion.div>

        {/* Dashboard Card */}
        <motion.div
          variants={item}
          className="card border-0 shadow-lg mb-4"
          style={{ borderRadius: '12px' }}
        >
          <div className="card-body p-0">
            {mobileView ? (
              // Mobile View - Cards
              <div className="p-3">
                {myPost.map((post) => (
                  <motion.div
                    key={post._id}
                    variants={item}
                    className="mb-3 p-3 border rounded-3"
                    whileHover={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="d-flex align-items-center">
                        <FaFileAlt className="me-2 text-primary" />
                        <strong>{post.title}</strong>
                      </div>
                      <div className="dropdown">
                        <button 
                          className="btn btn-sm btn-light rounded-circle p-1"
                          onClick={() => toggleDropdown(post._id)}
                        >
                          <FaEllipsisV />
                        </button>
                        {activeDropdown === post._id && (
                          <div className="dropdown-menu show" style={{ position: 'absolute', right: 0 }}>
                           <Link to={`/blog/${post._id}`} style={{textDecoration:"none"}}><button className="dropdown-item d-flex align-items-center">
                              <FaEye className="me-2 text-secondary" /> Read
                            </button></Link>  
                            <button className="dropdown-item d-flex align-items-center text-danger" onClick={()=>handleDelete(post._id)}>
                              <FaTrash className="me-2" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      <StatusBadge status={post.status} />
                      <span className="d-flex align-items-center text-muted small">
                        <FaCalendarAlt className="me-1" /> {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                      </span>
                    </div>
                    
                  </motion.div>
                ))}
              </div>
            ) : (
              // Desktop View - Table
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="ps-4 py-4 fw-bold d-flex align-items-center" style={{ minWidth: '300px' }}>
                        <FaFileAlt className="me-2" /> Title
                      </th>
                      <th className="py-4 fw-bold ">Status</th>
                      <th className="py-4 fw-bold d-flex align-items-center">
                        <FaCalendarAlt className="me-2" /> Published
                      </th>
                      <th className="pe-5 py-4 fw-bold text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myPost.map((post) => (
                      <motion.tr
                        key={post._id}
                        variants={item}
                        whileHover={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          transition: { duration: 0.2 }
                        }}
                        className="border-top"
                      >
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center">
                            <div className="me-3">
                              <FaFileAlt className="text-primary" />
                            </div>
                            <div>
                              <div className="fw-semibold">{post.title}</div>
                            
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <StatusBadge status="Published" />
                        </td>
                        <td className="py-3">
                          {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                        </td>
                        <td className="pe-4 py-3 text-end">
                          <div className="d-flex justify-content-end gap-2">
                            <Link to={`/blog/${post._id}`}><motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-sm btn-light rounded-circle p-2"
                                title="Comments"
                              >
                                <FaEye className="text-primary" />
                              </motion.button>
                              </Link>  
                        <motion.button
                              onClick={()=>handleDelete(post._id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn btn-sm btn-light rounded-circle p-2"
                              title="Delete"
                            >
                              <FaTrash className="text-danger"/>
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
       <ToastContainer />
    </div>
   
    </>
  );
};

export default MyPosts;