const jwt = require("jsonwebtoken")

const checkUserAuth = (req,res,next)=>{

    const auth = req.headers["authentication"]
    

    if(!auth){
        return res.json({
            success : false,
            msg : "Need a valid token You need to login"
        })
    }

    try {
       
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded
        next();
        
    } catch (error) {
        return res.json({
            success : false,
            msg : "Invalid token or expired token"

        })
        
    }
    

}

const checkAdminAuth = (req,res,next)=>{
    const auth = req.headers["authorization"]
    if(!auth){
        return res.json({
            success : false,
            msg : "Need a valid token You need to admin login"
        })
    }

    try {
        const decoded = jwt.verify(auth,process.env.JWT_SECRET_ADMIN)
        req.user = decoded
        next();
        
    } catch (error) {
        return res.json({
            success : false,
            msg : "Invalid token or expired token"
        })
        
    }
}

module.exports = {checkUserAuth,checkAdminAuth}