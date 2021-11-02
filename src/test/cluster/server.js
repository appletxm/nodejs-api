const express = require('express')
const http = require('http')
const app = express()

let server

// Responds with Hello World or optionally the name you pass as path param
app.get('/hello/:name?', function (req, res) {
  const name = req.params.name

  if (name) {
    return res.send(`Hello ${name}!!!`)
  }

  return res.send('Hello World !!!')
})

app.get('/close', (req, res) => {
  console.log('Closing the server...')

  server.close(() => {
    console.log('--> Server call callback run !!')
    process.exit()
  })
})

// Start server
// const server = app.listen(3000, function () {
//   console.log('App listening on port 3000!')
// })
server = http.createServer(app).listen(3000, () => {
  console.log('App listening on port 3000!')
})

// Graceful shutdown
process.on('SIGINT', () => {
  const cleanUp = () => {
    // Clean up other resources like DB connections
  }

  console.log('Closing server...')

  server.close(() => {
    console.log('Server closed !!! ')

    cleanUp()
    process.exit()
  })

  // Force close server after 5secs
  setTimeout((e) => {
    console.log('Forcing server close !!!', e)

    cleanUp()
    process.exit(1)
  }, 5000)
})
