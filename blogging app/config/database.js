const mongoose = require('mongoose')

require('dotenv').config()

const dbconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL , {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(console.log("database is connected"))
    .catch((err)=>{
        console.log("error in connection")
        console.error(err);
        process.exit(1);
    })
}  

module.exports = dbconnect;