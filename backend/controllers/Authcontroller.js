const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/usermodel");

const signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.json({
        success: false,
        msg: "User Alerady Exist You need to login",
      });
    }

    const hashuserPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashuserPassword,
    });

    return res.json({
      success: true,
      msg: "User Registered Successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: "Internal Registration Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.json({
        success: false,
        msg: "Invalid Email Or Password"
      });
    }

    const matchPassword = await bcrypt.compare(password, userExist.password)

    if(!matchPassword){
      return res.json({
        success: false,
        msg: "Invalid Email Or Password"

      })
    }

    const token = jwt.sign({
      "_id" : userExist._id,
      "email" : userExist.email

    },process.env.JWT_SECRET,{
      expiresIn : "1h"
    })

    return res.json({
      success: true,
      msg: "Login Successful",
      token,
      loggedInUser : {
        "_id" : userExist._id,
        "name" : userExist.name,
        "email" : userExist.email

      }
      
    })

  } catch (error) {
    return res.json({
      success: false,
      msg: "Internal login Server error",
    });
  }
};

const adminLogin = async (req,res)=>{
  try {
    let {email,password} = req.body
    
    const adminExist = await User.findOne({email , role:"ADMIN"})

    if(!adminExist) {
      return res.json({
        success : false,
        msg : "Invalid Credentials not a admin"
      })
    }

    const matchPassword = await bcrypt.compare(password,adminExist.password)
    if(!matchPassword){
      return res.json({
        success : false,
        msg : "Invalid Credentials"
      })
    }

    const adminToken = jwt.sign({
      "_id" : adminExist._id,
      "name" : adminExist.name,
      "email" : adminExist.email,
      "role" : adminExist.role
    },process.env.JWT_SECRET_ADMIN,{ expiresIn: "1h"})


    return res.json({
      success : true,
      msg : "Admin Login Successfully",
      adminToken,
      adminDetail : {
        "_id" : adminExist._id,
        "name" : adminExist.name,
        "email" : adminExist.email,
        
      }

    })
    
  } catch (error) {

    return res.json({
      success : false,
      msg : "Something Went Wrong"
    })
    
  }

};

module.exports = { signup, login, adminLogin };
