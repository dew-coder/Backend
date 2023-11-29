//post and fetch post
const post = require('../models/postModel');
const mongoose = require("mongoose");

const createPost = async (req,res)=>{
    try{
        const {title, body} = req.body;
        const newpost = await post.create(
            {title,body}
        )
        res.status(200).json(
            {
                message : "post created successfully",
                post : newpost
            }
        )

        // OR
        // const newpost1 = new post(
        //     {
        //         title, body
        //     }
        // )
        // const savepost = await newpost1.save()
        // res.json(
        //     {
        //         post : savepost
        //     }
        // )
    }
    catch(err){
        res.status(500).json(
            {
                error : "error while creating post",
                message : err.message
            }
        )
    }
}

module.exports = createPost

module.exports.getAllposts = async (req,res)=>{
    try{
        const posts = await post.find({}).populate("comments")
        .populate("likes")
        res.json(
            {
                posts
            }
        )
    }
    catch(err){
        res.status(500).json(
            {
                error : "error while fetching posts",
                message : err.message
            }
        )
    } 
}