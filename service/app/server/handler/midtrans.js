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
    
        const validSignature = midtransHelper.validatePaymentNotificationSignature(pickedBody)
        if (!validSignature) {
            res.status(401)
        }
    
        await transactionHelper.updateCompleteTransaction({invoiceId:pickedBody.order_id, paidAmount:pickedBody.gross_amount})
    
        res.status(200)   
    } catch (error) {
        console.log(error)

        res.status(500)
    }
}

router.post('/v1/payment', payment)

module.exports = router