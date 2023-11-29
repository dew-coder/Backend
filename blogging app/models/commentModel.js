//import
const mongoose = require('mongoose')

//route handler
const commentSchema = new mongoose.Schema({
    //post basically ek prakar ki id ko store krrha hoga
    postId : {
        type: mongoose.Schema.Types.ObjectId,
        //reference to post model
        ref:"post"
    },
    user : {
        type : String,
        required : true
    },
    commentbody : {
        type : String,
        required : true
    }
})

//export
module.exports = mongoose.model("comment", commentSchema)