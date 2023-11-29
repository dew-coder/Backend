//creating schema (model) it will be used by controller
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            requied : true,
            maxLength : 50
        },
        description : {
            type : String,
            requied : true,
            maxLength : 50
        },
        createdAt : {
            type : Date,
            requied : true,
            default : Date.now()
        },
        updatedAt : {
            type : Date,
            requied : true,
            default : Date.now()           
        }
    }
)
 
module.exports = mongoose.model("Todo" , todoSchema)