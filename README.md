# APUS-NODEJS
ApusPayments is a plataform to make payments using criptocurrencies.
* Language: NodeJS

[Documentation API (v0.0.1)](https://docs.apuspayments.com/)

## Examples of use 
* Make a payments
* Make a recurring payments
* Search payments
* Cancel a payment
* Recharge of Crypto Balance

<hr>

## Requisites
* Set enviroment variable "EnviromentType":
    * SANDBOX 
    * PRODUCTION 
```javascript
    process.env.EnviromentType = "SANDBOX";
```

## Make a payments

```javascript
var apus = require('./apus');
var payment = {
    "pan": "9999999999999999", 
    "password": "1234",
    "blockchain": "LTC",
    "amount": 10.03,
    "currency": "BRL", 
    "vendorKey": "5f5bdaed-f82b-4b82-b3f5-1d562633da5b"
};
apus.makePayment(payment, function (result) {
    console.log("result: ", result);
});
```
<hr>

## Make a recurring payments

```javascript
var apus = require('./apus');
var paymentRecurring = {
    "pan": "9999999999999999", 
    "password": "1234",
    "blockchain": "LTC",
    "amount": 10.03,
    "currency": "BRL",
    "period": "w",
    "frequency": "10",
    "execute": false,
    "vendorKey": "5f5bdaed-f82b-4b82-b3f5-1d562633da5b"
};
apus.makeRecurringPayment(paymentRecurring, function (result) {
    console.log("result: ", result);
});
```
<hr>

## Search payments

```javascript
var apus = require('./apus');
var paymentParams = {
     "vendorKey": "5f5bdaed-f82b-4b82-b3f5-1d562633da5b",
     "txId": "2bf779e2a311c2629df977b0bb105879411fd71f5839972c4ed1d3278f80170f",
     "timestamp": new Date("2018-09-10T23:11:03-03:00").getTime(),
     "blockchain": "LTC",
     "currency": "BRL",
     "coinAmount": "0.04494037",
     "currencyAmount": "10.00",
     "buyer": "43de9565-943e-49ff-b808-82d54a87199f",
};
apus.searchPayments(paymentParams, function (result) {
    console.log("result: ", result);
});
```
<hr>

## Cancel a payment

```javascript
var apus = require('./apus');
var cancelPayments = {
    "txId": "2bf779e2a311c2629df977b0bb105879411fd71f5839972c4ed1d3278f80170f",
    "password": "1234",
    "vendorKey": "5f5bdaed-f82b-4b82-b3f5-1d562633da5b"
};
apus.cancelPayment(cancelPayments, function (result) {
    console.log("result: ", result);
});
```
<hr>

## Recharge of Crypto Balance

```javascript
var apus = require('./apus');
var objRechargeCryptoBalance = {
    "pan": "9999999999999999", 
    "password": "1234",
    "blockchain": "LTC",
    "amount": 10.03,
    "currency": "BRL",
    "vendorKey": "5f5bdaed-f82b-4b82-b3f5-1d562633da5b"
};
apus.rechargeCryptoBalance(objRechargeCryptoBalance, function (result) {
    console.log("result: ", result);
});
```
<hr>