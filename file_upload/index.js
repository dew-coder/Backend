//app create
//port find
//middleware find
//db se connect
//cloudinary se connect
//api route mount
//activate server

const express = require('express')
const app = express();

require("dotenv").config()
const PORT = process.env.PORT || 3000

//interact with json
app.use(express.json())
//to interact with files
const fileupload = require('express-fileupload')

//helpful where we will use tempFilePath
app.use(fileupload(
    {
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }
));

const db = require("./config/database");
db.dbconnect();

const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect(); 

const upload = require('./routes/FileUpload')
app.use('/api/v1/upload', upload)

app.listen(PORT, ()=>{
    console.log(`app is running at ${PORT}`)
})  