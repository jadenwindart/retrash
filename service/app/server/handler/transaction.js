const express = require('express');
const transactionHelper = require('../../../helper/transaction/transaction');
const router = express.Router();

const list = async (req, res) => {
    try {
        queryParams = req.query

        transactions = await transactionHelper.list({
            filter: JSON.parse(queryParams.filter||'{}'),
            sort: queryParams.sort,
            limit: queryParams.limit,
            page: queryParams.page
        })

        res.send(transactions)
    } catch (error) {
        console.log(error)

        res.send({error: "Terjadi kesalahan pada sistem"})
    }
}

router.get('', list)

module.exports = router