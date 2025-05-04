const express = require('express');
const invoiceHelper = require('../../../helper/invoice/invoice');
const router = express.Router();

const list = async (req, res) => {
    try {
            queryParams = req.query
    
            invoices = await invoiceHelper.InvoiceList({
                filter: JSON.parse(queryParams.filter||'{}'),
                sort:queryParams.sort,
                limit: queryParams.limit,
                page: queryParams.page
            })
    
            res.send(invoices);
        } catch(err) {
            console.log(err);
    
            res.send({error: "Terjadi kesalahan pada sistem"})
        }
}

router.get('', list)

module.exports = router