const express = require('express')
const router = express.Router()

//import comtrollers
const {dummy} = require("../controllers/likeC")
//exported in func
const {createComment} = require("../controllers/commentC")
//aalag se export kia to brackets ni
const createPost = require("../controllers/postC")
const {getAllposts} = require('../controllers/postC')
const {likePost , unlikePost} = require('../controllers/likeC')
 
//mapping create   
router.get("/dummy" , dummy)
router.post("/comments/create", createComment)
router.post("/posts/create", createPost)  
router.get("/posts" , getAllposts)
router.post("/likes/like", likePost)   
router.post("/likes/unline", unlikePost)   

//export
module.exports = router