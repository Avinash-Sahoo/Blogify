import NavWrite from "../components/NavWrite"
import { FaTimes, FaGlobe, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { handleError, handleSuccess } from "../utilis/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const WriteBlog = () => {
  const navigate = useNavigate()
  const [postInfo,setPostInfo] = useState({
    title : "",
    excerpt: "",
    content : "",
    tags: "",
    readTime: ""
  })

  const handleChange = (e)=>{
    let {name , value} = e.target
    const copyPostInfo = {...postInfo}
    copyPostInfo[name] = value
    setPostInfo(copyPostInfo)
  }
  const handleSubmit =(e)=>{
    e.preventDefault()
    let {title , excerpt , content , tags , readTime} = postInfo

    if(!title || !excerpt || !content || !tags || !readTime){
      return handleError("All Fields Required")

    }
    axios.post("https://blogify-api-lake.vercel.app/write",postInfo,{
      headers:{
        "authentication" : localStorage.getItem("token")
      }})
      .then((response)=>{
        console.log(response.data)
        let {success,msg,error} = response.data

        if(success === false){
           localStorage.removeItem("token")
           localStorage.removeItem("loggedInUser")
           navigate("/login")
        }
        else if(error){
          return handleError(msg)
        }

        handleSuccess("Blog Post Created SuccessFully")
        
        setTimeout(()=>{
           navigate("/blogs")
        },1000)
        

      }).catch((err)=>{
        return handleError("Something Went Wrong !")
      })

  }

  return (
    <>
    <NavWrite/>
    <div className="container py-5 d-flex justify-content-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card border-0 p-4 p-md-5"
        style={{
          width: '100%',
          maxWidth: '800px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
          borderRadius: '12px',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ color: '#2c3e50' }}>Create New Post</h1>
          <p className="text-muted">Share your thoughts with the Blogify community</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="mb-4">
            <label htmlFor="postTitle" className="form-label fw-bold" style={{ color: '#2c3e50' }}>Title</label>
            <input
              type="text"
              className="form-control p-3"
              id="postTitle"
              name="title"
              onChange={handleChange}
              placeholder="Enter your post title..."
              style={{
                borderRadius: '10px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#f8f9fa',
                transition: 'all 0.3s ease',
                boxShadow: 'none'
              }}
            />
          </div>

          {/* Excerpt Field */}
          <div className="mb-4">
            <label htmlFor="postExcerpt" className="form-label fw-bold" style={{ color: '#2c3e50' }}>Excerpt</label>
            <textarea
              className="form-control p-3"
              id="postExcerpt"
              name="excerpt"
              onChange={handleChange}
              rows="3"
              placeholder="Write a brief description of your post..."
              style={{
                borderRadius: '10px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#f8f9fa',
                transition: 'all 0.3s ease',
                boxShadow: 'none'
              }}
            ></textarea>
          </div>

          {/* Content Field */}
          <div className="mb-4">
            <label htmlFor="postContent" className="form-label fw-bold" style={{ color: '#2c3e50' }}>Content</label>
            <textarea
              className="form-control p-3"
              id="postContent"
              name="content"
              onChange={handleChange}
              rows="8"
              placeholder="Write your full post content here..."
              style={{
                borderRadius: '10px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#f8f9fa',
                transition: 'all 0.3s ease',
                boxShadow: 'none'
              }}
            ></textarea>
          </div>

          {/* Tags Field */}
          <div className="mb-4">
            <label htmlFor="postTags" className="form-label fw-bold" style={{ color: '#2c3e50' }}>Tags</label>
            <div className="d-flex flex-column gap-2">
              <input
                type="text"
                className="form-control p-3"
                id="postTags"
                name="tags"
                onChange={handleChange}
                placeholder="e.g. React, JavaScript, Web Development"
                style={{
                  borderRadius: '10px',
                  border: '1px solid #e0e0e0',
                  backgroundColor: '#f8f9fa',
                  transition: 'all 0.3s ease',
                  boxShadow: 'none'
                }}
              />
              <p className="">Seperate Tags With Commas (Max 2 tags)</p>
                <label htmlFor="postTags" className="form-label fw-bold" style={{ color: '#2c3e50' }}>Field of Work</label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="e.g. Software Engineer"
                name="designation"
                onChange={handleChange}
                style={{
                  borderRadius: '10px',
                  border: '1px solid #e0e0e0',
                  backgroundColor: '#f8f9fa',
                  transition: 'all 0.3s ease',
                  boxShadow: 'none'
                }}
              />
               <label htmlFor="postTags" className="form-label fw-bold" style={{ color: '#2c3e50' }}>Read Time</label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="e.g. 5 min read"
                name="readTime"
                onChange={handleChange}
                style={{
                  borderRadius: '10px',
                  border: '1px solid #e0e0e0',
                  backgroundColor: '#f8f9fa',
                  transition: 'all 0.3s ease',
                  boxShadow: 'none'
                }}
              />
            </div>
          </div>

          <hr className="my-5" style={{ borderColor: '#e0e0e0' }} />

          {/* Action Buttons */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center">
              {/* <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  id="englishPost"
                  defaultChecked
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer'
                  }}
                />
                <label className="form-check-label fw-bold d-flex align-items-center" htmlFor="englishPost" style={{ color: '#2c3e50' }}>
                  <FaGlobe className="me-2" /> English Post
                </label>
              </div> */}
            </div>
            <div className="d-flex gap-2">
              {/* <motion.button
                type="button"
                className="btn btn-outline-secondary px-4 py-2 fw-bold d-flex align-items-center gap-2"
                style={{ borderRadius: '8px' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaTimes /> Cancel
              </motion.button> */}
              <motion.button
                type="submit"
                className="btn btn-primary px-4 py-2 fw-bold d-flex align-items-center gap-2"
                style={{ borderRadius: '8px' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaPaperPlane /> Post
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
    <ToastContainer />
    </>
  );
};

export default WriteBlog;
