const http = require('http')
const crypto = require('crypto')

function parseUrl(url) {}

const WebSocket = function(url) {
  this.options = parseUrl(url)
  this.socket = null
  this.connect()
}

WebSocket.prototype.onopen = function() {
  console.log('web socket open')
}

WebSocket.prototype.setSocket = function(socket) {
  this.socket = socket
}

WebSocket.prototype.connect = function () {
  const that = this
  const key = Buffer.from(this.options.protocolVersion + '-' + Date.now().toString('base64'))
  const shasum = crypto.createHash('sha1')
  const expected = shasum.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64')
  const options = {
    port: this.options.port,
    host: this.options.hostname,
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket',
      'Sec-WebSocket-Version': this.options.protocolVersion,
      'Sec-WebSocket-Key': key
    }
  }
  const req = http.request(options)
  req.end()
  req.on('upgrade', (res, socket, upgradeHead) => {
    that.setSocket(socket)
    that.onopen()
  })
}

module.exports = WebSocket
