const Task =  require('../models/task');
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
        //res.send('get all tasks');
    }
    catch (error) {
            res.status(500).json({msg:error})
           //console.log(error) 
    }      
}

const getSingletask = async (req, res) => {
    try{
        const {id: taskID } = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task){
            return next(createCustomError(`No task with ${taskID}`, 404))
            //return res.status(404).json({msg: `No task with ${taskID}`})
        }
        res.status(200).json({task})
        //res.json({id:req.params.id}) 
        //res.send('single tasks');
    }
    catch(error){
        res.status(500).json({msg:error})
    }    
}

const createTask = async(req, res) => {
    //console.log(req.body);
    //res.send('create task');
    //res.json(req.body)
    try {
        const task = await Task.create(req.body)
    res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
       //console.log(error) 
    }
}

const updateTask = async(req, res) => {
    //res.send('update task');
    try {
        
        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true,
            runValidators:true,
        })

        if(!task){
            return res.status(404).json({msg: `no task with ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteTask =async (req, res) => {
    try {
        //res.send('delete task');
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id: taskID})
        if(!task){
            return res.status(404).json({msg: `no task with ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
    
}



module.exports = {
    getAllTasks, getSingletask, createTask, updateTask, deleteTask
}