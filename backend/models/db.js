const mongoose = require("mongoose")
// require("dotenv").config()

mongoose.connect(process.env.MONDODB_CONNECTION).then(()=>console.log("Mongodb Connected...."))
.catch((err)=>console.log("Mongodb disconnected..",err))

