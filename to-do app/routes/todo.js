const express = require('express')
//used to create new router obj
const router = express.Router();

//import controller
const {createTodo} = require("../controllers/createTodo")
const {getTodo, getTodobyId} = require("../controllers/getTodo")
const {updateTodo} = require("../controllers/updateTodo")
const {deleteTodo} = require("../controllers/deteleTodo")

//define api routes
router.post("/createTodo", createTodo)
router.get("/getTodo", getTodo)
router.get("/getTodo/:id", getTodobyId)
router.put("/updateTodo/:id", updateTodo)
router.delete("/deleteTodo/:id", deleteTodo)

module.exports = router;