const express = require("express")
const { checkUserAuth } = require("../middlewares/checkuserAuth")
const router = express.Router()

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

// router.get("/admin",checkAdminAuth,(req,res)=>{
//     return res.json({
//         success : true,
//         msg: "Admin dashboard successfully"
//     })
// })

module.exports=router