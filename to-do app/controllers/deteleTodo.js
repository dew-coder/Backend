const todo = require('../models/Todo')

module.exports.deleteTodo = async(req,res)=>{
    try{
        const id = req.params.id;
        await todo.findByIdAndDelete({_id : id})

        res.status(200).json(
            {
                success : true,
                message : 'deleted successfully'
            }
        )
    }
    catch(err){
        console.error(err)
        console.log(err)
        res.status(500).json(
            {
                success : false,
                data : 'cannot delete',
                messgae : err.message
            }
        )
    }
}