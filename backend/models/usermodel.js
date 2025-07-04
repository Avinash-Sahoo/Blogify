const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    role:{
        type : String,
        required : true,
        default : "USER",
        enum : ["USER" , "ADMIN"]
    }

})

const User = mongoose.model("users",userSchema)

module.exports = User;