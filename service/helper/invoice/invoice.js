const moment = require("moment");
const {Invoice} = require("../../repository/model/invoice")
const { v4 } = require('uuid');
const {INVOICE_STATUS} = require('../enum/enum')

module.exports.CreateInvoice = async ({resident}) => {
   return Invoice.create({
        'id': v4(),
        'amount': '10000',
        'invoice_date': moment().toDate(),
        'last_sent_at': null,
        'status': INVOICE_STATUS.INITIATED,
        'resident_id': resident.id
    })
}