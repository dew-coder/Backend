const mongoose = require('mongoose');

require("dotenv").config()

exports.dbconnect = ()=>{
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }) 
    .then(()=>{console.log("db connected successfully")})
    .catch((err)=>{
        console.log(err);
        console.log("err in connecting db");
        process.exit(1);
    })
}