const express = require('express');
const router = express.Router();
const verifyToken = require('../../utils/verifyToken')
const {createTask,getTasksByProjectId, updateTaskStatus} = require('./controller')

router.post('/create-task/', verifyToken, createTask);
router.get('/get-tasks',verifyToken,getTasksByProjectId)
router.put('/update-tasks',updateTaskStatus)
module.exports = router;