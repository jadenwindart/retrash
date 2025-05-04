const moment = require("moment");
const {Invoice} = require("../../repository/model/invoice");
const {Resident} = require("../../repository/model/resident");
const { v4 } = require('uuid');
const _ = require('lodash');
const {INVOICE_STATUS} = require('../enum/enum');
const paginationUtil = require('../util/pagination');

module.exports.CreateInvoice = async ({resident}) => {
   return Invoice.create({
        'id': v4(),
        'amount': '10000',
        'invoice_date': moment().toDate(),
        'last_sent_at': null,
        'status': INVOICE_STATUS.UNPAID,
        'resident_id': resident.id
    })
}

module.exports.UpdateInvoiceSentAt = async (invoice) => {
    invoice.lastSentAt = moment()
    return invoice.save()
}

module.exports.InvoiceList = async ({filter={},sort=[],limit,page}) => {
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

    return Invoice.findAll({
        where: whereClause,
        order: sort,
        limit: pagination.limit,
        offset: pagination.offset,
        include: Resident
    })
}

module.exports.UpdateInvoiceStatus = async ({invoiceId,invoiceStatus}) => {
    invoice = await Invoice.findOne({id:invoiceId})

    invoice.status=invoiceStatus

    await invoice.save()

    return invoice
}