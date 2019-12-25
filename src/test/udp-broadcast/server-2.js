var dgram = require('dgram')
var server = dgram.createSocket('udp4')
var port = '9000'
var targetPort = '41234'
var targetIp = '192.168.69.161' // 这里也可以支持用域名，它会自己做dns解析

function sendAndRecv(targetPort, targetIp, desPort, message, callback) {
    server.bind(port, () => {
    var _message = Buffer.from(message)
    server.send(_message, targetPort, targetIp,(err) => {
        if (!err) {
          server.on('message',(msg,info) => {
            console.log(`server got: ${msg.toString()} from ${info.address}:${info.port}`)
            callback && callback(message.toString())
            // 这里要注意哦，msg的类型是Buffer哦！
          })
        }
      })
    })
}

sendAndRecv(targetPort, targetIp, '', 'txm message', (err) => {
  console.info('****', err)
})
