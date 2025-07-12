
import { FaHeart, FaComment, FaSearch, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBlogs from '../components/NavBlogs';
import "../components/stylesheet/Blogs.css"
import axios from "axios"
import { handleError } from '../utilis/toast';
import { useEffect, useState } from 'react';
import { format } from "date-fns";
import { Link } from 'react-router-dom';


const Blogs = () => {
  const [featured,setFeatured] = useState([])
  const [latest,setLatest] = useState([])


  const postVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardHover = {
    scale: 1.02,
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    transition: { duration: 0.3 }
  };

  const handleBlogs = ()=>{
    axios.get("https://blogify-api-lake.vercel.app/blogs",{
      headers:{
        "authentication" : localStorage.getItem("token")
      }}).then((response)=>{
        let {success,msg,error,allBlogs} = response.data
         if(success === false){
           localStorage.removeItem("token")
           localStorage.removeItem("loggedInUser")
           navigate("/login")
        }
        else if(error){
          return handleError(msg)
        }
        const featuredType = allBlogs.filter((post)=>{
          if(post.postType==="featured"){
            return post;
          }
        })
         const latestType = allBlogs.filter((post)=>{
          if(post.postType==="latest"){
            return post;
          }
        })
        setFeatured(featuredType)
        setLatest(latestType)

      }).catch((err)=>{
        return handleError("Something Went Wrong !")
      })
  }

  useEffect(()=>{
    handleBlogs()
  },[])

  return (
    <>
    <NavBlogs />
    <div className="container py-5">
      {/* Search Bar */}
      <div className="mb-5">
        <div className="input-group">
          {/* <span className="input-group-text bg-white border-end-0">
            <FaSearch />
          </span> */}
          {/* <input 
            type="text" 
            className="form-control border-start-0" 
            placeholder="Search posts, authors, or topics..." 
          /> */}
        </div>
      </div>

      {/* Categories */}
      <div className="d-flex justify-content-between mb-4">
        <h5 className='featured'>Featured Post</h5>
        <div>
          {/* <span className="me-3">
            <FaPhone className="me-1" /> Latest Articles
          </span> */}
          <span>
            <span className="border p-1 me-1">❑</span> Community Discussions
          </span>
        </div>
      </div>

      {/* Featured Post */}
{
  featured.map((post)=>(

    <Link to={`/blog/${post._id}`} style={{textDecoration : "none"}}  key={post._id}> <motion.div
        initial="hidden"
        animate="visible"
        variants={postVariants}
        transition={{ duration: 0.5 }}
        whileHover={cardHover}
        className="card mb-5 border-0"
        style={{
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease"
        }}
      >
        <div className="featured_card card-body p-4">
          <div className="d-flex align-items-center mb-3">
            <div className="profile_text bg-primary me-2 text-white">
              {post.createdBy["name"][0]}
            </div>
            <div>
              <h6 className="mb-0">{post.createdBy["name"]}</h6>
              <small className="text-muted">{post.designation}</small>
            </div>
          </div>
          
          <div className="mb-2">
            <span className="badge bg-light text-primary me-1">Featured</span>
          </div>
          
          <h3 className="post mb-3">{post.title}</h3>
          <p className="text-muted mb-4">{post.excerpt}</p>
          
          <div className="d-flex flex-wrap mb-3">
            {/* {post.tags.map((tag, index) => (
              <span key={index} className="badge bg-light text-dark me-2 mb-2">
                {tag}
              </span>
            ))} */}
            {post.tags.split(",").map((tag,index)=>(
              <span key={index} className="badge bg-light text-dark me-2 mb-2">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted me-3">{format(new Date(post.createdAt), 'MMMM d, yyyy')}</small>
              <small className="text-muted">• {post.readTime}</small>
            </div>
            <div>
              {/* <small className="me-3">
                <FaPhone className="me-1" /> {featuredPost.likes}
              </small>
              <small>
                <span className="border p-1 me-1">❑</span> {featuredPost.comments}
              </small> */}
            </div>
          </div>
        </div>
      </motion.div>
      </Link>

  ))
}
     


      {/* Latest Posts */}
      <h5 className="featured mb-4">Latest Posts</h5>
      <div className="row">

        {latest.map((post,index)=>(
          
           <motion.div
            key={post._id}
            initial="hidden"
            animate="visible"
            variants={postVariants}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={cardHover}
            className="col-md-6 mb-4"
          >
            <div 
              className="post_card card h-100 border-0"
              style={{
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease"
              }}
            >
              <Link to={`/blog/${post._id}`} style={{textDecoration : "none",display:"inline-block"}}>
              <div className="card-body p-4 text-dark">
                <div className="d-flex align-items-center mb-3">
                  <div className="profile_text bg-secondary me-2 text-white">
                    {post.createdBy["name"][0]}
                  </div>
                  <div>
                    <h6 className="mb-0">{post.createdBy["name"]}</h6>
                    <small className="text-muted">{format(new Date(post.createdAt), 'MMMM d, yyyy')}</small>
                  </div>
                </div>
                
                <h3 className="post mb-3">{post.title}</h3>
                <p className="text-muted mb-4">{post.excerpt}</p>
                
                <div className="d-flex flex-wrap mb-3">
                  {/* {post.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="badge bg-light text-dark me-2 mb-2">
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="badge bg-light text-dark me-2 mb-2">
                      *{post.tags.length - 2} more
                    </span>
                  )} */}
                  {post.tags.split(",").map((tag,index)=>(
              <span key={index} className="badge bg-light text-dark me-2 mb-2">
                {tag}
              </span>
            ))}
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{post.readTime}</small>
                  <div>
                    {/* <small className="me-3">
                      <FaHeart className="me-1" /> {post.likes}
                    </small>
                    <small>
                      <span className="border p-1 me-1">❑</span> {post.comments}
                    </small> */}
                  </div>
                </div>
              </div>
            </Link>
            </div>
          </motion.div>
          

        ))}
      </div>
    </div>
    </>
  );
};

export default Blogs;
