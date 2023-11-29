module.exports.dummy = (req,res)=>{
    res.send("this is dummy page")
}

//like ka unlike ka
const postM = require('../models/postModel')
const like = require('../models/likeModel')
const mongoose = require('mongoose')

//like a post
exports.likePost = async (req,res)=>{
    try{
        const {post, user} = req.body;

        const postAsObjId = new mongoose.Types.ObjectId(post)

        //making obj and saving
        const likepost = new like({
            post : postAsObjId,
            user
        });

        const saveLikePost = await likepost.save();

        const savedPost = await postM.findByIdAndUpdate(postAsObjId, {$push : {likes : saveLikePost._id}},{new:true})
                        .populate("likes").exec();

        res.json(
            {
                post : savedPost
            }
        )
    }
    catch(err){
        res.json(
            {
                message : err.message
            }
        )
    }
}

//unlike
exports.unlikePost = async (req,res)=>{
    try{
        const {post, likeId} = req.body;

        const postAsObjId = new mongoose.Types.ObjectId(post)

        const deleteLike = await like.findOneAndDelete({
            post : postAsObjId,
            _id : likeId
        })

        //update post collection

        const updatedPost = await postM.findByIdAndUpdate(postAsObjId, {$pull : {likes : deleteLike._id}},{new:true})

        res.json(
            {
                post : updatedPost
            }
        )
    }
    catch(err){
        res.json(
            {
                message : err.message
            }
        )
    }
}
