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

const updateStatus = async(req, res) => {
    try {
        body = req.body

        invoice = await invoiceHelper.UpdateInvoiceStatus({invoiceId: req.params.invoiceId, invoiceStatus: body.status})

        res.send(invoice)
    } catch (error) {
        console.log(err);

        res.send({error: "Terjadi kesalahan pada sistem"})
    }
}

router.get('', list)
router.patch('/:invoiceId/status', updateStatus)

module.exports = router