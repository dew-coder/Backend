const cloudinary = require("cloudinary").v2
require("dotenv").config()
exports.cloudinaryConnect = ()=>{
    try{
        //to establish connection
        //3 things which we have to define
         cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key : process.env.API_KEY,
            api_secret : process.env.API_SECRET
         })
    }catch(err){
        console.log(err)
    }
}  