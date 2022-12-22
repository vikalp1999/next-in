const TaskModel = require('../model/task.model')
const express = require('express')
const {AddTaskLead, DelTask} = require('../controller/task.controller')

const router = express.Router()

router.post('/addtask', async (req, res)=>{
    const {title, deadline, assigner, assignee, chatroom} = req.body
    let data = await AddTaskLead(title, deadline, assigner, assignee, chatroom)
    res.status(200).send(data)
})

router.post('/deltask', async (req, res)=>{
    const {task, chatroom} = req.body 
    let data = await DelTask(task, chatroom)
    res.status(200).send(data)
})

module.exports = router