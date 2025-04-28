const express = require('express')
const officerHelper = require('../../../helper/officer/officer')
const router = express.Router()

const register = async (req, res) => {
    body = req.body
    console.log(body)
    officer = await officerHelper.Register({
        username: body.username,
        plainPassword: body.password,
        type: body.type
    })

    res.send(officer)
}

router.post('/register', register)

module.exports = router