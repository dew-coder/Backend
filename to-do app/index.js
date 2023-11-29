const express = require('express');
const app = express() 

//load config from env 
require("dotenv").config()
// in case ni ata port num to 4000 use hoga
const port = process.env.PORT || 4000;

//middleware to parse json request body

const bodyParser = require('body-parser')
app.use(bodyParser.json())
//its a middleware only
//we can use this also instead of body parser
// app.use(express.json());

//import routes for todo api
const todoRoutes = require("./routes/todo")

//mounting the todo api routes
//mount ko map krdia apis ke sath 
app.use("/api/v1" , todoRoutes);

//start server

app.listen(port, ()=>{
    console.log(`new server created at port ${port}`);
})

//db connect
const dbconnect = require("./config/database");
dbconnect();

//default route
app.get("/", (req,res)=>{
    res.send(`<h1>This is homepage</h1>`)
})