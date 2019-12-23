const dgram = require('dgram')
const message = Buffer.from('你好nodejs', 'utf8')
const client = dgram.createSocket('udp4')
client.send(message, 0, message.length, 41234, '127.0.0.1', () => {
  client.close()
})
