var privateConfig = require('./config/private')
var util = require('util')

// Telegram Bot
var Telegram = require('./telegram.js')
var telegram = new Telegram(privateConfig.telegramKey)
function processMessages (messages) {
  for (var i in messages) {
    var m = messages[i].message

    if (m.from.id == privateConfig.telegramAdminId) {
      if (m.text.startsWith('/send')) {
        var text = m.text.substring(5)  
        telegram.sendMessage(privateConfig.telegramAdminId, 'send:' + text)
      } else {
        telegram.sendMessage(privateConfig.telegramAdminId, 'ignored:' + m.text)
      }
    } else {
      telegram.sendMessage(privateConfig.telegramAdminId, 'message from unknown source: ' + util.inspect(m))
    }
  }
  setTimeout(function () { telegram.getMessages(processMessages) }, 2000)
}
telegram.getMessages(processMessages)