const dgram = require('dgram')
const message = Buffer.from('Some bytes')
const client = dgram.createSocket('udp4')
client.send(message, 41234, '192.168.69.161', (err) => {
  console.log('udp broadcast:', err)
  client.close()
})
