const express = require('express');
const moment = require('moment');
const invoiceHelper = require('../../../helper/invoice/invoice');
const transactionHelper = require('../../../helper/transaction/transaction');
const {INVOICE_STATUS} = require('../../../helper/enum/enum')
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

        if (body.status == INVOICE_STATUS.PAID) {
            const invoice = await invoiceHelper.GetInvoiceById(req.params.invoiceId)
            await transactionHelper.updateCompleteTransaction({invoiceId: invoice.id, paidAmount: invoice.amount, transactionTimestamp: moment().format('YYYY-MM-DD HH:mm:ss')})
            res.send(invoice)
            return
        }

        invoice = await invoiceHelper.UpdateInvoiceStatus({invoiceId: req.params.invoiceId, invoiceStatus: body.status})

        res.send(invoice)
    } catch (error) {
        console.log(error);

        res.send({error: "Terjadi kesalahan pada sistem"})
    }
}

const resendInvoice = async(req, res) => {
    try {
        const invoice = await invoiceHelper.resendInvoiceNotification({invoiceId: req.params.invoiceId})

        res.send(invoice)
    } catch (error) {
        console.log(error);

        res.send({error: "Terjadi kesalahan pada sistem"})
    }
}

router.get('', list)
router.patch('/:invoiceId/status', updateStatus)
router.post('/:invoiceId/resend', resendInvoice)

module.exports = router