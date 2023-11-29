const express = require('express');
const app = express();

require('dotenv').config();
const cookieParser = require("cookie-parser")

const port = process.env.PORT; 

app.use(express.json());
app.use(cookieParser());
         
const {dbconnect} = require("./config/database")
dbconnect(); 

const user = require('./routes/user')  
app.use("/api/v1", user)
  
app.listen(port, ()=>{
    console.log(`app is listening at ${port}`)
})     