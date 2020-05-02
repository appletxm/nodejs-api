const http = require('http')

console.log(`Worker ${process.pid} started...`)

http.createServer((req, res) => {
  console.info(`******${process.pid} is handling the http`)
  res.writeHead(200)
  res.end('Hello World')

  process.exit(1)
}).listen(3000)

// Now run PM2 with $    pm2 start app.js -i 3   and you will see an output similar to:
// Note the option -i that is used to indicate the number of instances to create.
// The idea is that number be the same as your number of CPU cores.
// If you don't know them you can set -i 0 to leave PM2 detect it automatically.
