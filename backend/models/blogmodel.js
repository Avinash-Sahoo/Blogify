const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true,
    },
    excerpt : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    tags : {
        type : String,
        required : true
    },
    readTime :{
        type : String,
        required : true
    },
    postType : {
        type : String,
        required : true,
        default : "latest",
        enum : ["latest","featured"]
    },
    createdBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    }
    
},{timestamps:true})


const Blog = mongoose.model("blogs",blogSchema)


module.exports = Blog;