const todo = require("../models/Todo")

//fetching all data successfully
module.exports.getTodo = async(req, res)=>{
    try{
        const response = await todo.find({});
        res.status(200).json(
            {
                success : true,
                data : response,
                messgae : "data fetched successfully"
            }
        )
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success : false,
                data : "server error",
                message : err.message
            }
        )
    }
}

//extract todo based on id
module.exports.getTodobyId = async(req, res)=>{
    try{
        const id = req.params.id;
        const response = await todo.findById({_id : id});

        if(!response){
            res.status(404).json(
                {
                    success : false,
                    messgae : "no data found with given ID"
                }
            )
        }
        else{
            res.status(200).json(
                {
                    success : true,
                    data : response,
                    messgae : `data fetched successfully for id ${id}`
                }
            )
        }
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success : false,
                data : "server error",
                message : err.message
            }
        )
    }
} 