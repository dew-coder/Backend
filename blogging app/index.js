const express = require('express')
const app = express();

require("dotenv").config();

//middleware 
//kbhi bhi json body parse krni pdjae to 
//body se json parse krwane me help krta
app.use(express.json());

//importing route files
const routeBlog = require("./routes/blog")

//mount
app.use("/api/v1" , routeBlog);

const dbconnect = require("./config/database")
dbconnect();

app.listen(process.env.PORT, ()=>{
    console.log(`App running on port ${process.env.PORT}`)
})

app.get("/", (req,res)=>{ 
    res.send(`<h1>This is my home page baby</h1>`)
    console.log("This is home page baby");
})