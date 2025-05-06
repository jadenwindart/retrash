const moment = require('moment')
const CryptoJS = require('crypto-js');
const crypto = require('crypto');

const midtransURL = process.env.MIDTRANS_URL
const midtransServerKey = process.env.MIDTRANS_SERVER_KEY

const generateAuth = () => {
    return btoa(`${midtransServerKey}:`)
}

module.exports.generatePaymentLink = async ({invoiceId, amount, resident}) => {
    console.log({
        "invoiceId": invoiceId,
        "amount": amount,
        "resident": resident,
    })

    url = `${midtransURL}/v1/payment-links`
    const options = {
      method: 'POST',
      headers: {accept: 'application/json', 'content-type': 'application/json', 'Authorization': `Basic ${generateAuth()}`},
      body: JSON.stringify({
        "transaction_details": {
          "order_id": invoiceId,
          "gross_amount": amount,
          "payment_link_id": `${invoiceId}-payment-link`
        },
        "usage_limit": 1,
        "expiry": {
          "start_time": moment(),
          "duration": 30,
          "unit": "days"
        },
        "enabled_payments": [
          "bca_va",
          "indomaret"
        ],
        "item_details": [
          {
            "id": "retri-sampah",
            "name": "retribusi sampah",
            "price": amount,
            "quantity": 1,
          }
        ],
        "customer_details": {
          "full_name": resident.name,
          "phone": resident.phoneNumber,
          "notes": "Silahkan ikuti instruksi pembayaran.",
          "customer_details_required_fields": [
            "full_name",
            "phone",
          ]
        },
        "title": "Retribusi Sampah",
        "payment_link_type": "FIXED_AMOUNT",
      })
    };
    
    return fetch(url, options)
}

// SHA512(order_id + status_code + gross_amount + serverkey)
module.exports.validatePaymentNotificationSignature = async ({signature_key,order_id,status_code,gross_amount}) => {
    const message = `${order_id}${status_code}${gross_amount}${midtransServerKey}`
 
    const hash = CryptoJS.SHA512(message).toString();

    return signature_key == hash
}