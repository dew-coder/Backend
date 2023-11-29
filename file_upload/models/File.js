const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
require("dotenv").config()
const fileSchema = new mongoose.Schema({
    name : {
        type : String,
        resuires : true
    },
    imageUrl : {
        type : String
    },
    tags : {
        type : String,
    },
    email : {
        type : String
    }
})

//here save means after save operation
fileSchema.post("save" , async function(doc){
    try{
        let transporter = nodemailer.createTransport({
            //gmail ka main server
            host: process.env.MAIL_HOST,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
        })
        //send mail

        let info = await transporter.sendMail({
            from : "D1shi<3",
            to : doc.email,
            subject : "file uploaded to cloudinary",
            html : `<h2>Hello Ji</h2><p>kese ho aap<br/> View here : <a href=${doc.imageUrl}>Yaha click kro bachu</a></p>`
        })
    }catch(err){

    }
})

module.exports = mongoose.model("File", fileSchema)