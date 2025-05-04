const express = require('express')
const officerHelper = require('../../../helper/officer/officer')
const middleware = require('./middleware')
const router = express.Router()

const login = async (req, res) => {
    try {
        body = req.body

        loginToken = await officerHelper.Login({ 
            username: body.username,
            plainPassword: body.password, 
        })

        res.send(loginToken);
    } catch (error) {
        console.log(error)

        res.status(401).send({error: "Wrong username or password"})
    }
    
}

const refreshToken = async (req, res) => {
    officer = req.officer

    newToken = await officerHelper.refreshToken(officer)

    res.send(newToken);
}

router.post('/login', login)
router.post('/refresh', middleware.validateToken, refreshToken)
router.get('/me', middleware.validateToken, (req,res) => res.send(req.officer))

module.exports = router