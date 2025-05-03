const express = require('express')
const officerHelper = require('../../../helper/officer/officer')
const router = express.Router()

const register = async (req, res) => {
    body = req.body

    officer = await officerHelper.Register({
        username: body.username,
        plainPassword: body.password,
        type: body.type
    })

    res.send(officer)
}

const list = async (req, res) => {
    queryParams = req.query

    console.log(queryParams)
    officers = await officerHelper.OfficerList({
        filter: JSON.parse(queryParams.filter||'{}'),
        sort:queryParams.sort,
        limit: queryParams.limit,
        page: queryParams.page
    })

    res.send(officers)
}

const update = async(req, res) => {
    body = req.body;

    officer = await officerHelper.UpdateOfficer({...body, id: req.params.officerId})

    res.send(officer)
}

router.post('/register', register)

router.get('', list)
router.patch('/:officerId', update)

module.exports = router