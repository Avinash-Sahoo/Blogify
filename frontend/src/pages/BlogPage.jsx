import { useEffect, useState } from 'react';
import { FaHeart, FaComment, FaCalendarAlt, FaClock, FaCode, FaRobot, FaServer, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBlogs from '../components/NavBlogs';
import { useParams } from 'react-router-dom';
import { handleError } from '../utilis/toast';
import axios from "axios"
import { Spinner } from 'react-bootstrap';
import { format } from "date-fns";

const BlogPage = () => {

  const {id} = useParams()
  const [blogData , setBlogData] = useState(null)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const oneBlog = ()=>{
    axios.get(`https://blogify-api-lake.vercel.app/blog/${id}`,{
      headers:{
        "authentication" : localStorage.getItem("token")
      }}).then((response)=>{
        let {success,msg,error} = response.data
 
        if(success === false){
           localStorage.removeItem("token")
           localStorage.removeItem("loggedInUser")
           navigate("/login")
        }
        else if(error){
            return handleError(msg)
        }
        setBlogData(response.data)

      }).catch((err)=>{
        return handleError("Something Went Wrong !")
      })
  }

  useEffect(()=>{
    oneBlog()
  },[])

  return (
    <>
    <NavBlogs/>
    {
        blogData === null ? 
        <Spinner/>
        :  <div className="container mt-5 py-5">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="card border-0 shadow-lg"
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        {/* Header Section */}
        <motion.div 
          variants={fadeIn}
          className="card-header bg-white py-4 px-4 px-md-5 border-0"
        >
          <motion.h1 
            className="display-5 fw-bold mb-3"
            style={{ color: '#2c3e50' }}
          >
            {blogData.currentBlog.title}
          </motion.h1>
          
          <div className="d-flex flex-wrap gap-2 mb-4">

             {blogData.currentBlog.tags.split(",").map((tag,index)=>(
            <motion.span 
              variants={fadeIn}
              key={index}
              className="badge bg-light text-dark d-flex align-items-center gap-2"
              style={{ padding: '8px 12px', borderRadius: '8px' }}
            >
              <FaCode /> {tag}
            </motion.span>
            ))}
            
          </div>
          
          <motion.div 
            variants={fadeIn}
            className="d-flex flex-wrap align-items-center gap-4 text-muted"
          >
            <div className="d-flex align-items-center gap-2">
              <div className="profile_text bg-primary me-2 text-white">
              {blogData.currentBlog.createdBy["name"][0]}
            </div>
              <span className="fw-bold text-dark">{blogData.currentBlog.createdBy["name"]}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaCalendarAlt />
              <span>{format(new Date(blogData.currentBlog.createdAt), 'MMMM d, yyyy')}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaClock />
              <span>{blogData.currentBlog.readTime}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          variants={fadeIn}
          className="card-body px-4 px-md-5 py-4"
        >
          <motion.p 
            variants={fadeIn}
            className="lead mb-4"
          >
            {blogData.currentBlog.content}
          </motion.p>

        </motion.div>

        {/* Footer Section */}
        <motion.div 
          variants={fadeIn}
          className="card-footer bg-light border-0 py-4 px-4 px-md-5"
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-3">
            </div>
            <div className="text-muted small">
              Last updated: {format(new Date(blogData.currentBlog.updatedAt), 'MMMM d, yyyy')}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
    }
   
    </>
  );
};

export default BlogPage;
