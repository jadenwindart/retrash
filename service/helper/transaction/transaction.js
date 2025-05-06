const {Transaction} = require('../../repository/model/transaction');
const {Resident} = require('../../repository/model/resident');
const { v4 } = require('uuid');
const _ = require('lodash');
const paginationUtil = require('../util/pagination');
const invoiceHelper = require('../invoice/invoice');
const midtransHelper = require('../midtrans/midtrans');
const whatsappHelper = require('../whatsapp/whatsapp');
const { Op } = require('sequelize');
const {TRANSACTION_STATUS, INVOICE_STATUS} = require('../enum/enum');

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

module.exports.list = ({filter={},sort=[],limit,page}) => {
    pagination = paginationUtil.Paginate({limit,page})
    
    whereClause = _.map(filter, (v,k) => {
        return {
            [k]: {
                [Op.eq]: v
            }
        }
    })

    if (sort.length == 0) {
        sort = [['createdAt', 'DESC']]
    } else {
        sort = JSON.parse(sort)
    }

    return Transaction.findAll({
        where: {
            ...whereClause,
            status: {
                [Op.eq]: TRANSACTION_STATUS.COMPLETED
            },
        },
        order: sort,
        limit: pagination.limit,
        offset: pagination.offset,
        include: Resident
    })
}

module.exports.updateCompleteTransaction = async ({invoiceId,paidAmount}) => {
    const transaction = await Transaction.findOne({ where: {invoiceId: invoiceId}})

    transaction.paidAmount = paidAmount
    transaction.status = TRANSACTION_STATUS.COMPLETED
    
    await transaction.save()

    await invoiceHelper.UpdateInvoiceStatus({invoiceId: invoiceId, invoiceStatus: INVOICE_STATUS.PAID})
}