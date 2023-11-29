//connection b/w db and server
const mongoose = require('mongoose')

//process obj me data data feed/load hojata h env se
require("dotenv").config();
 
const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(()=>{
         console.log("db connection successful");
    }).catch((error)=>{
        console.log("db connection error!!!")
        console.error(error.message)
        process.exit(1);
    })
}
module.exports = dbConnect;  