const express = require('express')
const officerHelper = require('../../../helper/officer/officer')
const router = express.Router()

const register = async (req, res) => {
    try{
        body = req.body

        officer = await officerHelper.Register({
            username: body.username,
            plainPassword: body.password,
            type: body.type
        })

        res.send(officer)
    } catch(err) {
        console.log(err);

        res.send({error: "Terjadi kesalahan pada sistem"})
    }
}

const list = async (req, res) => {
    try{
        queryParams = req.query

        officers = await officerHelper.OfficerList({
            filter: JSON.parse(queryParams.filter||'{}'),
            sort:queryParams.sort,
            limit: queryParams.limit,
            page: queryParams.page
        })

        res.send(officers)
    } catch(err) {
        console.log(err);

        res.send({error: "Terjadi kesalahan pada sistem"})
    }
}

const update = async(req, res) => {
    try {
        body = req.body;

        officer = await officerHelper.UpdateOfficer({...body, id: req.params.officerId})

        res.send(officer)
    } catch(err) {
        console.log(err);

        res.send({error: "Terjadi kesalahan pada sistem"})
    }
}

router.post('/register', register)

router.get('', list)
router.patch('/:officerId', update)

module.exports = router