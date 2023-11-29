const mongoose = require('mongoose');

require("dotenv").config();

exports.dbconnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(console.log("db connection successful"))
    .catch((err)=>{
        console.log("not connected")
        console.log(err)
        process.exit(1)
    })
}