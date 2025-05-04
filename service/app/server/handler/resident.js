const express = require('express')
const residentHelper = require('../../../helper/resident/resident')
const router = express.Router()

const create = async (req, res) => {
    try {
        body = req.body

        resident = await residentHelper.CreateResident(body)

        res.send(resident)
    } catch(err) {
        console.log(err)

        res.send({error: "Terjadi kesalahan pada sistem"})
    }
}

const list = async (req, res) => {
    try {
        queryParams = req.query

        residents = await residentHelper.GetResidentList({
            filter: JSON.parse(queryParams.filter||'{}'),
            sort:queryParams.sort,
            limit: queryParams.limit,
            page: queryParams.page
        })

        res.send(residents)
    } catch(err) {
        console.log(err);

        res.send({error: "Terjadi kesalahan pada sistem"})
    }
}

const update = async(req, res) => {
    try {
        body = req.body;

        resident = await residentHelper.UpdateResident({...body, id: req.params.residentId})

        res.send(resident)
    } catch(err) {
        console.log(err);

        res.send({error: "Terjadi kesalahan pada sistem"})
    }
}

router.post('', create)
router.get('', list)
router.patch('/:residentId', update)

module.exports = router