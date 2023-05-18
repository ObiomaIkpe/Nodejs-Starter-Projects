const express = require('express');
const {getAllTasks, getSingletask, createTask, updateTask, deleteTask} = require('../controllers/tasksController');

const router = express.Router();

router.route('/').get(getAllTasks);
router.route('/:id').get(getSingletask);
router.route('/:id').patch(updateTask);
router.route('/').post(createTask);
router.route('/:id').delete(deleteTask);


module.exports = router;