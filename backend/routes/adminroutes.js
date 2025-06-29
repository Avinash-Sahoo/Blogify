const express = require("express")
const { checkAdminAuth } = require("../middlewares/checkuserAuth")
const {adminDashboard,adminAllUsers} = require("../controllers/AdminController")
const deleteUser = require("../controllers/AdminCrud")
const router = express.Router()

router.get("/dashboard",checkAdminAuth,adminDashboard)
router.get("/users",checkAdminAuth,adminAllUsers)
router.post("/users/delete/:id",deleteUser)


module.exports = router