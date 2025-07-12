const express = require("express")
const app = express()
require("dotenv").config()
require("./models/db")
const Authrouter = require("./routes/authroutes")
const productRouter = require("./routes/staticRoutes")
const cors = require("cors")
const bodyParser = require("body-parser")
const adminRouter = require("./routes/adminroutes")



const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use("/auth",Authrouter)
app.use("/",productRouter)
app.use("/admin",adminRouter)

app.listen(port,()=>console.log(`Server Started at http://localhost:${port}/`))
