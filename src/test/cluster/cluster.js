const cluster = require('cluster')
const http = require('http')
const os = require('os')
const childProcess = require('child_process')

console.info('current is master:', cluster.isMaster, 'and cpu numbers:', os.cpus().length)

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    for (var i = 0, n = os.cpus().length; i < n; i += 1) {
        cluster.fork();
    }
} else {
    
}