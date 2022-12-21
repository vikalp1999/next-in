const express = require('express')
const {AuthSignup, AuthLogin} = require('../controller/auth.controller')

const router = express.Router()

router.post('/signup', async (req, res)=>{
    let {email, password, name} = req.body
    let data = await AuthSignup(email, password, name)
    res.status(200).send(data)    
})

router.post('/login', async (res, req)=>{
    let {email, password} = req.body
    let data = await AuthLogin(email, password)
    res.status(200).send(data)
})

module.exports = router