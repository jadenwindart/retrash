const _ = require('lodash')

module.exports.sanitizeIndonesiPhoneNumber = (phoneNumber) => {
    if (_.startsWith(phoneNumber, '0')) return '+62' + phoneNumber.slice(1);
    if (_.startsWith(phoneNumber, '62')) return '+' + phoneNumber;

    return phoneNumber
}