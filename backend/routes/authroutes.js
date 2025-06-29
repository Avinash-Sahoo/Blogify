const express = require("express")
const router = express.Router()
const { signup, login, adminLogin } = require("../controllers/Authcontroller");
const { signupValidation, loginValidation, adminLoginValidation } = require("../middlewares/Authvalidation");


router.post("/signup",signupValidation,signup)
router.post("/login",loginValidation,login)
router.post("/admin/login",adminLoginValidation,adminLogin)

module.exports = router;