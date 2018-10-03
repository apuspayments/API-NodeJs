const crypto = require('crypto'),
    http = require("https"),
    requestOptions = {
        "SANDBOX": {
            "url": "sandbox.ApusPayments.com",
        },
        "PRODUCTION": {
            "url": " api.ApusPayments.com"
        },
        "payment": {
            "path": "/v1/checkout",
            "method": "POST"
        },
        "paymentRecurrent": {
            "path": "/v1/checkout/recurrent",
            "method": "POST"
        },
        "searchPayments": {
            "path": "/v1/checkout/{key}",
            "method": "GET"
        },
        "cancelPayment": {
            "path": "/v1/checkout",
            "method": "DELETE"
        },
        "rechargeCryptoBalance": {
            "path": "/v1/checkout",
            "method": "POST"
        }
    };

function encrypt(string) {
    return crypto.createHash('sha256').update(string).digest('hex');
}

function request(method, body, cb) {
    let options = {
        hostname: requestOptions[process.env.EnviromentType].url,
        path: requestOptions[method].method === "GET" ? requestOptions[method].path.replace("{key}", body) : requestOptions[method].path,
        method: requestOptions[method].method,
        headers: {
            'Content-Length': requestOptions[method].method !== "GET" ? Buffer.byteLength(JSON.stringify(body)) : null,
            'Content-Type': 'application/json'
        }
    };
    let req = http.request(options, function (res) {
        let resp = "";
        res.on('data', function (bodyResp) {
            resp += bodyResp.toString();
        });

        res.on('end', function () {
            cb(false, JSON.parse(resp));
        });

    });
    req.on('error', function (e) {
        cb(true, e);
        console.log('problem with request: ' + e.message);
    });
    if (requestOptions[method].method !== "GET") {
        req.write(JSON.stringify(body));
    }
    req.end();
}

module.exports = {
    encrypt: encrypt,
    request: request
};