const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length
// const workers = []

console.info('==========app start========')

if (cluster.isMaster) {
  masterProcess()
} else {
  childProcess()
}

function masterProcess() {
  console.log(`Master ${process.pid} is running`)

  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork()
    // workers.push(worker)

    console.log(`Forking process number ${i} ${worker.process.pid}...`)

    worker.on('message', function(message) {
      console.log(`Master ${process.pid} receive message '${JSON.stringify(message)}' from worker ${worker.process.pid}`)
    })
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died, code is ${code}, signal is ${signal}`)
    console.log(`Forking a new process...`)

    cluster.fork()
  })

  // workers.forEach(function(worker) {
  //   console.log(`Master ${process.pid} sends message to worker ${worker.process.pid}...`)
  //   worker.send({ msg: `Message from master ${process.pid}` })
  // }, this)

  // process.exit()
}

function childProcess() {
  console.log(`Worker ${process.pid} started`)

  http.createServer((req, res) => {
    console.info(`******${process.pid} is handling the http`)
    res.writeHead(200)
    res.end('Hello World')

    process.exit(1)
  }).listen(3000)

  process.on('message', (message) => {
    console.log(`Worker ${process.pid} receive message '${JSON.stringify(message)}'`)
  })

  // console.log(`Worker ${process.pid} sends message to master...`)
  // process.send({ msg: `Message from worker ${process.pid}` })

  // console.log(`Worker ${process.pid} finished`)

  // process.exit()
}
