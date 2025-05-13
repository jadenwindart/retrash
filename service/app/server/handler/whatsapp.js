const express = require('express');
const _ = require('lodash');
const residentHelper = require('../../../helper/resident/resident');
const transactionHelper = require('../../../helper/transaction/transaction');
const whatsappHelper = require('../../../helper/whatsapp/whatsapp');
const phoneNumberUtil = require('../../../helper/util/phonenumber');
const moment = require('moment');
const router = express.Router();

const generateTransactionHistoryMessage = (resident, transactions) => {
    let message = `
        Hai ${resident.name},\n
        Berikut riwayat pembayaran anda:\n
    `

    for (let index = 0; index < transactions.length; index++) {
        const transaction = transactions[index];
        const formattedDateTime = moment(transaction.transactionTimestamp).format('DD MMMM YYYY HH:mm:ss');
        message = message + `${index + 1}. jumlah: Rp. ${transaction.paidAmount}, waktu pembayaran: ${formattedDateTime} \n`;
    }

    return message
}

/*
{
  phone: '6285179746345:11@s.whatsapp.net',
  sender: '6281284623556',
  displayname: 'Muhammad Hafidz',
  text: 'ok'
}
*/
const receiveMessage = async (req, res) => {
    try {
        const body = _.pick(req.body,['sender', 'text'])

        switch (body.text.toLowerCase()) {
            case 'riwayat pembayaran':
                const resident = await residentHelper.GetResidentByPhoneNumber(phoneNumberUtil.sanitizeIndonesiPhoneNumber(body.sender));
                console.log(resident);
                const transactions = await transactionHelper.list({filter:{'residentId':resident.id},limit:5,page:1})
                const message = generateTransactionHistoryMessage(resident,transactions)

                await whatsappHelper.sendMessage({
                    phoneNumber: resident.phoneNumber,
                    message,
                })

                break;
        }
    } catch(error) {
        console.log(error)
    }

    res.send()
}

router.post('/v1/message/notification', receiveMessage)

module.exports = router