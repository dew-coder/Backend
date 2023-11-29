const todo = require('../models/Todo')

module.exports.updateTodo = async(req,res)=>{
    try{
        const id = req.params.id;
        const {title, description} = req.body;

        //updating in db
        const response = await todo.findByIdAndUpdate(
            {_id : id},
            {title , description , updatedAt : Date.now()},
            //used to update in response also
            {new : true}
        )

        res.status(200).json(
            {
                success : true,
                data : response,
                messgae : 'updated successfully'
            }
        )

    }
    catch(err){
        console.error(err)
        console.log(err)
        res.status(500).json(
            {
                success : false,
                data : 'cannot update',
                messgae : err.message
            }
        )
    }
}