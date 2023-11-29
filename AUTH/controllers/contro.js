const bcrypt = require('bcrypt');
const user = require('../models/auth');
const { use } = require('../routes/user');
const jsonwebtoken = require("jsonwebtoken"); 

require("dotenv").config();

//signup route handler
exports.signup = async (req,res)=>{
    try{
        const {name,email,password,role} = req.body;


        //check if user already exists or not
        const existingUser = await user.findOne({email})
        if(existingUser){
            return res.statur(400).json({
                success : false,
                message : "user already exists"
            })
        }

        //make hashed password
        let hashPass;
        try{
            hashPass = await bcrypt.hash(password, 10)
        }
        catch(err){
            return res.status(400).json(
                {
                    success : false,
                    message : "err on hasing password"
                }
            )
        } 

        // //creating user
        // if(!existingUser){
            const newUser = await user.create({name,email,password:hashPass, role});
            console.log(newUser)

            res.status(200).json(
                {
                    success:true,
                    message : "user created successfully"
                }
            )
        // }
        
    }
    catch(err){ 
        console.log(err);
        res.status(500).json(
            {
                success:false,
                messgae:"user cannot be created"
            }
        )
    }
}

exports.login = async(req,res)=>{
    try{
        //data fetch
        const {email, password} = req.body;

        //check if both are filled
        if(!password || !email){
            res.status(500).json(
                {
                    success:false,
                    message : "plz fill all the details"
                }
            )
        }

        //check if user is pres or not

        let existingUs = await user.findOne({email});
        if(!existingUs){
            //401 means unauthenticated
            return res.status(401).json(
                {
                    success : false,
                    message : "user is not registered"
                }
            )
        }

        const payload = {
            email : existingUs.email,
            id : existingUs._id,
            role : existingUs.role
        }

        //verify password and generate a jwt token
        if(await bcrypt.compare(password, existingUs.password)){
            let token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h"
            })
             
            //mongoose doc into js obj
            existingUs = existingUs.toObject();
            existingUs.token = token;
            existingUs.password = undefined;

            const option = {
                expiresIn : new Date(Date.now() + 3*24*60*60*1000),
                //client side pr access ni krpae
                httpOnly : true
            }

            res.cookie("token", token, option).status(200).json(
                {
                    success : true,
                    token,
                    existingUs,
                    message : "user lgged in successfully"
                } 
            )
        }
        else{
            res.status(403).json(
                {
                    success : false,
                    message :" password do not match"
                }
            )
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json(
            {
                success:false,
                messgae:"login failure"
            }
        )
    }
}