const Users = require("../models/usermodel")


const adminDashboard = (req,res)=>{
    return res.json({
        success : true,
        msg: "Admin dashboard successfully"
    })
}

const adminAllUsers = async(req,res)=>{
    try {
        const allAdmins = await Users.find({role : "ADMIN"})
        const allUsers = await Users.find({role : "USER"})
        return res.json({
            success : true,
            msg : "All Users Found Successfully",
            allAdmins,
            allUsers
        })
        
    } catch (error) {
        return res.json({
            success : false,
            msg : "internal Error"
        })
    }
}

module.exports = {adminDashboard,adminAllUsers}