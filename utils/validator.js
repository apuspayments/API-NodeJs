const constants = require("../constants");

function isEmpty(string) {
    return string === undefined || string === null || string.length <= 0
}

function validatePayment(payment, cb) {
    if (isNaN(payment.pan)) return cb(true, "Invalid pan number");
    if (isEmpty(payment.password)) return cb(true, "Invalid password");
    if (!constants.validBlockChains.includes(payment.blockchain)) return cb(true, "Invalid blockchain, valids blockchain: " + constants.validBlockChains.join(", "));
    if (typeof payment.amount !== "number") return cb(true, "Invalid amount, number type only");
    if (!constants.validCurrency.includes(payment.currency)) return cb(true, "Invalid currency, valids currency " + constants.validCurrency.join(", "));
    if (isEmpty(payment.vendorKey)) return cb(true, "Invalid vendorKey");
    cb(false);
}

function validatePaymentRecurrent(payment, cb) {
    if (isNaN(payment.pan)) return cb(true, "Invalid pan number");
    if (isEmpty(payment.password)) return cb(true, "Invalid password");
    if (!constants.validBlockChains.includes(payment.blockchain)) return cb(true, "Invalid blockchain, valids blockchain: " + constants.validBlockChains.join(", "));
    if (typeof payment.amount !== "number") return cb(true, "Invalid amount, number type only");
    if (!constants.validCurrency.includes(payment.currency)) return cb(true, "Invalid currency, valids currency " + constants.validCurrency.join(", "));
    if (isEmpty(payment.vendorKey)) return cb(true, "Invalid vendorKey");
    if (!constants.period.includes(payment.period.toUpperCase())) return cb(true, "Invalid period, valids period " + constants.period.join(", "));
    if (isNaN(payment.frequency)) return cb(true, "Invalid frequency number");
    if (typeof payment.execute !== "boolean") return cb(true, "Invalid execute, boolean only");
    cb(false);
}

function validateCancelPayment(payment, cb) {
    if (isEmpty(payment.password)) return cb(true, "Invalid password");
    if (isEmpty(payment.vendorKey)) return cb(true, "Invalid vendorKey");
    if (isEmpty(payment.txId)) return cb(true, "Invalid txId");
    cb(false);
}

function validateRechargeCryptoBalance(payment, cb) {
    if (isNaN(payment.pan)) return cb(true, "Invalid pan number");
    if (isEmpty(payment.password)) return cb(true, "Invalid password");
    if (!constants.validBlockChains.includes(payment.blockchain)) return cb(true, "Invalid blockchain, valids blockchain: " + constants.validBlockChains.join(", "));
    if (typeof payment.amount !== "number") return cb(true, "Invalid amount, number type only");
    if (!constants.validCurrency.includes(payment.currency)) return cb(true, "Invalid currency, valids currency " + constants.validCurrency.join(", "));
    if (isEmpty(payment.vendorKey)) return cb(true, "Invalid vendorKey");
    cb(false);
}

module.exports = {
    validatePayment: validatePayment,
    validatePaymentRecurrent: validatePaymentRecurrent,
    validateCancelPayment: validateCancelPayment,
    validateRechargeCryptoBalance: validateRechargeCryptoBalance
}