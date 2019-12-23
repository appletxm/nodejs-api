const net = require('net')
const server = net.createServer()
const host = '192.168.69.161'

server.on('connection', () => {
    console.log('client connect')
})

server.listen(8000, () => {
    console.log('tcp server bound')
})
