const joi = require("joi")

const signupValidation = (req,res,next)=>{

const schema = joi.object({
    name : joi.string().min(4).max(15).required(),
    email: joi.string().email().required(),
    password : joi.string().min(6).max(15).required()
})

const {error} = schema.validate(req.body)

if(error){
    return res.json({
        msg : "Bad Request",
        error
    })
}

next();

}

const loginValidation = (req,res,next)=>{

const schema = joi.object({
    email: joi.string().email().required(),
    password : joi.string().min(6).max(15).required()
})

let {error} = schema.validate(req.body)

if(error){
    return res.json({
        msg : "Bad Submit request",
        error
        
    })
}

next();

}

const adminLoginValidation = (req,res,next)=>{
    const schema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().min(6).max(15).required()
    })

    const {error} = schema.validate(req.body)
    if(error){
        return res.json({
            msg : "Bad Submit request",
            error
        })
    }
    next();
}

module.exports = {signupValidation, loginValidation,adminLoginValidation}

