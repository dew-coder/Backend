const express = require('express');
const router = express.Router();

const { login, signup} = require('../controllers/contro');
const {authz, isStudent, isAdmin} = require('../middleware/authz')

router.post("/login", login)
router.post("/signup", signup)

//protected route
router.get("/student" , authz, isStudent, (req,res)=>{
    res.json(
        {
            success : true,
            message : "welcome to protected route for students"
        }      
    ) 
}) 
router.get("/admin" , authz, isAdmin, (req,res)=>{
    res.json(
        { 
            success : true,
            message : "welcome to protected route for admin"
        }
    )
})
router.get("/test" , authz, (req,res)=>{
    res.json(
        { 
            success : true,
            message : "welcome to protected route for testing authz"
        }
    )
})
const User = require("../models/auth")
//in auth we had already passed decode or payload containing some indo
router.get("/getDeatils" , authz, async (req,res)=>{
    try{    
        const id = req.user.id;
        console.log(id);
        const user = await User.findById(id);

        res.status(200).json(
            {
                success:true,
                user : user,
                message : "welcome to details route"
            }
        )
    }
    catch(err){
        res.status(500).json(
            {
                success:false,
                message : "something went wrong"
            }
        )
    }
})

module.exports = router  