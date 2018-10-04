const utils = require("./utils/util"),
    constants = require("./constants"),
    validator = require("./utils/validator");

function makePayment(payment, cb) {
    if (!constants.EnviromentType.includes(process.env.EnviromentType)) return cb("Set enviroment 'EnviromentType' to SANDBOX or PRODUCTION");
    validator.validatePayment(payment, function (err, msg) {
        if (err) return cb(msg);
        payment.pan = utils.encrypt(payment.pan);
        payment.password = utils.encrypt(payment.password);
        utils.request("payment", payment, function (err, resp) {
            cb(resp);
        })
    });
}

function makeRecurringPayment(payment, cb) {
    if (!constants.EnviromentType.includes(process.env.EnviromentType)) return cb("Set enviroment 'EnviromentType' to SANDBOX or PRODUCTION");
    validator.validatePaymentRecurrent(payment, function (err, msg) {
        if (err) return cb(msg);
        payment.pan = utils.encrypt(payment.pan);
        payment.password = utils.encrypt(payment.password);
        payment.period = payment.period.toUpperCase();
        utils.request("paymentRecurrent", payment, function (err, resp) {
            cb(resp);
        })
    });
}

function searchPayments(key, cb) {
    let urlParams = `${key.vendorKey}?&txId=${key.txId}&timestamp=${key.timestamp}&blockchain=${key.blockchain}&currency=${key.currency}&coinAmount=${key.coinAmount}&currencyAmount=${key.currencyAmount}&buyer=${key.buyer}`;
    utils.request("searchPayments", urlParams, function (err, resp) {
        cb(resp);
    })
}

function cancelPayment(payment, cb) {
    if (!constants.EnviromentType.includes(process.env.EnviromentType)) return cb("Set enviroment 'EnviromentType' to SANDBOX or PRODUCTION");
    validator.validateCancelPayment(payment, function (err, msg) {
        if (err) return cb(msg);
        payment.password = utils.encrypt(payment.password);
        utils.request("cancelPayment", payment, function (err, resp) {
            cb(resp);
        })
    });
}

function rechargeCryptoBalance(payment, cb) {
    if (!constants.EnviromentType.includes(process.env.EnviromentType)) return cb("Set enviroment 'EnviromentType' to SANDBOX or PRODUCTION");
    validator.validateRechargeCryptoBalance(payment, function (err, msg) {
        if (err) return cb(msg);
        payment.pan = utils.encrypt(payment.pan);
        payment.password = utils.encrypt(payment.password);
        utils.request("rechargeCryptoBalance", payment, function (err, resp) {
            cb(resp);
        })
    });
}

module.exports = {
    makePayment: makePayment,
    makeRecurringPayment: makeRecurringPayment,
    searchPayments: searchPayments,
    cancelPayment: cancelPayment,
    rechargeCryptoBalance: rechargeCryptoBalance
};
