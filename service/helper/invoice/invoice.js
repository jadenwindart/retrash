const moment = require("moment");
const {Invoice} = require("../../repository/model/invoice");
const {Resident} = require("../../repository/model/resident");
const { v4 } = require('uuid');
const _ = require('lodash');
const {INVOICE_STATUS} = require('../enum/enum');
const paginationUtil = require('../util/pagination');
const whatsappHelper = require('../whatsapp/whatsapp');
const midtransHelper = require('../midtrans/midtrans');
const { Op, ENUM } = require('sequelize');

module.exports.CreateInvoice = async ({resident}) => {
   return Invoice.create({
        id: v4(),
        amount: '10000',
        invoiceDate: moment().toDate(),
        lastSentAt: null,
        status: INVOICE_STATUS.UNPAID,
        residentId: resident.id
    })
}

module.exports.UpdateInvoiceSentAt = async (invoice) => {
    invoice.lastSentAt = moment()
    return invoice.save()
}

module.exports.InvoiceList = async ({filter={},sort=[],limit,page}) => {
    pagination = paginationUtil.Paginate({limit,page})

    if (_.keys(filter).length == 0) {
        filter = {
            "status": INVOICE_STATUS.UNPAID,
        }
    }
    
    whereClause = _.forEach(filter, (v,k) => {
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

const generatePaidMessage = ({name,invoiceDate}) => `
    Halo ${name},\n
    Terima kasih sudah melakukan pembayaran tagihan untuk tanggal ${invoiceDate}
`

module.exports.UpdateInvoiceStatus = async ({invoiceId,invoiceStatus}) => {
    invoice = await Invoice.findOne({where: {id:invoiceId}, include:Resident})

    invoice.status=invoiceStatus

    await invoice.save()

    if (invoiceStatus == INVOICE_STATUS.PAID) {
        const resident = _.get(invoice, "resident")

        if (resident){
            const message = generatePaidMessage({name:resident.name, invoiceDate: invoice.invoiceDate})
            await whatsappHelper.sendMessage({phoneNumber:resident.phoneNumber, message})
        }
    }

    return invoice
}

const generateInvoiceMessage = ({name, invoiceDate, paymentLink}) => `
    Halo ${name},\n
    Berikut tagihan anda yang tercatat pada tanggal ${invoiceDate}/\n
    Pembayaran dapat menggunakan link dibawah ini:
    ${paymentLink}
`

module.exports.resendInvoiceNotification = async ({invoiceId}) => {
    invoice = await Invoice.findOne({where: {id:invoiceId}, include:Resident})

    if (invoice.status == INVOICE_STATUS.PAID) {
        return
    }

    resident = _.get(invoice, 'resident')

    // Notify resident using whatsapp
    await whatsappHelper.sendMessage({
        phoneNumber: resident.phoneNumber,
        message: generateInvoiceMessage({
            name:resident.name,
            invoiceDate: invoice.toJSON().invoiceDate,
            paymentLink: invoice.paymentLink})
    }).then(res => res.json());
}

module.exports.updatePaymentLink = async ({invoiceId, paymentLink}) => {
    return Invoice.update(
        { paymentLink: paymentLink },
        {
            where: {
                id: invoiceId,
            },
        },
    );
}