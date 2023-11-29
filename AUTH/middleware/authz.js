// 3 middlwares we need
//auth, isStudent, isAdmin
 
//next used for calling next middleware which are defined in routes

const jwt = require('jsonwebtoken');
require("dotenv").config();   
   
//this is used for authentication   
exports.authz = (req,res,next)=>{  
    try{
        //extract jwt token  
        //one of three methods to extract
        const token =  req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        if(!token){
            res.status(401).json(
                {
                    success : false,
                    message : "token not found"
                }
            )
        }

        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode);
            //all data stored in decode can be found out by this decode (email, id , role)
            //stored this user coz it contain payload and it conatin role 
            req.user = decode;

        } catch(error){
            res.status(401).json(
                {
                    success : false,
                    message : "token invalid"
                }
            )
        }

        next();


    }catch(err){
        res.status(401).json(
            {
                success : false,
                message : "something went wrong in verifying token"
            }
        )
    }
}

//there 2 are used for autorization

exports.isStudent = (req,res,next)=>{
    try{
        if(req.user.role !== 'Student'){
            return res.status(401).json(
                {
                    success : false,
                    message : "this is protected route for students"
                }
            )
        }

        next();

    }catch(err){
        res.status(500).json(
            {
                success : false,
                message : "err occured in matching role"
            }
        )
    }
}

exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role !== 'Admin'){
            return res.status(401).json(
                {
                    success : false,
                    message : "this is protected route for admin"
                }
            )
        }

        next();

    }catch(err){
        res.status(500).json(
            {
                success : false,
                message : "err occured in matching role"
            }
        )
    }
}