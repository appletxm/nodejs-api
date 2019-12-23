const net = require('net')
const client = net.connect({
    port: 8000
}, () => {
    console.log('client connected')
    client.write('hey server')
})

client.on('data', (data) => {
    console.log(data.toString())
})

client.on('end', () => {
    console.log('client disconnected')
})