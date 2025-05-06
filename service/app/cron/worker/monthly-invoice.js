const _ = require("lodash");
const Promise = require("bluebird");
const residentHelper = require("../../../helper/resident/resident");
const invoiceHelper = require("../../../helper/invoice/invoice")
const transactionHelper = require("../../../helper/transaction/transaction")
const midtransHelper = require("../../../helper/midtrans/midtrans")
const whatsappHelper = require("../../../helper/whatsapp/whatsapp")
const phonenumberUtil = require("../../../helper/util/phonenumber")

const generateInvoiceMessage = ({name, invoiceDate, paymentLink}) => `
    Halo ${name},\n
    Berikut tagihan anda yang tercatat pada tanggal ${invoiceDate}/\n
    Pembayaran dapat menggunakan link dibawah ini:
    ${paymentLink}
`

module.exports = async () => {
    // Get All resident for invoice creation
    const residents = await residentHelper.GetAllResident()

    console.log("found " + residents.length + " active residents.")
    Promise.each(residents, async(resident) => {
        try{
            console.log("Start creating invoice...")
            console.log(`Residet: ${resident.name}`)
            // Create invoices
            invoice = await invoiceHelper.CreateInvoice({resident:resident})

            // Create transactions
            transaction = await transactionHelper.Initiate({resident: resident, invoice: invoice})

            // Create Transaction in Payment Gateway
            midtransResp = await midtransHelper.generatePaymentLink({
                invoiceId: invoice.id,
                amount: invoice.amount,
                resident: resident
            }).then(res => res.json());

            const paymentUrl = midtransResp.payment_url

            await invoiceHelper.updatePaymentLink({invoiceId:invoice.id, paymentLink: paymentUrl})

            // Notify resident using whatsapp
            whatsappResp = await whatsappHelper.sendMessage({
                phoneNumber: resident.phoneNumber,
                message: generateInvoiceMessage({
                    name:resident.name,
                    invoiceDate: invoice.toJSON().invoiceDate,
                    paymentLink: paymentUrl})
            }).then(res => res.json());

            await invoiceHelper.UpdateInvoiceSentAt(invoice)
        } catch(err) {
            console.log(err)
        }
    }).then(() => {
        console.log("Process notify invoice finish")
    })
}