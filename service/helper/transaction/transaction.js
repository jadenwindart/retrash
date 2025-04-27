const {Transaction} = require('../../repository/model/transaction')
const { v4 } = require('uuid');
const {TRANSACTION_STATUS} = require('../enum/enum')

module.exports.Initiate = ({resident,invoice,isManual=false}) => {
    return Transaction.create({
        id: v4(),
        invoiceId: invoice.id,
        status: TRANSACTION_STATUS.INITIATED,
        paidAmount: 0,
        residentId: resident.id,
        isManual: isManual
    })
}