const express = require('express')
const officerHelper = require('../../../helper/officer/officer')
const middleware = require('./middleware')
const router = express.Router()

const login = async (req, res) => {
    body = req.body

    loginToken = await officerHelper.Login({ 
        username: body.username,
        plainPassword: body.password, 
    })

    res.send(loginToken);
}

const refreshToken = async (req, res) => {
    officer = req.officer

    newToken = await officerHelper.refreshToken(officer)

    res.send(newToken);
}

router.post('/login', login)
router.post('/refresh', middleware.validateToken, refreshToken)

module.exports = router