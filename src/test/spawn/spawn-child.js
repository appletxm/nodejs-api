process.on('message', (message) => {
  console.log('**======child recieved**', message)
})

process.send('====child send===')

console.log('####this test the sdio###')
