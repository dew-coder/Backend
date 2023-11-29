const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
    {
        title : {
            type : "string",
            required : true
        },
        body : {
            type : "string",
            required : true,
        },
        likes : [
            {
                //sotre sari id store hongi jisne like kia
                type : mongoose.Schema.Types.ObjectId,
                ref : "like"
            }
        ],
        comments : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "comment"
            }
        ]
    }
)

module.exports = mongoose.model("post" , postSchema)

//ek model ke andr nested arr then use ref