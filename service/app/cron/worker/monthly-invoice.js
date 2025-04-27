const _ = require("lodash");
const residentHelper = require("../../../helper/resident/resident");
const invoiceHelper = require("../../../helper/invoice/invoice")
const transactionHelper = require("../../../helper/transaction/transaction")

module.exports = async () => {
    // Get All resident for invoice creation
    const residents = await residentHelper.GetAllResident()

    console.log(residents)
    console.log("found " + residents.length + " active residents.")
    _.forEach(residents, async(resident) => {
        console.log("Start creating invoice...")
        // Create invoices
        invoice = await invoiceHelper.CreateInvoice({resident:resident})
        console.log(invoice)
        // Create Transaction in Payment Gateway

        // Create transactions
        transaction = await transactionHelper.Initiate({resident: resident, invoice: invoice})

        // Notify resident using whatsapp
    })
}