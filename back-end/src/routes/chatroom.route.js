const {Router} = require('express')
const {NewChatroom, JoinChatroom} = require('../controller/chatroom.controller')

const router = Router()

router.post('/new', async (req, res)=>{
    const {lead, name} = req.body
    const data = await NewChatroom(lead, name)
    res.status(200).send(data)
})

router.post('/join/:id', async (req, res)=> {
    const {id} = req.params
    const {user} = req.body
    const data = await JoinChatroom(user, id)
    res.status(200).send(data)
})


module.exports = router