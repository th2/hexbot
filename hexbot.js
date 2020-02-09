'use strict'
var util = require('util')
var privateConfig = require('./config/private')
var telegram = require('./telegram.js')
var express = require('express')()
const bodyParser = require('body-parser')

telegram.send('[s] hello world')
express.use(bodyParser.json());
express.listen(privateConfig.httpListenerPort)
console.log('listening on port ' + privateConfig.httpListenerPort)

express.route('/send/:messageText').get(function (req, res, next) {
  var messageText = req.params.messageText
  telegram.send('[get] ' + messageText)
  res.sendStatus(200)
})

express.route('/send').post(function (req, res, next) {
  if (req.body && req.body.message && req.body.message.length > 0) {
    var messageText = req.body.message
    telegram.send('[post] ' + messageText)
    res.sendStatus(200)
  }
})

express.use(function (req, res, next) {
  telegram.send('[r] ' + req.hostname + req.url)
  res.sendStatus(404)
})