//todo object create krega usme title desc dalega aur uski entry krega db me ye

// step 1 -> import model
const Todo = require("../models/Todo")


// step 2 -> define route handler
//database interaction async form me jae baki code exe affect na ho
module.exports.createTodo = async function(req, res){
    try{
        //extract title and desc from request bode
        const {title, description} = req.body;

        //create a new todo obj and insert in db
        //if not this data will not be inserted in db
        const response = await Todo.create({title, description});

        //send a json response with success flag
        res.status(200).json(
            {
                success : true,
                data : response,
                messgae : "Entry created successfully"
            }
        )
    }
    catch(err){
        console.log(err)
        console.error(err)
        res.status(500).json(
            {
                success : false,
                data : "internal server error",
                message : err.message
            }
        )
    }
}
