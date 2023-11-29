// import model
//here 2 we will need post and comment controller

const post = require("../models/postModel")
const comment = require("../models/commentModel");
const mongoose = require("mongoose");


//db se koi interaction krte h to same jese nw call krte h wese interact krte h 
//hm ni chahte main code block hojae ya main execution flow stop hojae
//so asyncronously execute it
exports.createComment = async (req,res)=>{
    try{
        //BY THIS INSERTING COMMENT INTO OUR DB

        //to create use create fn of monggose library or use save func (in save func make sure make obj first)
    
        //fetch data from req ki body
        const {postId, user, commentbody} = req.body;

        //convert postid to objectid
        const postIdAsObjId = new mongoose.Types.ObjectId(postId)

        //create comment obj
        const commentobj = new comment({
            postId : postIdAsObjId,
            user,
            commentbody
        })

        //save new comment to db
        const savecomment = await commentobj.save();

        //or use cretae mentod (comment.create({postId,  user, commentbody}))
 
        //now do changes in post for comment array 
        //find post by id and add comment to arr

        const updatedpost = await post.findByIdAndUpdate(postIdAsObjId,
                            {$push : 
                            {comments : savecomment._id},
                            },{new : true}) //sab kaam krne ke baad updated doc return hoga
                            .populate("comments") //populates the comment arr with comments document inseted of obj id
                            .exec(); // executes this query 

        res.json(
            {
                post : updatedpost
            }
        )
    }                       
    catch(err){
        return res.status(500).json(
            {
                error : "error while creating comment",
                message : err.message
            }
        )
    }
}

