const net = require('net')
const host = '192.168.69.161'
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log(data.toString())
    socket.write('hey client!')
  })

  socket.on('end', () => {
    console.log('client leave')
  })
})

server.listen(8000, host, () => {
  console.log('server bound')
})

server.on('connection', () => {
  console.log('tcp server connection')
})

server.on('close', () => {
  console.log('tcp server close')
})

server.on('error', () => {
  console.log('tcp server error')
})

// setTimeout(() => {
//     server.close()
// }, 5000)
