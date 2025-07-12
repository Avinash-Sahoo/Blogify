const express = require("express")
const { checkUserAuth } = require("../middlewares/checkuserAuth")
const Blog = require("../models/blogmodel")

const router = express.Router()

router.get("/aichat",checkUserAuth,(req,res)=>{
   return res.json({
    success : true,
    msg : "AI chat page successfully"
   })
})
router.get("/products",checkUserAuth,(req,res)=>{
    res.json([
        {
            "product" : "Mobile",
            "Price" : "10000"
        },
        {
            "product" : "TV",
            "Price" : "15000"
        },
        {
            "product" : "Fridge",
            "Price" : "20000"
        },
    ])
})

router.post("/write",checkUserAuth,async(req,res)=>{

    let {title,excerpt,content,tags,readTime,designation} = req.body
   
    try {
        await Blog.create({title,excerpt,content,tags,readTime,designation
            ,createdBy : req.user._id
        })
        return res.json({
            success : true,
            msg: "Blog Created SuccessFully"

        })

        
    } catch (error) {
         return res.json({
            error,
            msg: "Internal Server Error"

        })
        
    }
})

router.get("/blogs",checkUserAuth,async(req,res)=>{
try {

    const allBlogs = await Blog.find({}).populate("createdBy")
    return res.json({
        success : true,
        allBlogs
    })
    
} catch (error) {
    return res.json({
        error,
        msg: "Internal Server Error"
    })
    
}
})

router.get("/blog/:id",checkUserAuth,async(req,res)=>{
    let {id} = req.params
    try {
        const currentBlog = await Blog.findById(id).populate("createdBy")
        return res.json({
           success : true,
           currentBlog
        })
        
    } catch (error) {

        return res.json({
            error,
            msg: "Internal Server Error"
        })
        
    }
})

router.get("/mypost",checkUserAuth,async(req,res)=>{
    try {

        const myPosts = await Blog.find({createdBy: req.user._id}).populate("createdBy")
        return res.json({
            success : true,
            myPosts

        })
        
    } catch (error) {
         return res.json({
            error,
            msg: "Internal Server Error"
        })
        
    }
})

router.post("/mypost/delete/:id",async(req,res)=>{
    let {id} = req.params
    try {
     
        await Blog.findByIdAndDelete({"_id" : id})
        return res.json({
            success : true,
            msg : "Post Deleted SuccessFully"
        })

        
    } catch (error) {

        return res.json({
            error,
            msg: "Internal Server Error"
        })
        
    }

})


// router.get("/admin",checkAdminAuth,(req,res)=>{
//     return res.json({
//         success : true,
//         msg: "Admin dashboard successfully"
//     })
// })

module.exports=router