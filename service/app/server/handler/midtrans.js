const express = require('express');
const _ = require('lodash');
const midtransHelper = require('../../../helper/midtrans/midtrans');
const transactionHelper = require('../../../helper/transaction/transaction');
const router = express.Router();

const payment = async (req, res) => {
    try {
        console.log(req.body)

        const pickedBody = _.pick(req.body, [
            'signature_key',
            'order_id',
            'transaction_id',
            'transaction_time',
            'transaction_status',
            'gross_amount',
        ])

        if ("settlement" != pickedBody.transaction_status) {
            res.send()
            return
        }
    
        const validSignature = midtransHelper.validatePaymentNotificationSignature(pickedBody)
        if (!validSignature) {
            res.status(401).send()
        }

        orderId = pickedBody.order_id.substring(0, 36)
    
        await transactionHelper.updateCompleteTransaction({invoiceId: orderId, paidAmount: pickedBody.gross_amount, transactionTimestamp:pickedBody.transaction_time})
    
        res.status(200).send()
    } catch (error) {
        console.log(error)

        res.status(500).send()
    }
}

router.post('/v1/payment', payment)

module.exports = router