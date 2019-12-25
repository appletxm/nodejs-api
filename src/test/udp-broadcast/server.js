// server.js
const dgram = require('dgram')
const server = dgram.createSocket('udp4')

server.on('error', (err) => {
  console.log(`server error\n${err.stack}`)
  server.close()
})

server.on('message', (msg, rinfo) => {
  console.log(`server got ${msg} from ${rinfo.address}:${rinfo.port}`)
  server.send(Buffer.from('second message....'), '9000', '192.168.69.161')
})

server.on('listening', () => {
  var address = server.address()
  console.log(`server listening ${address.address}:${address.port}`)
})

server.bind(41234, '192.168.69.161',() => {
// server.bind('9000', () => {
  console.log('server bind success')
})
// server listening 0.0.0.041234
